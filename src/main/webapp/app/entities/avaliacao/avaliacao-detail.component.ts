import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAvaliacao } from 'app/shared/model/avaliacao.model';

@Component({
  selector: 'jhi-avaliacao-detail',
  templateUrl: './avaliacao-detail.component.html',
})
export class AvaliacaoDetailComponent implements OnInit {
  avaliacao: IAvaliacao | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ avaliacao }) => (this.avaliacao = avaliacao));
  }

  previousState(): void {
    window.history.back();
  }
}
