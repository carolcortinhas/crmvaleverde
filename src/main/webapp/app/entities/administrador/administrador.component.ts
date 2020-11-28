import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAdministrador } from 'app/shared/model/administrador.model';
import { AdministradorService } from './administrador.service';
import { AdministradorDeleteDialogComponent } from './administrador-delete-dialog.component';

@Component({
  selector: 'jhi-administrador',
  templateUrl: './administrador.component.html',
})
export class AdministradorComponent implements OnInit, OnDestroy {
  administradors?: IAdministrador[];
  eventSubscriber?: Subscription;

  constructor(
    protected administradorService: AdministradorService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.administradorService.query().subscribe((res: HttpResponse<IAdministrador[]>) => (this.administradors = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAdministradors();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAdministrador): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAdministradors(): void {
    this.eventSubscriber = this.eventManager.subscribe('administradorListModification', () => this.loadAll());
  }

  delete(administrador: IAdministrador): void {
    const modalRef = this.modalService.open(AdministradorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.administrador = administrador;
  }
}
