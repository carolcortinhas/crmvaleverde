import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CrmvaleverdeSharedModule } from 'app/shared/shared.module';
import { EtapaAtendimentoComponent } from './etapa-atendimento.component';
import { EtapaAtendimentoDetailComponent } from './etapa-atendimento-detail.component';
import { EtapaAtendimentoUpdateComponent } from './etapa-atendimento-update.component';
import { EtapaAtendimentoDeleteDialogComponent } from './etapa-atendimento-delete-dialog.component';
import { etapaAtendimentoRoute } from './etapa-atendimento.route';

@NgModule({
  imports: [CrmvaleverdeSharedModule, RouterModule.forChild(etapaAtendimentoRoute)],
  declarations: [
    EtapaAtendimentoComponent,
    EtapaAtendimentoDetailComponent,
    EtapaAtendimentoUpdateComponent,
    EtapaAtendimentoDeleteDialogComponent,
  ],
  entryComponents: [EtapaAtendimentoDeleteDialogComponent],
})
export class CrmvaleverdeEtapaAtendimentoModule {}
