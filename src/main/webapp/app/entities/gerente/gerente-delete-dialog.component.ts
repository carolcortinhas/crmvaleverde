import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGerente } from 'app/shared/model/gerente.model';
import { GerenteService } from './gerente.service';

@Component({
  templateUrl: './gerente-delete-dialog.component.html',
})
export class GerenteDeleteDialogComponent {
  gerente?: IGerente;

  constructor(protected gerenteService: GerenteService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.gerenteService.delete(id).subscribe(() => {
      this.eventManager.broadcast('gerenteListModification');
      this.activeModal.close();
    });
  }
}
