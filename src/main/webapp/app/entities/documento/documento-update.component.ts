import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDocumento, Documento } from 'app/shared/model/documento.model';
import { DocumentoService } from './documento.service';
import { IProposta } from 'app/shared/model/proposta.model';
import { PropostaService } from 'app/entities/proposta/proposta.service';

@Component({
  selector: 'jhi-documento-update',
  templateUrl: './documento-update.component.html',
})
export class DocumentoUpdateComponent implements OnInit {
  isSaving = false;
  propostas: IProposta[] = [];

  editForm = this.fb.group({
    id: [],
    nomeArquivo: [],
    propostaDocumentos: [],
  });

  constructor(
    protected documentoService: DocumentoService,
    protected propostaService: PropostaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ documento }) => {
      this.updateForm(documento);

      this.propostaService.query().subscribe((res: HttpResponse<IProposta[]>) => (this.propostas = res.body || []));
    });
  }

  updateForm(documento: IDocumento): void {
    this.editForm.patchValue({
      id: documento.id,
      nomeArquivo: documento.nomeArquivo,
      propostaDocumentos: documento.propostaDocumentos,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const documento = this.createFromForm();
    if (documento.id !== undefined) {
      this.subscribeToSaveResponse(this.documentoService.update(documento));
    } else {
      this.subscribeToSaveResponse(this.documentoService.create(documento));
    }
  }

  private createFromForm(): IDocumento {
    return {
      ...new Documento(),
      id: this.editForm.get(['id'])!.value,
      nomeArquivo: this.editForm.get(['nomeArquivo'])!.value,
      propostaDocumentos: this.editForm.get(['propostaDocumentos'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocumento>>): void {
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

  trackById(index: number, item: IProposta): any {
    return item.id;
  }
}
