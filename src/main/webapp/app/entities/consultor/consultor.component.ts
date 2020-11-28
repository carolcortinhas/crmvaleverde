import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IConsultor } from 'app/shared/model/consultor.model';
import { ConsultorService } from './consultor.service';
import { ConsultorDeleteDialogComponent } from './consultor-delete-dialog.component';

@Component({
  selector: 'jhi-consultor',
  templateUrl: './consultor.component.html',
})
export class ConsultorComponent implements OnInit, OnDestroy {
  consultors?: IConsultor[];
  eventSubscriber?: Subscription;

  constructor(protected consultorService: ConsultorService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.consultorService.query().subscribe((res: HttpResponse<IConsultor[]>) => (this.consultors = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInConsultors();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IConsultor): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInConsultors(): void {
    this.eventSubscriber = this.eventManager.subscribe('consultorListModification', () => this.loadAll());
  }

  delete(consultor: IConsultor): void {
    const modalRef = this.modalService.open(ConsultorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.consultor = consultor;
  }
}
