import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProposta } from 'app/shared/model/proposta.model';
import { PropostaService } from './proposta.service';
import { PropostaDeleteDialogComponent } from './proposta-delete-dialog.component';

@Component({
  selector: 'jhi-proposta',
  templateUrl: './proposta.component.html',
})
export class PropostaComponent implements OnInit, OnDestroy {
  propostas?: IProposta[];
  eventSubscriber?: Subscription;

  constructor(protected propostaService: PropostaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.propostaService.query().subscribe((res: HttpResponse<IProposta[]>) => (this.propostas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPropostas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProposta): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPropostas(): void {
    this.eventSubscriber = this.eventManager.subscribe('propostaListModification', () => this.loadAll());
  }

  delete(proposta: IProposta): void {
    const modalRef = this.modalService.open(PropostaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.proposta = proposta;
  }
}
