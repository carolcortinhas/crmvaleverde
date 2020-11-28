import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProposta } from 'app/shared/model/proposta.model';

@Component({
  selector: 'jhi-proposta-detail',
  templateUrl: './proposta-detail.component.html',
})
export class PropostaDetailComponent implements OnInit {
  proposta: IProposta | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ proposta }) => (this.proposta = proposta));
  }

  previousState(): void {
    window.history.back();
  }
}
