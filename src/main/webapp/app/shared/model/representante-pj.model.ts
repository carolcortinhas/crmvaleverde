import { IClientePessoaJuridica } from 'app/shared/model/cliente-pessoa-juridica.model';
import { IPessoa } from 'app/shared/model/pessoa.model';

export interface IRepresentantePJ {
  id?: number;
  nome?: string;
  representa?: IClientePessoaJuridica;
  pessoaJuridica?: IPessoa;
}

export class RepresentantePJ implements IRepresentantePJ {
  constructor(public id?: number, public nome?: string, public representa?: IClientePessoaJuridica, public pessoaJuridica?: IPessoa) {}
}
