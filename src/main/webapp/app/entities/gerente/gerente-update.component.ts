import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IGerente, Gerente } from 'app/shared/model/gerente.model';
import { GerenteService } from './gerente.service';
import { IFuncionario } from 'app/shared/model/funcionario.model';
import { FuncionarioService } from 'app/entities/funcionario/funcionario.service';

@Component({
  selector: 'jhi-gerente-update',
  templateUrl: './gerente-update.component.html',
})
export class GerenteUpdateComponent implements OnInit {
  isSaving = false;
  funcionarios: IFuncionario[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [],
    funcionario3: [],
  });

  constructor(
    protected gerenteService: GerenteService,
    protected funcionarioService: FuncionarioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ gerente }) => {
      this.updateForm(gerente);

      this.funcionarioService.query().subscribe((res: HttpResponse<IFuncionario[]>) => (this.funcionarios = res.body || []));
    });
  }

  updateForm(gerente: IGerente): void {
    this.editForm.patchValue({
      id: gerente.id,
      nome: gerente.nome,
      funcionario3: gerente.funcionario3,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const gerente = this.createFromForm();
    if (gerente.id !== undefined) {
      this.subscribeToSaveResponse(this.gerenteService.update(gerente));
    } else {
      this.subscribeToSaveResponse(this.gerenteService.create(gerente));
    }
  }

  private createFromForm(): IGerente {
    return {
      ...new Gerente(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      funcionario3: this.editForm.get(['funcionario3'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGerente>>): void {
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
