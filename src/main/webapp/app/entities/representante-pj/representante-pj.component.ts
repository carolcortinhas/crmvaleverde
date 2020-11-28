import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRepresentantePJ } from 'app/shared/model/representante-pj.model';
import { RepresentantePJService } from './representante-pj.service';
import { RepresentantePJDeleteDialogComponent } from './representante-pj-delete-dialog.component';

@Component({
  selector: 'jhi-representante-pj',
  templateUrl: './representante-pj.component.html',
})
export class RepresentantePJComponent implements OnInit, OnDestroy {
  representantePJS?: IRepresentantePJ[];
  eventSubscriber?: Subscription;

  constructor(
    protected representantePJService: RepresentantePJService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.representantePJService.query().subscribe((res: HttpResponse<IRepresentantePJ[]>) => (this.representantePJS = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRepresentantePJS();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRepresentantePJ): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRepresentantePJS(): void {
    this.eventSubscriber = this.eventManager.subscribe('representantePJListModification', () => this.loadAll());
  }

  delete(representantePJ: IRepresentantePJ): void {
    const modalRef = this.modalService.open(RepresentantePJDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.representantePJ = representantePJ;
  }
}
