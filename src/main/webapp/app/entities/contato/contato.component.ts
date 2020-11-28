import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IContato } from 'app/shared/model/contato.model';
import { ContatoService } from './contato.service';
import { ContatoDeleteDialogComponent } from './contato-delete-dialog.component';

@Component({
  selector: 'jhi-contato',
  templateUrl: './contato.component.html',
})
export class ContatoComponent implements OnInit, OnDestroy {
  contatoes?: IContato[];
  eventSubscriber?: Subscription;

  constructor(protected contatoService: ContatoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.contatoService.query().subscribe((res: HttpResponse<IContato[]>) => (this.contatoes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInContatoes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IContato): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInContatoes(): void {
    this.eventSubscriber = this.eventManager.subscribe('contatoListModification', () => this.loadAll());
  }

  delete(contato: IContato): void {
    const modalRef = this.modalService.open(ContatoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.contato = contato;
  }
}
