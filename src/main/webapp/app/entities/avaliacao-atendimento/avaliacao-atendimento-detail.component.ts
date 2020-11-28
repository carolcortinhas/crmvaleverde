import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAvaliacaoAtendimento } from 'app/shared/model/avaliacao-atendimento.model';

@Component({
  selector: 'jhi-avaliacao-atendimento-detail',
  templateUrl: './avaliacao-atendimento-detail.component.html',
})
export class AvaliacaoAtendimentoDetailComponent implements OnInit {
  avaliacaoAtendimento: IAvaliacaoAtendimento | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ avaliacaoAtendimento }) => (this.avaliacaoAtendimento = avaliacaoAtendimento));
  }

  previousState(): void {
    window.history.back();
  }
}
