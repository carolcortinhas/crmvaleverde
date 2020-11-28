import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITelefone } from 'app/shared/model/telefone.model';
import { TelefoneService } from './telefone.service';
import { TelefoneDeleteDialogComponent } from './telefone-delete-dialog.component';

@Component({
  selector: 'jhi-telefone',
  templateUrl: './telefone.component.html',
})
export class TelefoneComponent implements OnInit, OnDestroy {
  telefones?: ITelefone[];
  eventSubscriber?: Subscription;

  constructor(protected telefoneService: TelefoneService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.telefoneService.query().subscribe((res: HttpResponse<ITelefone[]>) => (this.telefones = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTelefones();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITelefone): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTelefones(): void {
    this.eventSubscriber = this.eventManager.subscribe('telefoneListModification', () => this.loadAll());
  }

  delete(telefone: ITelefone): void {
    const modalRef = this.modalService.open(TelefoneDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.telefone = telefone;
  }
}
