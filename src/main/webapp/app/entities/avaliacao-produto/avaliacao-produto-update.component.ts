import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAvaliacaoProduto, AvaliacaoProduto } from 'app/shared/model/avaliacao-produto.model';
import { AvaliacaoProdutoService } from './avaliacao-produto.service';

@Component({
  selector: 'jhi-avaliacao-produto-update',
  templateUrl: './avaliacao-produto-update.component.html',
})
export class AvaliacaoProdutoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
  });

  constructor(
    protected avaliacaoProdutoService: AvaliacaoProdutoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ avaliacaoProduto }) => {
      this.updateForm(avaliacaoProduto);
    });
  }

  updateForm(avaliacaoProduto: IAvaliacaoProduto): void {
    this.editForm.patchValue({
      id: avaliacaoProduto.id,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const avaliacaoProduto = this.createFromForm();
    if (avaliacaoProduto.id !== undefined) {
      this.subscribeToSaveResponse(this.avaliacaoProdutoService.update(avaliacaoProduto));
    } else {
      this.subscribeToSaveResponse(this.avaliacaoProdutoService.create(avaliacaoProduto));
    }
  }

  private createFromForm(): IAvaliacaoProduto {
    return {
      ...new AvaliacaoProduto(),
      id: this.editForm.get(['id'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAvaliacaoProduto>>): void {
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
