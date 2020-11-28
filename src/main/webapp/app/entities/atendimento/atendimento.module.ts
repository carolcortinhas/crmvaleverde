import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CrmvaleverdeSharedModule } from 'app/shared/shared.module';
import { AtendimentoComponent } from './atendimento.component';
import { AtendimentoDetailComponent } from './atendimento-detail.component';
import { AtendimentoUpdateComponent } from './atendimento-update.component';
import { AtendimentoDeleteDialogComponent } from './atendimento-delete-dialog.component';
import { atendimentoRoute } from './atendimento.route';

@NgModule({
  imports: [CrmvaleverdeSharedModule, RouterModule.forChild(atendimentoRoute)],
  declarations: [AtendimentoComponent, AtendimentoDetailComponent, AtendimentoUpdateComponent, AtendimentoDeleteDialogComponent],
  entryComponents: [AtendimentoDeleteDialogComponent],
})
export class CrmvaleverdeAtendimentoModule {}
