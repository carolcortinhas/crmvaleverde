import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAtendimento } from 'app/shared/model/atendimento.model';
import { AtendimentoService } from './atendimento.service';

@Component({
  templateUrl: './atendimento-delete-dialog.component.html',
})
export class AtendimentoDeleteDialogComponent {
  atendimento?: IAtendimento;

  constructor(
    protected atendimentoService: AtendimentoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.atendimentoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('atendimentoListModification');
      this.activeModal.close();
    });
  }
}
