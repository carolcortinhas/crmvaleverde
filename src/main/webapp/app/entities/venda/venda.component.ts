import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IVenda } from 'app/shared/model/venda.model';
import { VendaService } from './venda.service';
import { VendaDeleteDialogComponent } from './venda-delete-dialog.component';

@Component({
  selector: 'jhi-venda',
  templateUrl: './venda.component.html',
})
export class VendaComponent implements OnInit, OnDestroy {
  vendas?: IVenda[];
  eventSubscriber?: Subscription;

  constructor(protected vendaService: VendaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.vendaService.query().subscribe((res: HttpResponse<IVenda[]>) => (this.vendas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInVendas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IVenda): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInVendas(): void {
    this.eventSubscriber = this.eventManager.subscribe('vendaListModification', () => this.loadAll());
  }

  delete(venda: IVenda): void {
    const modalRef = this.modalService.open(VendaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.venda = venda;
  }
}
