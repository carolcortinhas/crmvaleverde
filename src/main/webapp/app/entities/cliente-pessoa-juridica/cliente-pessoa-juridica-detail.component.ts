import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IClientePessoaJuridica } from 'app/shared/model/cliente-pessoa-juridica.model';

@Component({
  selector: 'jhi-cliente-pessoa-juridica-detail',
  templateUrl: './cliente-pessoa-juridica-detail.component.html',
})
export class ClientePessoaJuridicaDetailComponent implements OnInit {
  clientePessoaJuridica: IClientePessoaJuridica | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ clientePessoaJuridica }) => (this.clientePessoaJuridica = clientePessoaJuridica));
  }

  previousState(): void {
    window.history.back();
  }
}
