import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRepresentantePJ } from 'app/shared/model/representante-pj.model';

@Component({
  selector: 'jhi-representante-pj-detail',
  templateUrl: './representante-pj-detail.component.html',
})
export class RepresentantePJDetailComponent implements OnInit {
  representantePJ: IRepresentantePJ | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ representantePJ }) => (this.representantePJ = representantePJ));
  }

  previousState(): void {
    window.history.back();
  }
}
