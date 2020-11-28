import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IContato } from 'app/shared/model/contato.model';
import { ContatoService } from './contato.service';

@Component({
  templateUrl: './contato-delete-dialog.component.html',
})
export class ContatoDeleteDialogComponent {
  contato?: IContato;

  constructor(protected contatoService: ContatoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.contatoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('contatoListModification');
      this.activeModal.close();
    });
  }
}
