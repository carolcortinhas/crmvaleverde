import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CrmvaleverdeSharedModule } from 'app/shared/shared.module';
import { AvaliacaoAtendimentoComponent } from './avaliacao-atendimento.component';
import { AvaliacaoAtendimentoDetailComponent } from './avaliacao-atendimento-detail.component';
import { AvaliacaoAtendimentoUpdateComponent } from './avaliacao-atendimento-update.component';
import { AvaliacaoAtendimentoDeleteDialogComponent } from './avaliacao-atendimento-delete-dialog.component';
import { avaliacaoAtendimentoRoute } from './avaliacao-atendimento.route';

@NgModule({
  imports: [CrmvaleverdeSharedModule, RouterModule.forChild(avaliacaoAtendimentoRoute)],
  declarations: [
    AvaliacaoAtendimentoComponent,
    AvaliacaoAtendimentoDetailComponent,
    AvaliacaoAtendimentoUpdateComponent,
    AvaliacaoAtendimentoDeleteDialogComponent,
  ],
  entryComponents: [AvaliacaoAtendimentoDeleteDialogComponent],
})
export class CrmvaleverdeAvaliacaoAtendimentoModule {}
