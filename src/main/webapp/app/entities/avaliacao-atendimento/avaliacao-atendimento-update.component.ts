import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAvaliacaoAtendimento, AvaliacaoAtendimento } from 'app/shared/model/avaliacao-atendimento.model';
import { AvaliacaoAtendimentoService } from './avaliacao-atendimento.service';

@Component({
  selector: 'jhi-avaliacao-atendimento-update',
  templateUrl: './avaliacao-atendimento-update.component.html',
})
export class AvaliacaoAtendimentoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
  });

  constructor(
    protected avaliacaoAtendimentoService: AvaliacaoAtendimentoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ avaliacaoAtendimento }) => {
      this.updateForm(avaliacaoAtendimento);
    });
  }

  updateForm(avaliacaoAtendimento: IAvaliacaoAtendimento): void {
    this.editForm.patchValue({
      id: avaliacaoAtendimento.id,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const avaliacaoAtendimento = this.createFromForm();
    if (avaliacaoAtendimento.id !== undefined) {
      this.subscribeToSaveResponse(this.avaliacaoAtendimentoService.update(avaliacaoAtendimento));
    } else {
      this.subscribeToSaveResponse(this.avaliacaoAtendimentoService.create(avaliacaoAtendimento));
    }
  }

  private createFromForm(): IAvaliacaoAtendimento {
    return {
      ...new AvaliacaoAtendimento(),
      id: this.editForm.get(['id'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAvaliacaoAtendimento>>): void {
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
