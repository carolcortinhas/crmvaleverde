import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOportunidadePerdida } from 'app/shared/model/oportunidade-perdida.model';
import { OportunidadePerdidaService } from './oportunidade-perdida.service';

@Component({
  templateUrl: './oportunidade-perdida-delete-dialog.component.html',
})
export class OportunidadePerdidaDeleteDialogComponent {
  oportunidadePerdida?: IOportunidadePerdida;

  constructor(
    protected oportunidadePerdidaService: OportunidadePerdidaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.oportunidadePerdidaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('oportunidadePerdidaListModification');
      this.activeModal.close();
    });
  }
}
