import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEtapaAtendimento } from 'app/shared/model/etapa-atendimento.model';
import { EtapaAtendimentoService } from './etapa-atendimento.service';

@Component({
  templateUrl: './etapa-atendimento-delete-dialog.component.html',
})
export class EtapaAtendimentoDeleteDialogComponent {
  etapaAtendimento?: IEtapaAtendimento;

  constructor(
    protected etapaAtendimentoService: EtapaAtendimentoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.etapaAtendimentoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('etapaAtendimentoListModification');
      this.activeModal.close();
    });
  }
}
