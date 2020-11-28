import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IOportunidadePerdida, OportunidadePerdida } from 'app/shared/model/oportunidade-perdida.model';
import { OportunidadePerdidaService } from './oportunidade-perdida.service';

@Component({
  selector: 'jhi-oportunidade-perdida-update',
  templateUrl: './oportunidade-perdida-update.component.html',
})
export class OportunidadePerdidaUpdateComponent implements OnInit {
  isSaving = false;
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    descricaoPerda: [],
    date: [],
  });

  constructor(
    protected oportunidadePerdidaService: OportunidadePerdidaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ oportunidadePerdida }) => {
      this.updateForm(oportunidadePerdida);
    });
  }

  updateForm(oportunidadePerdida: IOportunidadePerdida): void {
    this.editForm.patchValue({
      id: oportunidadePerdida.id,
      descricaoPerda: oportunidadePerdida.descricaoPerda,
      date: oportunidadePerdida.date,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const oportunidadePerdida = this.createFromForm();
    if (oportunidadePerdida.id !== undefined) {
      this.subscribeToSaveResponse(this.oportunidadePerdidaService.update(oportunidadePerdida));
    } else {
      this.subscribeToSaveResponse(this.oportunidadePerdidaService.create(oportunidadePerdida));
    }
  }

  private createFromForm(): IOportunidadePerdida {
    return {
      ...new OportunidadePerdida(),
      id: this.editForm.get(['id'])!.value,
      descricaoPerda: this.editForm.get(['descricaoPerda'])!.value,
      date: this.editForm.get(['date'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOportunidadePerdida>>): void {
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
