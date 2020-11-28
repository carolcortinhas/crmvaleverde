import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CrmvaleverdeSharedModule } from 'app/shared/shared.module';
import { GerenteComponent } from './gerente.component';
import { GerenteDetailComponent } from './gerente-detail.component';
import { GerenteUpdateComponent } from './gerente-update.component';
import { GerenteDeleteDialogComponent } from './gerente-delete-dialog.component';
import { gerenteRoute } from './gerente.route';

@NgModule({
  imports: [CrmvaleverdeSharedModule, RouterModule.forChild(gerenteRoute)],
  declarations: [GerenteComponent, GerenteDetailComponent, GerenteUpdateComponent, GerenteDeleteDialogComponent],
  entryComponents: [GerenteDeleteDialogComponent],
})
export class CrmvaleverdeGerenteModule {}
