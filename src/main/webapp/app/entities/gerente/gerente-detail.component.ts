import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGerente } from 'app/shared/model/gerente.model';

@Component({
  selector: 'jhi-gerente-detail',
  templateUrl: './gerente-detail.component.html',
})
export class GerenteDetailComponent implements OnInit {
  gerente: IGerente | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ gerente }) => (this.gerente = gerente));
  }

  previousState(): void {
    window.history.back();
  }
}
