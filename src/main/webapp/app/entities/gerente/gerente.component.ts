import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IGerente } from 'app/shared/model/gerente.model';
import { GerenteService } from './gerente.service';
import { GerenteDeleteDialogComponent } from './gerente-delete-dialog.component';

@Component({
  selector: 'jhi-gerente',
  templateUrl: './gerente.component.html',
})
export class GerenteComponent implements OnInit, OnDestroy {
  gerentes?: IGerente[];
  eventSubscriber?: Subscription;

  constructor(protected gerenteService: GerenteService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.gerenteService.query().subscribe((res: HttpResponse<IGerente[]>) => (this.gerentes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInGerentes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IGerente): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInGerentes(): void {
    this.eventSubscriber = this.eventManager.subscribe('gerenteListModification', () => this.loadAll());
  }

  delete(gerente: IGerente): void {
    const modalRef = this.modalService.open(GerenteDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.gerente = gerente;
  }
}
