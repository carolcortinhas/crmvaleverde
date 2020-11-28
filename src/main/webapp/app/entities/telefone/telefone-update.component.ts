import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITelefone, Telefone } from 'app/shared/model/telefone.model';
import { TelefoneService } from './telefone.service';

@Component({
  selector: 'jhi-telefone-update',
  templateUrl: './telefone-update.component.html',
})
export class TelefoneUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    codArea: [],
    numero: [],
    whatsApp: [],
  });

  constructor(protected telefoneService: TelefoneService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ telefone }) => {
      this.updateForm(telefone);
    });
  }

  updateForm(telefone: ITelefone): void {
    this.editForm.patchValue({
      id: telefone.id,
      codArea: telefone.codArea,
      numero: telefone.numero,
      whatsApp: telefone.whatsApp,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const telefone = this.createFromForm();
    if (telefone.id !== undefined) {
      this.subscribeToSaveResponse(this.telefoneService.update(telefone));
    } else {
      this.subscribeToSaveResponse(this.telefoneService.create(telefone));
    }
  }

  private createFromForm(): ITelefone {
    return {
      ...new Telefone(),
      id: this.editForm.get(['id'])!.value,
      codArea: this.editForm.get(['codArea'])!.value,
      numero: this.editForm.get(['numero'])!.value,
      whatsApp: this.editForm.get(['whatsApp'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITelefone>>): void {
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
