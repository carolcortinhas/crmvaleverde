import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IClientePessoaFisica, ClientePessoaFisica } from 'app/shared/model/cliente-pessoa-fisica.model';
import { ClientePessoaFisicaService } from './cliente-pessoa-fisica.service';
import { IPessoa } from 'app/shared/model/pessoa.model';
import { PessoaService } from 'app/entities/pessoa/pessoa.service';

@Component({
  selector: 'jhi-cliente-pessoa-fisica-update',
  templateUrl: './cliente-pessoa-fisica-update.component.html',
})
export class ClientePessoaFisicaUpdateComponent implements OnInit {
  isSaving = false;
  pessoas: IPessoa[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [],
    pessoas: [],
  });

  constructor(
    protected clientePessoaFisicaService: ClientePessoaFisicaService,
    protected pessoaService: PessoaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ clientePessoaFisica }) => {
      this.updateForm(clientePessoaFisica);

      this.pessoaService
        .query({ filter: 'clientepessoafisica-is-null' })
        .pipe(
          map((res: HttpResponse<IPessoa[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IPessoa[]) => {
          if (!clientePessoaFisica.pessoas || !clientePessoaFisica.pessoas.id) {
            this.pessoas = resBody;
          } else {
            this.pessoaService
              .find(clientePessoaFisica.pessoas.id)
              .pipe(
                map((subRes: HttpResponse<IPessoa>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IPessoa[]) => (this.pessoas = concatRes));
          }
        });
    });
  }

  updateForm(clientePessoaFisica: IClientePessoaFisica): void {
    this.editForm.patchValue({
      id: clientePessoaFisica.id,
      nome: clientePessoaFisica.nome,
      pessoas: clientePessoaFisica.pessoas,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const clientePessoaFisica = this.createFromForm();
    if (clientePessoaFisica.id !== undefined) {
      this.subscribeToSaveResponse(this.clientePessoaFisicaService.update(clientePessoaFisica));
    } else {
      this.subscribeToSaveResponse(this.clientePessoaFisicaService.create(clientePessoaFisica));
    }
  }

  private createFromForm(): IClientePessoaFisica {
    return {
      ...new ClientePessoaFisica(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      pessoas: this.editForm.get(['pessoas'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClientePessoaFisica>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IPessoa): any {
    return item.id;
  }
}
