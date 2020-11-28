import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRepresentantePJ } from 'app/shared/model/representante-pj.model';
import { RepresentantePJService } from './representante-pj.service';

@Component({
  templateUrl: './representante-pj-delete-dialog.component.html',
})
export class RepresentantePJDeleteDialogComponent {
  representantePJ?: IRepresentantePJ;

  constructor(
    protected representantePJService: RepresentantePJService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.representantePJService.delete(id).subscribe(() => {
      this.eventManager.broadcast('representantePJListModification');
      this.activeModal.close();
    });
  }
}
