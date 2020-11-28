import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAvaliacaoProduto } from 'app/shared/model/avaliacao-produto.model';
import { AvaliacaoProdutoService } from './avaliacao-produto.service';

@Component({
  templateUrl: './avaliacao-produto-delete-dialog.component.html',
})
export class AvaliacaoProdutoDeleteDialogComponent {
  avaliacaoProduto?: IAvaliacaoProduto;

  constructor(
    protected avaliacaoProdutoService: AvaliacaoProdutoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.avaliacaoProdutoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('avaliacaoProdutoListModification');
      this.activeModal.close();
    });
  }
}
