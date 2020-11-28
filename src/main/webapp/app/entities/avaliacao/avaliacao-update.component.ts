import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAvaliacao, Avaliacao } from 'app/shared/model/avaliacao.model';
import { AvaliacaoService } from './avaliacao.service';
import { IAvaliacaoProduto } from 'app/shared/model/avaliacao-produto.model';
import { AvaliacaoProdutoService } from 'app/entities/avaliacao-produto/avaliacao-produto.service';
import { IAvaliacaoAtendimento } from 'app/shared/model/avaliacao-atendimento.model';
import { AvaliacaoAtendimentoService } from 'app/entities/avaliacao-atendimento/avaliacao-atendimento.service';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente/cliente.service';

type SelectableEntity = IAvaliacaoProduto | IAvaliacaoAtendimento | ICliente;

@Component({
  selector: 'jhi-avaliacao-update',
  templateUrl: './avaliacao-update.component.html',
})
export class AvaliacaoUpdateComponent implements OnInit {
  isSaving = false;
  avaliacaoprodutos: IAvaliacaoProduto[] = [];
  avaliacaoatendimentos: IAvaliacaoAtendimento[] = [];
  clientes: ICliente[] = [];

  editForm = this.fb.group({
    id: [],
    nivelSatisfacao: [null, [Validators.required]],
    descricao: [],
    avaliacaoProduto: [],
    avaliacaoAtendimento: [],
    clientesAvaliacoes: [],
  });

  constructor(
    protected avaliacaoService: AvaliacaoService,
    protected avaliacaoProdutoService: AvaliacaoProdutoService,
    protected avaliacaoAtendimentoService: AvaliacaoAtendimentoService,
    protected clienteService: ClienteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ avaliacao }) => {
      this.updateForm(avaliacao);

      this.avaliacaoProdutoService
        .query({ filter: 'avaliacao-is-null' })
        .pipe(
          map((res: HttpResponse<IAvaliacaoProduto[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IAvaliacaoProduto[]) => {
          if (!avaliacao.avaliacaoProduto || !avaliacao.avaliacaoProduto.id) {
            this.avaliacaoprodutos = resBody;
          } else {
            this.avaliacaoProdutoService
              .find(avaliacao.avaliacaoProduto.id)
              .pipe(
                map((subRes: HttpResponse<IAvaliacaoProduto>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IAvaliacaoProduto[]) => (this.avaliacaoprodutos = concatRes));
          }
        });

      this.avaliacaoAtendimentoService
        .query({ filter: 'avaliacao-is-null' })
        .pipe(
          map((res: HttpResponse<IAvaliacaoAtendimento[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IAvaliacaoAtendimento[]) => {
          if (!avaliacao.avaliacaoAtendimento || !avaliacao.avaliacaoAtendimento.id) {
            this.avaliacaoatendimentos = resBody;
          } else {
            this.avaliacaoAtendimentoService
              .find(avaliacao.avaliacaoAtendimento.id)
              .pipe(
                map((subRes: HttpResponse<IAvaliacaoAtendimento>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IAvaliacaoAtendimento[]) => (this.avaliacaoatendimentos = concatRes));
          }
        });

      this.clienteService.query().subscribe((res: HttpResponse<ICliente[]>) => (this.clientes = res.body || []));
    });
  }

  updateForm(avaliacao: IAvaliacao): void {
    this.editForm.patchValue({
      id: avaliacao.id,
      nivelSatisfacao: avaliacao.nivelSatisfacao,
      descricao: avaliacao.descricao,
      avaliacaoProduto: avaliacao.avaliacaoProduto,
      avaliacaoAtendimento: avaliacao.avaliacaoAtendimento,
      clientesAvaliacoes: avaliacao.clientesAvaliacoes,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const avaliacao = this.createFromForm();
    if (avaliacao.id !== undefined) {
      this.subscribeToSaveResponse(this.avaliacaoService.update(avaliacao));
    } else {
      this.subscribeToSaveResponse(this.avaliacaoService.create(avaliacao));
    }
  }

  private createFromForm(): IAvaliacao {
    return {
      ...new Avaliacao(),
      id: this.editForm.get(['id'])!.value,
      nivelSatisfacao: this.editForm.get(['nivelSatisfacao'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      avaliacaoProduto: this.editForm.get(['avaliacaoProduto'])!.value,
      avaliacaoAtendimento: this.editForm.get(['avaliacaoAtendimento'])!.value,
      clientesAvaliacoes: this.editForm.get(['clientesAvaliacoes'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAvaliacao>>): void {
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
