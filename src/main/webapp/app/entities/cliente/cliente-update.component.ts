import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICliente, Cliente } from 'app/shared/model/cliente.model';
import { ClienteService } from './cliente.service';
import { IClientePessoaJuridica } from 'app/shared/model/cliente-pessoa-juridica.model';
import { ClientePessoaJuridicaService } from 'app/entities/cliente-pessoa-juridica/cliente-pessoa-juridica.service';
import { IClientePessoaFisica } from 'app/shared/model/cliente-pessoa-fisica.model';
import { ClientePessoaFisicaService } from 'app/entities/cliente-pessoa-fisica/cliente-pessoa-fisica.service';
import { IConsultor } from 'app/shared/model/consultor.model';
import { ConsultorService } from 'app/entities/consultor/consultor.service';

type SelectableEntity = IClientePessoaJuridica | IClientePessoaFisica | IConsultor;

@Component({
  selector: 'jhi-cliente-update',
  templateUrl: './cliente-update.component.html',
})
export class ClienteUpdateComponent implements OnInit {
  isSaving = false;
  clientepessoajuridicas: IClientePessoaJuridica[] = [];
  clientepessoafisicas: IClientePessoaFisica[] = [];
  consultors: IConsultor[] = [];

  editForm = this.fb.group({
    id: [],
    nivelSatisfacao: [],
    origem: [],
    categoria: [],
    clientePessoaJuridica: [],
    clientePessoaFisica: [],
    consultor: [],
  });

  constructor(
    protected clienteService: ClienteService,
    protected clientePessoaJuridicaService: ClientePessoaJuridicaService,
    protected clientePessoaFisicaService: ClientePessoaFisicaService,
    protected consultorService: ConsultorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cliente }) => {
      this.updateForm(cliente);

      this.clientePessoaJuridicaService
        .query({ filter: 'clientepj-is-null' })
        .pipe(
          map((res: HttpResponse<IClientePessoaJuridica[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IClientePessoaJuridica[]) => {
          if (!cliente.clientePessoaJuridica || !cliente.clientePessoaJuridica.id) {
            this.clientepessoajuridicas = resBody;
          } else {
            this.clientePessoaJuridicaService
              .find(cliente.clientePessoaJuridica.id)
              .pipe(
                map((subRes: HttpResponse<IClientePessoaJuridica>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IClientePessoaJuridica[]) => (this.clientepessoajuridicas = concatRes));
          }
        });

      this.clientePessoaFisicaService
        .query({ filter: 'clientepf-is-null' })
        .pipe(
          map((res: HttpResponse<IClientePessoaFisica[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IClientePessoaFisica[]) => {
          if (!cliente.clientePessoaFisica || !cliente.clientePessoaFisica.id) {
            this.clientepessoafisicas = resBody;
          } else {
            this.clientePessoaFisicaService
              .find(cliente.clientePessoaFisica.id)
              .pipe(
                map((subRes: HttpResponse<IClientePessoaFisica>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IClientePessoaFisica[]) => (this.clientepessoafisicas = concatRes));
          }
        });

      this.consultorService.query().subscribe((res: HttpResponse<IConsultor[]>) => (this.consultors = res.body || []));
    });
  }

  updateForm(cliente: ICliente): void {
    this.editForm.patchValue({
      id: cliente.id,
      nivelSatisfacao: cliente.nivelSatisfacao,
      origem: cliente.origem,
      categoria: cliente.categoria,
      clientePessoaJuridica: cliente.clientePessoaJuridica,
      clientePessoaFisica: cliente.clientePessoaFisica,
      consultor: cliente.consultor,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cliente = this.createFromForm();
    if (cliente.id !== undefined) {
      this.subscribeToSaveResponse(this.clienteService.update(cliente));
    } else {
      this.subscribeToSaveResponse(this.clienteService.create(cliente));
    }
  }

  private createFromForm(): ICliente {
    return {
      ...new Cliente(),
      id: this.editForm.get(['id'])!.value,
      nivelSatisfacao: this.editForm.get(['nivelSatisfacao'])!.value,
      origem: this.editForm.get(['origem'])!.value,
      categoria: this.editForm.get(['categoria'])!.value,
      clientePessoaJuridica: this.editForm.get(['clientePessoaJuridica'])!.value,
      clientePessoaFisica: this.editForm.get(['clientePessoaFisica'])!.value,
      consultor: this.editForm.get(['consultor'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICliente>>): void {
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
