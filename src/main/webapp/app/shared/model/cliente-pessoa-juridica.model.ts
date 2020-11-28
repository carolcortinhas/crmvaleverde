import { ICliente } from 'app/shared/model/cliente.model';

export interface IClientePessoaJuridica {
  id?: number;
  cnpj?: number;
  razaoSocial?: string;
  clientePJ?: ICliente;
}

export class ClientePessoaJuridica implements IClientePessoaJuridica {
  constructor(public id?: number, public cnpj?: number, public razaoSocial?: string, public clientePJ?: ICliente) {}
}
