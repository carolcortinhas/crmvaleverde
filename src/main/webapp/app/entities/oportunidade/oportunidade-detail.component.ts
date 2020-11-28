import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOportunidade } from 'app/shared/model/oportunidade.model';

@Component({
  selector: 'jhi-oportunidade-detail',
  templateUrl: './oportunidade-detail.component.html',
})
export class OportunidadeDetailComponent implements OnInit {
  oportunidade: IOportunidade | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ oportunidade }) => (this.oportunidade = oportunidade));
  }

  previousState(): void {
    window.history.back();
  }
}
