import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConsultor } from 'app/shared/model/consultor.model';

@Component({
  selector: 'jhi-consultor-detail',
  templateUrl: './consultor-detail.component.html',
})
export class ConsultorDetailComponent implements OnInit {
  consultor: IConsultor | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ consultor }) => (this.consultor = consultor));
  }

  previousState(): void {
    window.history.back();
  }
}
