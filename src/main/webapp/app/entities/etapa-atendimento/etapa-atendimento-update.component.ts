import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEtapaAtendimento, EtapaAtendimento } from 'app/shared/model/etapa-atendimento.model';
import { EtapaAtendimentoService } from './etapa-atendimento.service';
import { IAtendimento } from 'app/shared/model/atendimento.model';
import { AtendimentoService } from 'app/entities/atendimento/atendimento.service';

@Component({
  selector: 'jhi-etapa-atendimento-update',
  templateUrl: './etapa-atendimento-update.component.html',
})
export class EtapaAtendimentoUpdateComponent implements OnInit {
  isSaving = false;
  atendimentos: IAtendimento[] = [];
  dataDp: any;

  editForm = this.fb.group({
    id: [],
    data: [],
    descricao: [],
    situacao: [],
    atendimento: [],
  });

  constructor(
    protected etapaAtendimentoService: EtapaAtendimentoService,
    protected atendimentoService: AtendimentoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ etapaAtendimento }) => {
      this.updateForm(etapaAtendimento);

      this.atendimentoService.query().subscribe((res: HttpResponse<IAtendimento[]>) => (this.atendimentos = res.body || []));
    });
  }

  updateForm(etapaAtendimento: IEtapaAtendimento): void {
    this.editForm.patchValue({
      id: etapaAtendimento.id,
      data: etapaAtendimento.data,
      descricao: etapaAtendimento.descricao,
      situacao: etapaAtendimento.situacao,
      atendimento: etapaAtendimento.atendimento,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const etapaAtendimento = this.createFromForm();
    if (etapaAtendimento.id !== undefined) {
      this.subscribeToSaveResponse(this.etapaAtendimentoService.update(etapaAtendimento));
    } else {
      this.subscribeToSaveResponse(this.etapaAtendimentoService.create(etapaAtendimento));
    }
  }

  private createFromForm(): IEtapaAtendimento {
    return {
      ...new EtapaAtendimento(),
      id: this.editForm.get(['id'])!.value,
      data: this.editForm.get(['data'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      situacao: this.editForm.get(['situacao'])!.value,
      atendimento: this.editForm.get(['atendimento'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEtapaAtendimento>>): void {
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

  trackById(index: number, item: IAtendimento): any {
    return item.id;
  }
}
