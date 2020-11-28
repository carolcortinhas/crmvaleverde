import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CrmvaleverdeSharedModule } from 'app/shared/shared.module';
import { OportunidadePerdidaComponent } from './oportunidade-perdida.component';
import { OportunidadePerdidaDetailComponent } from './oportunidade-perdida-detail.component';
import { OportunidadePerdidaUpdateComponent } from './oportunidade-perdida-update.component';
import { OportunidadePerdidaDeleteDialogComponent } from './oportunidade-perdida-delete-dialog.component';
import { oportunidadePerdidaRoute } from './oportunidade-perdida.route';

@NgModule({
  imports: [CrmvaleverdeSharedModule, RouterModule.forChild(oportunidadePerdidaRoute)],
  declarations: [
    OportunidadePerdidaComponent,
    OportunidadePerdidaDetailComponent,
    OportunidadePerdidaUpdateComponent,
    OportunidadePerdidaDeleteDialogComponent,
  ],
  entryComponents: [OportunidadePerdidaDeleteDialogComponent],
})
export class CrmvaleverdeOportunidadePerdidaModule {}
