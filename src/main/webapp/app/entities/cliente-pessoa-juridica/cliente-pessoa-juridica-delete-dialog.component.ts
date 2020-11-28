import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IClientePessoaJuridica } from 'app/shared/model/cliente-pessoa-juridica.model';
import { ClientePessoaJuridicaService } from './cliente-pessoa-juridica.service';

@Component({
  templateUrl: './cliente-pessoa-juridica-delete-dialog.component.html',
})
export class ClientePessoaJuridicaDeleteDialogComponent {
  clientePessoaJuridica?: IClientePessoaJuridica;

  constructor(
    protected clientePessoaJuridicaService: ClientePessoaJuridicaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.clientePessoaJuridicaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('clientePessoaJuridicaListModification');
      this.activeModal.close();
    });
  }
}
