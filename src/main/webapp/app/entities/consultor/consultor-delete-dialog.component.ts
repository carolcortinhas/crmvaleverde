import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IConsultor } from 'app/shared/model/consultor.model';
import { ConsultorService } from './consultor.service';

@Component({
  templateUrl: './consultor-delete-dialog.component.html',
})
export class ConsultorDeleteDialogComponent {
  consultor?: IConsultor;

  constructor(protected consultorService: ConsultorService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.consultorService.delete(id).subscribe(() => {
      this.eventManager.broadcast('consultorListModification');
      this.activeModal.close();
    });
  }
}
