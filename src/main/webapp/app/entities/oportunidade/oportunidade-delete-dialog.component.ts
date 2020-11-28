import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOportunidade } from 'app/shared/model/oportunidade.model';
import { OportunidadeService } from './oportunidade.service';

@Component({
  templateUrl: './oportunidade-delete-dialog.component.html',
})
export class OportunidadeDeleteDialogComponent {
  oportunidade?: IOportunidade;

  constructor(
    protected oportunidadeService: OportunidadeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.oportunidadeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('oportunidadeListModification');
      this.activeModal.close();
    });
  }
}
