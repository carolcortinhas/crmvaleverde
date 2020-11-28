import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAvaliacao } from 'app/shared/model/avaliacao.model';
import { AvaliacaoService } from './avaliacao.service';
import { AvaliacaoDeleteDialogComponent } from './avaliacao-delete-dialog.component';

@Component({
  selector: 'jhi-avaliacao',
  templateUrl: './avaliacao.component.html',
})
export class AvaliacaoComponent implements OnInit, OnDestroy {
  avaliacaos?: IAvaliacao[];
  eventSubscriber?: Subscription;

  constructor(protected avaliacaoService: AvaliacaoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.avaliacaoService.query().subscribe((res: HttpResponse<IAvaliacao[]>) => (this.avaliacaos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAvaliacaos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAvaliacao): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAvaliacaos(): void {
    this.eventSubscriber = this.eventManager.subscribe('avaliacaoListModification', () => this.loadAll());
  }

  delete(avaliacao: IAvaliacao): void {
    const modalRef = this.modalService.open(AvaliacaoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.avaliacao = avaliacao;
  }
}
