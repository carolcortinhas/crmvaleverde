import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFuncionario } from 'app/shared/model/funcionario.model';
import { FuncionarioService } from './funcionario.service';

@Component({
  templateUrl: './funcionario-delete-dialog.component.html',
})
export class FuncionarioDeleteDialogComponent {
  funcionario?: IFuncionario;

  constructor(
    protected funcionarioService: FuncionarioService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.funcionarioService.delete(id).subscribe(() => {
      this.eventManager.broadcast('funcionarioListModification');
      this.activeModal.close();
    });
  }
}
