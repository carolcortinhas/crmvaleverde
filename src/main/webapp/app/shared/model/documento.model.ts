import { IProposta } from 'app/shared/model/proposta.model';

export interface IDocumento {
  id?: number;
  nomeArquivo?: string;
  propostaDocumentos?: IProposta;
}

export class Documento implements IDocumento {
  constructor(public id?: number, public nomeArquivo?: string, public propostaDocumentos?: IProposta) {}
}
