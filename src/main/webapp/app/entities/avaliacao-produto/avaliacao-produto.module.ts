import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CrmvaleverdeSharedModule } from 'app/shared/shared.module';
import { AvaliacaoProdutoComponent } from './avaliacao-produto.component';
import { AvaliacaoProdutoDetailComponent } from './avaliacao-produto-detail.component';
import { AvaliacaoProdutoUpdateComponent } from './avaliacao-produto-update.component';
import { AvaliacaoProdutoDeleteDialogComponent } from './avaliacao-produto-delete-dialog.component';
import { avaliacaoProdutoRoute } from './avaliacao-produto.route';

@NgModule({
  imports: [CrmvaleverdeSharedModule, RouterModule.forChild(avaliacaoProdutoRoute)],
  declarations: [
    AvaliacaoProdutoComponent,
    AvaliacaoProdutoDetailComponent,
    AvaliacaoProdutoUpdateComponent,
    AvaliacaoProdutoDeleteDialogComponent,
  ],
  entryComponents: [AvaliacaoProdutoDeleteDialogComponent],
})
export class CrmvaleverdeAvaliacaoProdutoModule {}
