import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IClientePessoaJuridica, ClientePessoaJuridica } from 'app/shared/model/cliente-pessoa-juridica.model';
import { ClientePessoaJuridicaService } from './cliente-pessoa-juridica.service';

@Component({
  selector: 'jhi-cliente-pessoa-juridica-update',
  templateUrl: './cliente-pessoa-juridica-update.component.html',
})
export class ClientePessoaJuridicaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    cnpj: [],
    razaoSocial: [],
  });

  constructor(
    protected clientePessoaJuridicaService: ClientePessoaJuridicaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ clientePessoaJuridica }) => {
      this.updateForm(clientePessoaJuridica);
    });
  }

  updateForm(clientePessoaJuridica: IClientePessoaJuridica): void {
    this.editForm.patchValue({
      id: clientePessoaJuridica.id,
      cnpj: clientePessoaJuridica.cnpj,
      razaoSocial: clientePessoaJuridica.razaoSocial,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const clientePessoaJuridica = this.createFromForm();
    if (clientePessoaJuridica.id !== undefined) {
      this.subscribeToSaveResponse(this.clientePessoaJuridicaService.update(clientePessoaJuridica));
    } else {
      this.subscribeToSaveResponse(this.clientePessoaJuridicaService.create(clientePessoaJuridica));
    }
  }

  private createFromForm(): IClientePessoaJuridica {
    return {
      ...new ClientePessoaJuridica(),
      id: this.editForm.get(['id'])!.value,
      cnpj: this.editForm.get(['cnpj'])!.value,
      razaoSocial: this.editForm.get(['razaoSocial'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClientePessoaJuridica>>): void {
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
}
