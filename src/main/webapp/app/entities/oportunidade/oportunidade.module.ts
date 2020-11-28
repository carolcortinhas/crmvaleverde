import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CrmvaleverdeSharedModule } from 'app/shared/shared.module';
import { OportunidadeComponent } from './oportunidade.component';
import { OportunidadeDetailComponent } from './oportunidade-detail.component';
import { OportunidadeUpdateComponent } from './oportunidade-update.component';
import { OportunidadeDeleteDialogComponent } from './oportunidade-delete-dialog.component';
import { oportunidadeRoute } from './oportunidade.route';

@NgModule({
  imports: [CrmvaleverdeSharedModule, RouterModule.forChild(oportunidadeRoute)],
  declarations: [OportunidadeComponent, OportunidadeDetailComponent, OportunidadeUpdateComponent, OportunidadeDeleteDialogComponent],
  entryComponents: [OportunidadeDeleteDialogComponent],
})
export class CrmvaleverdeOportunidadeModule {}
