import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOportunidadePerdida } from 'app/shared/model/oportunidade-perdida.model';

@Component({
  selector: 'jhi-oportunidade-perdida-detail',
  templateUrl: './oportunidade-perdida-detail.component.html',
})
export class OportunidadePerdidaDetailComponent implements OnInit {
  oportunidadePerdida: IOportunidadePerdida | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ oportunidadePerdida }) => (this.oportunidadePerdida = oportunidadePerdida));
  }

  previousState(): void {
    window.history.back();
  }
}
