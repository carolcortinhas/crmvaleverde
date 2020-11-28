import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CrmvaleverdeSharedModule } from 'app/shared/shared.module';
import { ClientePessoaJuridicaComponent } from './cliente-pessoa-juridica.component';
import { ClientePessoaJuridicaDetailComponent } from './cliente-pessoa-juridica-detail.component';
import { ClientePessoaJuridicaUpdateComponent } from './cliente-pessoa-juridica-update.component';
import { ClientePessoaJuridicaDeleteDialogComponent } from './cliente-pessoa-juridica-delete-dialog.component';
import { clientePessoaJuridicaRoute } from './cliente-pessoa-juridica.route';

@NgModule({
  imports: [CrmvaleverdeSharedModule, RouterModule.forChild(clientePessoaJuridicaRoute)],
  declarations: [
    ClientePessoaJuridicaComponent,
    ClientePessoaJuridicaDetailComponent,
    ClientePessoaJuridicaUpdateComponent,
    ClientePessoaJuridicaDeleteDialogComponent,
  ],
  entryComponents: [ClientePessoaJuridicaDeleteDialogComponent],
})
export class CrmvaleverdeClientePessoaJuridicaModule {}
