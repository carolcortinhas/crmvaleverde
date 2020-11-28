import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CrmvaleverdeSharedModule } from 'app/shared/shared.module';
import { AdministradorComponent } from './administrador.component';
import { AdministradorDetailComponent } from './administrador-detail.component';
import { AdministradorUpdateComponent } from './administrador-update.component';
import { AdministradorDeleteDialogComponent } from './administrador-delete-dialog.component';
import { administradorRoute } from './administrador.route';

@NgModule({
  imports: [CrmvaleverdeSharedModule, RouterModule.forChild(administradorRoute)],
  declarations: [AdministradorComponent, AdministradorDetailComponent, AdministradorUpdateComponent, AdministradorDeleteDialogComponent],
  entryComponents: [AdministradorDeleteDialogComponent],
})
export class CrmvaleverdeAdministradorModule {}
