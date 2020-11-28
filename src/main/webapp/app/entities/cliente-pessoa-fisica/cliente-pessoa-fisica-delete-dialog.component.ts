import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IClientePessoaFisica } from 'app/shared/model/cliente-pessoa-fisica.model';
import { ClientePessoaFisicaService } from './cliente-pessoa-fisica.service';

@Component({
  templateUrl: './cliente-pessoa-fisica-delete-dialog.component.html',
})
export class ClientePessoaFisicaDeleteDialogComponent {
  clientePessoaFisica?: IClientePessoaFisica;

  constructor(
    protected clientePessoaFisicaService: ClientePessoaFisicaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.clientePessoaFisicaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('clientePessoaFisicaListModification');
      this.activeModal.close();
    });
  }
}
