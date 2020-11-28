import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CrmvaleverdeSharedModule } from 'app/shared/shared.module';
import { DocumentoComponent } from './documento.component';
import { DocumentoDetailComponent } from './documento-detail.component';
import { DocumentoUpdateComponent } from './documento-update.component';
import { DocumentoDeleteDialogComponent } from './documento-delete-dialog.component';
import { documentoRoute } from './documento.route';

@NgModule({
  imports: [CrmvaleverdeSharedModule, RouterModule.forChild(documentoRoute)],
  declarations: [DocumentoComponent, DocumentoDetailComponent, DocumentoUpdateComponent, DocumentoDeleteDialogComponent],
  entryComponents: [DocumentoDeleteDialogComponent],
})
export class CrmvaleverdeDocumentoModule {}
