import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAdministrador, Administrador } from 'app/shared/model/administrador.model';
import { AdministradorService } from './administrador.service';
import { IFuncionario } from 'app/shared/model/funcionario.model';
import { FuncionarioService } from 'app/entities/funcionario/funcionario.service';

@Component({
  selector: 'jhi-administrador-update',
  templateUrl: './administrador-update.component.html',
})
export class AdministradorUpdateComponent implements OnInit {
  isSaving = false;
  funcionarios: IFuncionario[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [],
    funcionario1: [],
  });

  constructor(
    protected administradorService: AdministradorService,
    protected funcionarioService: FuncionarioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ administrador }) => {
      this.updateForm(administrador);

      this.funcionarioService.query().subscribe((res: HttpResponse<IFuncionario[]>) => (this.funcionarios = res.body || []));
    });
  }

  updateForm(administrador: IAdministrador): void {
    this.editForm.patchValue({
      id: administrador.id,
      nome: administrador.nome,
      funcionario1: administrador.funcionario1,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const administrador = this.createFromForm();
    if (administrador.id !== undefined) {
      this.subscribeToSaveResponse(this.administradorService.update(administrador));
    } else {
      this.subscribeToSaveResponse(this.administradorService.create(administrador));
    }
  }

  private createFromForm(): IAdministrador {
    return {
      ...new Administrador(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      funcionario1: this.editForm.get(['funcionario1'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAdministrador>>): void {
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

  trackById(index: number, item: IFuncionario): any {
    return item.id;
  }
}
