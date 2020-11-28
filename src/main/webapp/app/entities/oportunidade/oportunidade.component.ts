import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IOportunidade } from 'app/shared/model/oportunidade.model';
import { OportunidadeService } from './oportunidade.service';
import { OportunidadeDeleteDialogComponent } from './oportunidade-delete-dialog.component';

@Component({
  selector: 'jhi-oportunidade',
  templateUrl: './oportunidade.component.html',
})
export class OportunidadeComponent implements OnInit, OnDestroy {
  oportunidades?: IOportunidade[];
  eventSubscriber?: Subscription;

  constructor(
    protected oportunidadeService: OportunidadeService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.oportunidadeService.query().subscribe((res: HttpResponse<IOportunidade[]>) => (this.oportunidades = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInOportunidades();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IOportunidade): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInOportunidades(): void {
    this.eventSubscriber = this.eventManager.subscribe('oportunidadeListModification', () => this.loadAll());
  }

  delete(oportunidade: IOportunidade): void {
    const modalRef = this.modalService.open(OportunidadeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.oportunidade = oportunidade;
  }
}
