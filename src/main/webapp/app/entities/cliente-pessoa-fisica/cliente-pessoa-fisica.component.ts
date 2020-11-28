import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IClientePessoaFisica } from 'app/shared/model/cliente-pessoa-fisica.model';
import { ClientePessoaFisicaService } from './cliente-pessoa-fisica.service';
import { ClientePessoaFisicaDeleteDialogComponent } from './cliente-pessoa-fisica-delete-dialog.component';

@Component({
  selector: 'jhi-cliente-pessoa-fisica',
  templateUrl: './cliente-pessoa-fisica.component.html',
})
export class ClientePessoaFisicaComponent implements OnInit, OnDestroy {
  clientePessoaFisicas?: IClientePessoaFisica[];
  eventSubscriber?: Subscription;

  constructor(
    protected clientePessoaFisicaService: ClientePessoaFisicaService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.clientePessoaFisicaService
      .query()
      .subscribe((res: HttpResponse<IClientePessoaFisica[]>) => (this.clientePessoaFisicas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInClientePessoaFisicas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IClientePessoaFisica): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInClientePessoaFisicas(): void {
    this.eventSubscriber = this.eventManager.subscribe('clientePessoaFisicaListModification', () => this.loadAll());
  }

  delete(clientePessoaFisica: IClientePessoaFisica): void {
    const modalRef = this.modalService.open(ClientePessoaFisicaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.clientePessoaFisica = clientePessoaFisica;
  }
}
