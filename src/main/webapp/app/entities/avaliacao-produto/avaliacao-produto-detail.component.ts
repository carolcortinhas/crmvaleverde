import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAvaliacaoProduto } from 'app/shared/model/avaliacao-produto.model';

@Component({
  selector: 'jhi-avaliacao-produto-detail',
  templateUrl: './avaliacao-produto-detail.component.html',
})
export class AvaliacaoProdutoDetailComponent implements OnInit {
  avaliacaoProduto: IAvaliacaoProduto | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ avaliacaoProduto }) => (this.avaliacaoProduto = avaliacaoProduto));
  }

  previousState(): void {
    window.history.back();
  }
}
