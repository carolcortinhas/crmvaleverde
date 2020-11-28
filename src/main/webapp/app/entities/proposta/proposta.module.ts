import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CrmvaleverdeSharedModule } from 'app/shared/shared.module';
import { PropostaComponent } from './proposta.component';
import { PropostaDetailComponent } from './proposta-detail.component';
import { PropostaUpdateComponent } from './proposta-update.component';
import { PropostaDeleteDialogComponent } from './proposta-delete-dialog.component';
import { propostaRoute } from './proposta.route';

@NgModule({
  imports: [CrmvaleverdeSharedModule, RouterModule.forChild(propostaRoute)],
  declarations: [PropostaComponent, PropostaDetailComponent, PropostaUpdateComponent, PropostaDeleteDialogComponent],
  entryComponents: [PropostaDeleteDialogComponent],
})
export class CrmvaleverdePropostaModule {}
