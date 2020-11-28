import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IVenda, Venda } from 'app/shared/model/venda.model';
import { VendaService } from './venda.service';
import { IConsultor } from 'app/shared/model/consultor.model';
import { ConsultorService } from 'app/entities/consultor/consultor.service';
import { IOportunidade } from 'app/shared/model/oportunidade.model';
import { OportunidadeService } from 'app/entities/oportunidade/oportunidade.service';

type SelectableEntity = IConsultor | IOportunidade;

@Component({
  selector: 'jhi-venda-update',
  templateUrl: './venda-update.component.html',
})
export class VendaUpdateComponent implements OnInit {
  isSaving = false;
  consultors: IConsultor[] = [];
  oportunidades: IOportunidade[] = [];

  editForm = this.fb.group({
    id: [],
    valorDesconto: [],
    valorTotal: [],
    diaFechamento: [],
    consultorVenda: [],
    oportunidadeVenda: [],
  });

  constructor(
    protected vendaService: VendaService,
    protected consultorService: ConsultorService,
    protected oportunidadeService: OportunidadeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ venda }) => {
      if (!venda.id) {
        const today = moment().startOf('day');
        venda.diaFechamento = today;
      }

      this.updateForm(venda);

      this.consultorService.query().subscribe((res: HttpResponse<IConsultor[]>) => (this.consultors = res.body || []));

      this.oportunidadeService.query().subscribe((res: HttpResponse<IOportunidade[]>) => (this.oportunidades = res.body || []));
    });
  }

  updateForm(venda: IVenda): void {
    this.editForm.patchValue({
      id: venda.id,
      valorDesconto: venda.valorDesconto,
      valorTotal: venda.valorTotal,
      diaFechamento: venda.diaFechamento ? venda.diaFechamento.format(DATE_TIME_FORMAT) : null,
      consultorVenda: venda.consultorVenda,
      oportunidadeVenda: venda.oportunidadeVenda,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const venda = this.createFromForm();
    if (venda.id !== undefined) {
      this.subscribeToSaveResponse(this.vendaService.update(venda));
    } else {
      this.subscribeToSaveResponse(this.vendaService.create(venda));
    }
  }

  private createFromForm(): IVenda {
    return {
      ...new Venda(),
      id: this.editForm.get(['id'])!.value,
      valorDesconto: this.editForm.get(['valorDesconto'])!.value,
      valorTotal: this.editForm.get(['valorTotal'])!.value,
      diaFechamento: this.editForm.get(['diaFechamento'])!.value
        ? moment(this.editForm.get(['diaFechamento'])!.value, DATE_TIME_FORMAT)
        : undefined,
      consultorVenda: this.editForm.get(['consultorVenda'])!.value,
      oportunidadeVenda: this.editForm.get(['oportunidadeVenda'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVenda>>): void {
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
