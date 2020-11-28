import { IAvaliacao } from 'app/shared/model/avaliacao.model';

export interface IAvaliacaoProduto {
  id?: number;
  avaliacao?: IAvaliacao;
}

export class AvaliacaoProduto implements IAvaliacaoProduto {
  constructor(public id?: number, public avaliacao?: IAvaliacao) {}
}
