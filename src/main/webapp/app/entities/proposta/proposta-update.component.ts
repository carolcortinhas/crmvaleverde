import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProposta, Proposta } from 'app/shared/model/proposta.model';
import { PropostaService } from './proposta.service';
import { IAtendimento } from 'app/shared/model/atendimento.model';
import { AtendimentoService } from 'app/entities/atendimento/atendimento.service';

@Component({
  selector: 'jhi-proposta-update',
  templateUrl: './proposta-update.component.html',
})
export class PropostaUpdateComponent implements OnInit {
  isSaving = false;
  atendimentos: IAtendimento[] = [];
  dataDp: any;

  editForm = this.fb.group({
    id: [],
    numero: [],
    data: [],
    propostaVenda: [],
  });

  constructor(
    protected propostaService: PropostaService,
    protected atendimentoService: AtendimentoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ proposta }) => {
      this.updateForm(proposta);

      this.atendimentoService.query().subscribe((res: HttpResponse<IAtendimento[]>) => (this.atendimentos = res.body || []));
    });
  }

  updateForm(proposta: IProposta): void {
    this.editForm.patchValue({
      id: proposta.id,
      numero: proposta.numero,
      data: proposta.data,
      propostaVenda: proposta.propostaVenda,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const proposta = this.createFromForm();
    if (proposta.id !== undefined) {
      this.subscribeToSaveResponse(this.propostaService.update(proposta));
    } else {
      this.subscribeToSaveResponse(this.propostaService.create(proposta));
    }
  }

  private createFromForm(): IProposta {
    return {
      ...new Proposta(),
      id: this.editForm.get(['id'])!.value,
      numero: this.editForm.get(['numero'])!.value,
      data: this.editForm.get(['data'])!.value,
      propostaVenda: this.editForm.get(['propostaVenda'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProposta>>): void {
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
