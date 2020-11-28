import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAvaliacao } from 'app/shared/model/avaliacao.model';
import { AvaliacaoService } from './avaliacao.service';

@Component({
  templateUrl: './avaliacao-delete-dialog.component.html',
})
export class AvaliacaoDeleteDialogComponent {
  avaliacao?: IAvaliacao;

  constructor(protected avaliacaoService: AvaliacaoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.avaliacaoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('avaliacaoListModification');
      this.activeModal.close();
    });
  }
}
