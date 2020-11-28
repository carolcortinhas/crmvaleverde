import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CrmvaleverdeSharedModule } from 'app/shared/shared.module';
import { AvaliacaoComponent } from './avaliacao.component';
import { AvaliacaoDetailComponent } from './avaliacao-detail.component';
import { AvaliacaoUpdateComponent } from './avaliacao-update.component';
import { AvaliacaoDeleteDialogComponent } from './avaliacao-delete-dialog.component';
import { avaliacaoRoute } from './avaliacao.route';

@NgModule({
  imports: [CrmvaleverdeSharedModule, RouterModule.forChild(avaliacaoRoute)],
  declarations: [AvaliacaoComponent, AvaliacaoDetailComponent, AvaliacaoUpdateComponent, AvaliacaoDeleteDialogComponent],
  entryComponents: [AvaliacaoDeleteDialogComponent],
})
export class CrmvaleverdeAvaliacaoModule {}
