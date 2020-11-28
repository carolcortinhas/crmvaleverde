import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProdutoVenda } from 'app/shared/model/produto-venda.model';
import { ProdutoVendaService } from './produto-venda.service';
import { ProdutoVendaDeleteDialogComponent } from './produto-venda-delete-dialog.component';

@Component({
  selector: 'jhi-produto-venda',
  templateUrl: './produto-venda.component.html',
})
export class ProdutoVendaComponent implements OnInit, OnDestroy {
  produtoVendas?: IProdutoVenda[];
  eventSubscriber?: Subscription;

  constructor(
    protected produtoVendaService: ProdutoVendaService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.produtoVendaService.query().subscribe((res: HttpResponse<IProdutoVenda[]>) => (this.produtoVendas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProdutoVendas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProdutoVenda): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProdutoVendas(): void {
    this.eventSubscriber = this.eventManager.subscribe('produtoVendaListModification', () => this.loadAll());
  }

  delete(produtoVenda: IProdutoVenda): void {
    const modalRef = this.modalService.open(ProdutoVendaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.produtoVenda = produtoVenda;
  }
}
