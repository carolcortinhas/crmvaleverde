import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IClientePessoaFisica } from 'app/shared/model/cliente-pessoa-fisica.model';

@Component({
  selector: 'jhi-cliente-pessoa-fisica-detail',
  templateUrl: './cliente-pessoa-fisica-detail.component.html',
})
export class ClientePessoaFisicaDetailComponent implements OnInit {
  clientePessoaFisica: IClientePessoaFisica | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ clientePessoaFisica }) => (this.clientePessoaFisica = clientePessoaFisica));
  }

  previousState(): void {
    window.history.back();
  }
}
