import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IRepresentantePJ, RepresentantePJ } from 'app/shared/model/representante-pj.model';
import { RepresentantePJService } from './representante-pj.service';
import { IClientePessoaJuridica } from 'app/shared/model/cliente-pessoa-juridica.model';
import { ClientePessoaJuridicaService } from 'app/entities/cliente-pessoa-juridica/cliente-pessoa-juridica.service';
import { IPessoa } from 'app/shared/model/pessoa.model';
import { PessoaService } from 'app/entities/pessoa/pessoa.service';

type SelectableEntity = IClientePessoaJuridica | IPessoa;

@Component({
  selector: 'jhi-representante-pj-update',
  templateUrl: './representante-pj-update.component.html',
})
export class RepresentantePJUpdateComponent implements OnInit {
  isSaving = false;
  representas: IClientePessoaJuridica[] = [];
  pessoajuridicas: IPessoa[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [],
    representa: [],
    pessoaJuridica: [],
  });

  constructor(
    protected representantePJService: RepresentantePJService,
    protected clientePessoaJuridicaService: ClientePessoaJuridicaService,
    protected pessoaService: PessoaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ representantePJ }) => {
      this.updateForm(representantePJ);

      this.clientePessoaJuridicaService
        .query({ filter: 'representantepj-is-null' })
        .pipe(
          map((res: HttpResponse<IClientePessoaJuridica[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IClientePessoaJuridica[]) => {
          if (!representantePJ.representa || !representantePJ.representa.id) {
            this.representas = resBody;
          } else {
            this.clientePessoaJuridicaService
              .find(representantePJ.representa.id)
              .pipe(
                map((subRes: HttpResponse<IClientePessoaJuridica>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IClientePessoaJuridica[]) => (this.representas = concatRes));
          }
        });

      this.pessoaService
        .query({ filter: 'representante-is-null' })
        .pipe(
          map((res: HttpResponse<IPessoa[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IPessoa[]) => {
          if (!representantePJ.pessoaJuridica || !representantePJ.pessoaJuridica.id) {
            this.pessoajuridicas = resBody;
          } else {
            this.pessoaService
              .find(representantePJ.pessoaJuridica.id)
              .pipe(
                map((subRes: HttpResponse<IPessoa>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IPessoa[]) => (this.pessoajuridicas = concatRes));
          }
        });
    });
  }

  updateForm(representantePJ: IRepresentantePJ): void {
    this.editForm.patchValue({
      id: representantePJ.id,
      nome: representantePJ.nome,
      representa: representantePJ.representa,
      pessoaJuridica: representantePJ.pessoaJuridica,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const representantePJ = this.createFromForm();
    if (representantePJ.id !== undefined) {
      this.subscribeToSaveResponse(this.representantePJService.update(representantePJ));
    } else {
      this.subscribeToSaveResponse(this.representantePJService.create(representantePJ));
    }
  }

  private createFromForm(): IRepresentantePJ {
    return {
      ...new RepresentantePJ(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      representa: this.editForm.get(['representa'])!.value,
      pessoaJuridica: this.editForm.get(['pessoaJuridica'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRepresentantePJ>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
