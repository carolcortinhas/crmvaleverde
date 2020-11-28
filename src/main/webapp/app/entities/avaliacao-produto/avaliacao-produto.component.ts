import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAvaliacaoProduto } from 'app/shared/model/avaliacao-produto.model';
import { AvaliacaoProdutoService } from './avaliacao-produto.service';
import { AvaliacaoProdutoDeleteDialogComponent } from './avaliacao-produto-delete-dialog.component';

@Component({
  selector: 'jhi-avaliacao-produto',
  templateUrl: './avaliacao-produto.component.html',
})
export class AvaliacaoProdutoComponent implements OnInit, OnDestroy {
  avaliacaoProdutos?: IAvaliacaoProduto[];
  eventSubscriber?: Subscription;

  constructor(
    protected avaliacaoProdutoService: AvaliacaoProdutoService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.avaliacaoProdutoService.query().subscribe((res: HttpResponse<IAvaliacaoProduto[]>) => (this.avaliacaoProdutos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAvaliacaoProdutos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAvaliacaoProduto): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAvaliacaoProdutos(): void {
    this.eventSubscriber = this.eventManager.subscribe('avaliacaoProdutoListModification', () => this.loadAll());
  }

  delete(avaliacaoProduto: IAvaliacaoProduto): void {
    const modalRef = this.modalService.open(AvaliacaoProdutoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.avaliacaoProduto = avaliacaoProduto;
  }
}
