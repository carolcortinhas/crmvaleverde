import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEtapaAtendimento } from 'app/shared/model/etapa-atendimento.model';
import { EtapaAtendimentoService } from './etapa-atendimento.service';
import { EtapaAtendimentoDeleteDialogComponent } from './etapa-atendimento-delete-dialog.component';

@Component({
  selector: 'jhi-etapa-atendimento',
  templateUrl: './etapa-atendimento.component.html',
})
export class EtapaAtendimentoComponent implements OnInit, OnDestroy {
  etapaAtendimentos?: IEtapaAtendimento[];
  eventSubscriber?: Subscription;

  constructor(
    protected etapaAtendimentoService: EtapaAtendimentoService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.etapaAtendimentoService.query().subscribe((res: HttpResponse<IEtapaAtendimento[]>) => (this.etapaAtendimentos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEtapaAtendimentos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEtapaAtendimento): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEtapaAtendimentos(): void {
    this.eventSubscriber = this.eventManager.subscribe('etapaAtendimentoListModification', () => this.loadAll());
  }

  delete(etapaAtendimento: IEtapaAtendimento): void {
    const modalRef = this.modalService.open(EtapaAtendimentoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.etapaAtendimento = etapaAtendimento;
  }
}
