import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContato } from 'app/shared/model/contato.model';

@Component({
  selector: 'jhi-contato-detail',
  templateUrl: './contato-detail.component.html',
})
export class ContatoDetailComponent implements OnInit {
  contato: IContato | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contato }) => (this.contato = contato));
  }

  previousState(): void {
    window.history.back();
  }
}
