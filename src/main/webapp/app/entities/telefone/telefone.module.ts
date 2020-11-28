import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CrmvaleverdeSharedModule } from 'app/shared/shared.module';
import { TelefoneComponent } from './telefone.component';
import { TelefoneDetailComponent } from './telefone-detail.component';
import { TelefoneUpdateComponent } from './telefone-update.component';
import { TelefoneDeleteDialogComponent } from './telefone-delete-dialog.component';
import { telefoneRoute } from './telefone.route';

@NgModule({
  imports: [CrmvaleverdeSharedModule, RouterModule.forChild(telefoneRoute)],
  declarations: [TelefoneComponent, TelefoneDetailComponent, TelefoneUpdateComponent, TelefoneDeleteDialogComponent],
  entryComponents: [TelefoneDeleteDialogComponent],
})
export class CrmvaleverdeTelefoneModule {}
