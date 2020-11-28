import { IClientePessoaJuridica } from 'app/shared/model/cliente-pessoa-juridica.model';
import { IClientePessoaFisica } from 'app/shared/model/cliente-pessoa-fisica.model';
import { IAtendimento } from 'app/shared/model/atendimento.model';
import { IConsultor } from 'app/shared/model/consultor.model';
import { IAvaliacao } from 'app/shared/model/avaliacao.model';
import { Origem } from 'app/shared/model/enumerations/origem.model';
import { Categoria } from 'app/shared/model/enumerations/categoria.model';

export interface ICliente {
  id?: number;
  nivelSatisfacao?: string;
  origem?: Origem;
  categoria?: Categoria;
  clientePessoaJuridica?: IClientePessoaJuridica;
  clientePessoaFisica?: IClientePessoaFisica;
  atendimentos?: IAtendimento[];
  consultoresVendas?: IConsultor[];
  avalias?: IAvaliacao[];
  consultor?: IConsultor;
}

export class Cliente implements ICliente {
  constructor(
    public id?: number,
    public nivelSatisfacao?: string,
    public origem?: Origem,
    public categoria?: Categoria,
    public clientePessoaJuridica?: IClientePessoaJuridica,
    public clientePessoaFisica?: IClientePessoaFisica,
    public atendimentos?: IAtendimento[],
    public consultoresVendas?: IConsultor[],
    public avalias?: IAvaliacao[],
    public consultor?: IConsultor
  ) {}
}
