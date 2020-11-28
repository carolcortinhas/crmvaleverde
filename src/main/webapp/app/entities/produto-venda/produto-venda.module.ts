import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CrmvaleverdeSharedModule } from 'app/shared/shared.module';
import { ProdutoVendaComponent } from './produto-venda.component';
import { ProdutoVendaDetailComponent } from './produto-venda-detail.component';
import { ProdutoVendaUpdateComponent } from './produto-venda-update.component';
import { ProdutoVendaDeleteDialogComponent } from './produto-venda-delete-dialog.component';
import { produtoVendaRoute } from './produto-venda.route';

@NgModule({
  imports: [CrmvaleverdeSharedModule, RouterModule.forChild(produtoVendaRoute)],
  declarations: [ProdutoVendaComponent, ProdutoVendaDetailComponent, ProdutoVendaUpdateComponent, ProdutoVendaDeleteDialogComponent],
  entryComponents: [ProdutoVendaDeleteDialogComponent],
})
export class CrmvaleverdeProdutoVendaModule {}
