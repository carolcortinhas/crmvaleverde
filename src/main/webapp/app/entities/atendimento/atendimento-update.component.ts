import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IAtendimento, Atendimento } from 'app/shared/model/atendimento.model';
import { AtendimentoService } from './atendimento.service';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente/cliente.service';

@Component({
  selector: 'jhi-atendimento-update',
  templateUrl: './atendimento-update.component.html',
})
export class AtendimentoUpdateComponent implements OnInit {
  isSaving = false;
  clientes: ICliente[] = [];

  editForm = this.fb.group({
    id: [],
    valorTotal: [],
    dataInicio: [],
    dataFim: [],
    privacidade: [],
    tarefa: [],
    clientesAtendidos: [],
  });

  constructor(
    protected atendimentoService: AtendimentoService,
    protected clienteService: ClienteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ atendimento }) => {
      if (!atendimento.id) {
        const today = moment().startOf('day');
        atendimento.dataInicio = today;
        atendimento.dataFim = today;
      }

      this.updateForm(atendimento);

      this.clienteService.query().subscribe((res: HttpResponse<ICliente[]>) => (this.clientes = res.body || []));
    });
  }

  updateForm(atendimento: IAtendimento): void {
    this.editForm.patchValue({
      id: atendimento.id,
      valorTotal: atendimento.valorTotal,
      dataInicio: atendimento.dataInicio ? atendimento.dataInicio.format(DATE_TIME_FORMAT) : null,
      dataFim: atendimento.dataFim ? atendimento.dataFim.format(DATE_TIME_FORMAT) : null,
      privacidade: atendimento.privacidade,
      tarefa: atendimento.tarefa,
      clientesAtendidos: atendimento.clientesAtendidos,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const atendimento = this.createFromForm();
    if (atendimento.id !== undefined) {
      this.subscribeToSaveResponse(this.atendimentoService.update(atendimento));
    } else {
      this.subscribeToSaveResponse(this.atendimentoService.create(atendimento));
    }
  }

  private createFromForm(): IAtendimento {
    return {
      ...new Atendimento(),
      id: this.editForm.get(['id'])!.value,
      valorTotal: this.editForm.get(['valorTotal'])!.value,
      dataInicio: this.editForm.get(['dataInicio'])!.value ? moment(this.editForm.get(['dataInicio'])!.value, DATE_TIME_FORMAT) : undefined,
      dataFim: this.editForm.get(['dataFim'])!.value ? moment(this.editForm.get(['dataFim'])!.value, DATE_TIME_FORMAT) : undefined,
      privacidade: this.editForm.get(['privacidade'])!.value,
      tarefa: this.editForm.get(['tarefa'])!.value,
      clientesAtendidos: this.editForm.get(['clientesAtendidos'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAtendimento>>): void {
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

  trackById(index: number, item: ICliente): any {
    return item.id;
  }
}
