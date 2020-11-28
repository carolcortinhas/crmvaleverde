import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEtapaAtendimento } from 'app/shared/model/etapa-atendimento.model';

@Component({
  selector: 'jhi-etapa-atendimento-detail',
  templateUrl: './etapa-atendimento-detail.component.html',
})
export class EtapaAtendimentoDetailComponent implements OnInit {
  etapaAtendimento: IEtapaAtendimento | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ etapaAtendimento }) => (this.etapaAtendimento = etapaAtendimento));
  }

  previousState(): void {
    window.history.back();
  }
}
