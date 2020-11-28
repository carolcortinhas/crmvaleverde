import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IConsultor, Consultor } from 'app/shared/model/consultor.model';
import { ConsultorService } from './consultor.service';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente/cliente.service';
import { IFuncionario } from 'app/shared/model/funcionario.model';
import { FuncionarioService } from 'app/entities/funcionario/funcionario.service';

type SelectableEntity = IFuncionario | ICliente;

@Component({
  selector: 'jhi-consultor-update',
  templateUrl: './consultor-update.component.html',
})
export class ConsultorUpdateComponent implements OnInit {
  isSaving = false;
  funcionarios: IFuncionario[] = [];
  clientes: ICliente[] = [];

  editForm = this.fb.group({
    id: [],
    nome: [],
    cadastroFuncionario: [],
    clientesOportunidades: [],
  });

  constructor(
    protected consultorService: ConsultorService,
    protected clienteService: ClienteService,
    protected funcionarioService: FuncionarioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ consultor }) => {
      this.updateForm(consultor);

      this.funcionarioService.query().subscribe((res: HttpResponse<IFuncionario[]>) => (this.funcionarios = res.body || []));

      this.clienteService.query().subscribe((res: HttpResponse<ICliente[]>) => (this.clientes = res.body || []));
    });
  }

  updateForm(consultor: IConsultor): void {
    this.editForm.patchValue({
      id: consultor.id,
      nome: consultor.nome,
      cadastroFuncionario: consultor.cadastroFuncionario,
      clientesOportunidades: consultor.clientesOportunidades,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const consultor = this.createFromForm();
    if (consultor.id !== undefined) {
      this.subscribeToSaveResponse(this.consultorService.update(consultor));
    } else {
      this.subscribeToSaveResponse(this.consultorService.create(consultor));
    }
  }

  private createFromForm(): IConsultor {
    return {
      ...new Consultor(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      cadastroFuncionario: this.editForm.get(['cadastroFuncionario'])!.value,
      clientesOportunidades: this.editForm.get(['clientesOportunidades'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConsultor>>): void {
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
