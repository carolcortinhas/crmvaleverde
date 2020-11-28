import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProdutoVenda, ProdutoVenda } from 'app/shared/model/produto-venda.model';
import { ProdutoVendaService } from './produto-venda.service';
import { IProduto } from 'app/shared/model/produto.model';
import { ProdutoService } from 'app/entities/produto/produto.service';
import { IVenda } from 'app/shared/model/venda.model';
import { VendaService } from 'app/entities/venda/venda.service';

type SelectableEntity = IProduto | IVenda;

@Component({
  selector: 'jhi-produto-venda-update',
  templateUrl: './produto-venda-update.component.html',
})
export class ProdutoVendaUpdateComponent implements OnInit {
  isSaving = false;
  produtos: IProduto[] = [];
  vendas: IVenda[] = [];

  editForm = this.fb.group({
    id: [],
    quantidade: [],
    produto: [],
    vendasProdutos: [],
  });

  constructor(
    protected produtoVendaService: ProdutoVendaService,
    protected produtoService: ProdutoService,
    protected vendaService: VendaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ produtoVenda }) => {
      this.updateForm(produtoVenda);

      this.produtoService.query().subscribe((res: HttpResponse<IProduto[]>) => (this.produtos = res.body || []));

      this.vendaService.query().subscribe((res: HttpResponse<IVenda[]>) => (this.vendas = res.body || []));
    });
  }

  updateForm(produtoVenda: IProdutoVenda): void {
    this.editForm.patchValue({
      id: produtoVenda.id,
      quantidade: produtoVenda.quantidade,
      produto: produtoVenda.produto,
      vendasProdutos: produtoVenda.vendasProdutos,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const produtoVenda = this.createFromForm();
    if (produtoVenda.id !== undefined) {
      this.subscribeToSaveResponse(this.produtoVendaService.update(produtoVenda));
    } else {
      this.subscribeToSaveResponse(this.produtoVendaService.create(produtoVenda));
    }
  }

  private createFromForm(): IProdutoVenda {
    return {
      ...new ProdutoVenda(),
      id: this.editForm.get(['id'])!.value,
      quantidade: this.editForm.get(['quantidade'])!.value,
      produto: this.editForm.get(['produto'])!.value,
      vendasProdutos: this.editForm.get(['vendasProdutos'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProdutoVenda>>): void {
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
