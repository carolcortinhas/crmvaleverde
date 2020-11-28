import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IClientePessoaJuridica } from 'app/shared/model/cliente-pessoa-juridica.model';
import { ClientePessoaJuridicaService } from './cliente-pessoa-juridica.service';
import { ClientePessoaJuridicaDeleteDialogComponent } from './cliente-pessoa-juridica-delete-dialog.component';

@Component({
  selector: 'jhi-cliente-pessoa-juridica',
  templateUrl: './cliente-pessoa-juridica.component.html',
})
export class ClientePessoaJuridicaComponent implements OnInit, OnDestroy {
  clientePessoaJuridicas?: IClientePessoaJuridica[];
  eventSubscriber?: Subscription;

  constructor(
    protected clientePessoaJuridicaService: ClientePessoaJuridicaService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.clientePessoaJuridicaService
      .query()
      .subscribe((res: HttpResponse<IClientePessoaJuridica[]>) => (this.clientePessoaJuridicas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInClientePessoaJuridicas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IClientePessoaJuridica): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInClientePessoaJuridicas(): void {
    this.eventSubscriber = this.eventManager.subscribe('clientePessoaJuridicaListModification', () => this.loadAll());
  }

  delete(clientePessoaJuridica: IClientePessoaJuridica): void {
    const modalRef = this.modalService.open(ClientePessoaJuridicaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.clientePessoaJuridica = clientePessoaJuridica;
  }
}
