import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProdutoVenda } from 'app/shared/model/produto-venda.model';
import { ProdutoVendaService } from './produto-venda.service';

@Component({
  templateUrl: './produto-venda-delete-dialog.component.html',
})
export class ProdutoVendaDeleteDialogComponent {
  produtoVenda?: IProdutoVenda;

  constructor(
    protected produtoVendaService: ProdutoVendaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.produtoVendaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('produtoVendaListModification');
      this.activeModal.close();
    });
  }
}
