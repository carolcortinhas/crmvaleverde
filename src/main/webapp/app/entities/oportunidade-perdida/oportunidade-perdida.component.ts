import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IOportunidadePerdida } from 'app/shared/model/oportunidade-perdida.model';
import { OportunidadePerdidaService } from './oportunidade-perdida.service';
import { OportunidadePerdidaDeleteDialogComponent } from './oportunidade-perdida-delete-dialog.component';

@Component({
  selector: 'jhi-oportunidade-perdida',
  templateUrl: './oportunidade-perdida.component.html',
})
export class OportunidadePerdidaComponent implements OnInit, OnDestroy {
  oportunidadePerdidas?: IOportunidadePerdida[];
  eventSubscriber?: Subscription;

  constructor(
    protected oportunidadePerdidaService: OportunidadePerdidaService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.oportunidadePerdidaService
      .query()
      .subscribe((res: HttpResponse<IOportunidadePerdida[]>) => (this.oportunidadePerdidas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInOportunidadePerdidas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IOportunidadePerdida): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInOportunidadePerdidas(): void {
    this.eventSubscriber = this.eventManager.subscribe('oportunidadePerdidaListModification', () => this.loadAll());
  }

  delete(oportunidadePerdida: IOportunidadePerdida): void {
    const modalRef = this.modalService.open(OportunidadePerdidaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.oportunidadePerdida = oportunidadePerdida;
  }
}
