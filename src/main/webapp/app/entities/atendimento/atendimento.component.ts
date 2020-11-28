import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAtendimento } from 'app/shared/model/atendimento.model';
import { AtendimentoService } from './atendimento.service';
import { AtendimentoDeleteDialogComponent } from './atendimento-delete-dialog.component';

@Component({
  selector: 'jhi-atendimento',
  templateUrl: './atendimento.component.html',
})
export class AtendimentoComponent implements OnInit, OnDestroy {
  atendimentos?: IAtendimento[];
  eventSubscriber?: Subscription;

  constructor(
    protected atendimentoService: AtendimentoService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.atendimentoService.query().subscribe((res: HttpResponse<IAtendimento[]>) => (this.atendimentos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAtendimentos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAtendimento): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAtendimentos(): void {
    this.eventSubscriber = this.eventManager.subscribe('atendimentoListModification', () => this.loadAll());
  }

  delete(atendimento: IAtendimento): void {
    const modalRef = this.modalService.open(AtendimentoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.atendimento = atendimento;
  }
}
