import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProposta } from 'app/shared/model/proposta.model';
import { PropostaService } from './proposta.service';

@Component({
  templateUrl: './proposta-delete-dialog.component.html',
})
export class PropostaDeleteDialogComponent {
  proposta?: IProposta;

  constructor(protected propostaService: PropostaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.propostaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('propostaListModification');
      this.activeModal.close();
    });
  }
}
