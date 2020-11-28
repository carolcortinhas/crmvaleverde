import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAvaliacaoAtendimento } from 'app/shared/model/avaliacao-atendimento.model';
import { AvaliacaoAtendimentoService } from './avaliacao-atendimento.service';

@Component({
  templateUrl: './avaliacao-atendimento-delete-dialog.component.html',
})
export class AvaliacaoAtendimentoDeleteDialogComponent {
  avaliacaoAtendimento?: IAvaliacaoAtendimento;

  constructor(
    protected avaliacaoAtendimentoService: AvaliacaoAtendimentoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.avaliacaoAtendimentoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('avaliacaoAtendimentoListModification');
      this.activeModal.close();
    });
  }
}
