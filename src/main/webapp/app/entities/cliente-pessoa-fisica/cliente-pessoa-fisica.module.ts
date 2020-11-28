import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CrmvaleverdeSharedModule } from 'app/shared/shared.module';
import { ClientePessoaFisicaComponent } from './cliente-pessoa-fisica.component';
import { ClientePessoaFisicaDetailComponent } from './cliente-pessoa-fisica-detail.component';
import { ClientePessoaFisicaUpdateComponent } from './cliente-pessoa-fisica-update.component';
import { ClientePessoaFisicaDeleteDialogComponent } from './cliente-pessoa-fisica-delete-dialog.component';
import { clientePessoaFisicaRoute } from './cliente-pessoa-fisica.route';

@NgModule({
  imports: [CrmvaleverdeSharedModule, RouterModule.forChild(clientePessoaFisicaRoute)],
  declarations: [
    ClientePessoaFisicaComponent,
    ClientePessoaFisicaDetailComponent,
    ClientePessoaFisicaUpdateComponent,
    ClientePessoaFisicaDeleteDialogComponent,
  ],
  entryComponents: [ClientePessoaFisicaDeleteDialogComponent],
})
export class CrmvaleverdeClientePessoaFisicaModule {}
