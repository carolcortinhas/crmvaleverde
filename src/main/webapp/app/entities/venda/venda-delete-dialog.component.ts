import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVenda } from 'app/shared/model/venda.model';
import { VendaService } from './venda.service';

@Component({
  templateUrl: './venda-delete-dialog.component.html',
})
export class VendaDeleteDialogComponent {
  venda?: IVenda;

  constructor(protected vendaService: VendaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.vendaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('vendaListModification');
      this.activeModal.close();
    });
  }
}
