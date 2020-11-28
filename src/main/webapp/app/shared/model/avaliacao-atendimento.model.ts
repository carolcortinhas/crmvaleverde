import { IAvaliacao } from 'app/shared/model/avaliacao.model';

export interface IAvaliacaoAtendimento {
  id?: number;
  avaliacao?: IAvaliacao;
}

export class AvaliacaoAtendimento implements IAvaliacaoAtendimento {
  constructor(public id?: number, public avaliacao?: IAvaliacao) {}
}
