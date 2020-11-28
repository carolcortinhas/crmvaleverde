import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CrmvaleverdeSharedModule } from 'app/shared/shared.module';
import { RepresentantePJComponent } from './representante-pj.component';
import { RepresentantePJDetailComponent } from './representante-pj-detail.component';
import { RepresentantePJUpdateComponent } from './representante-pj-update.component';
import { RepresentantePJDeleteDialogComponent } from './representante-pj-delete-dialog.component';
import { representantePJRoute } from './representante-pj.route';

@NgModule({
  imports: [CrmvaleverdeSharedModule, RouterModule.forChild(representantePJRoute)],
  declarations: [
    RepresentantePJComponent,
    RepresentantePJDetailComponent,
    RepresentantePJUpdateComponent,
    RepresentantePJDeleteDialogComponent,
  ],
  entryComponents: [RepresentantePJDeleteDialogComponent],
})
export class CrmvaleverdeRepresentantePJModule {}
