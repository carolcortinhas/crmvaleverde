import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProdutoVenda } from 'app/shared/model/produto-venda.model';

@Component({
  selector: 'jhi-produto-venda-detail',
  templateUrl: './produto-venda-detail.component.html',
})
export class ProdutoVendaDetailComponent implements OnInit {
  produtoVenda: IProdutoVenda | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ produtoVenda }) => (this.produtoVenda = produtoVenda));
  }

  previousState(): void {
    window.history.back();
  }
}
