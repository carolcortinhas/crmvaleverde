import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAvaliacaoAtendimento } from 'app/shared/model/avaliacao-atendimento.model';
import { AvaliacaoAtendimentoService } from './avaliacao-atendimento.service';
import { AvaliacaoAtendimentoDeleteDialogComponent } from './avaliacao-atendimento-delete-dialog.component';

@Component({
  selector: 'jhi-avaliacao-atendimento',
  templateUrl: './avaliacao-atendimento.component.html',
})
export class AvaliacaoAtendimentoComponent implements OnInit, OnDestroy {
  avaliacaoAtendimentos?: IAvaliacaoAtendimento[];
  eventSubscriber?: Subscription;

  constructor(
    protected avaliacaoAtendimentoService: AvaliacaoAtendimentoService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.avaliacaoAtendimentoService
      .query()
      .subscribe((res: HttpResponse<IAvaliacaoAtendimento[]>) => (this.avaliacaoAtendimentos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAvaliacaoAtendimentos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAvaliacaoAtendimento): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAvaliacaoAtendimentos(): void {
    this.eventSubscriber = this.eventManager.subscribe('avaliacaoAtendimentoListModification', () => this.loadAll());
  }

  delete(avaliacaoAtendimento: IAvaliacaoAtendimento): void {
    const modalRef = this.modalService.open(AvaliacaoAtendimentoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.avaliacaoAtendimento = avaliacaoAtendimento;
  }
}
