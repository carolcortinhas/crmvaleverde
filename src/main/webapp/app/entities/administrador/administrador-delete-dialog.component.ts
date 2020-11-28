import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAdministrador } from 'app/shared/model/administrador.model';
import { AdministradorService } from './administrador.service';

@Component({
  templateUrl: './administrador-delete-dialog.component.html',
})
export class AdministradorDeleteDialogComponent {
  administrador?: IAdministrador;

  constructor(
    protected administradorService: AdministradorService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.administradorService.delete(id).subscribe(() => {
      this.eventManager.broadcast('administradorListModification');
      this.activeModal.close();
    });
  }
}
