import { IPessoa } from 'app/shared/model/pessoa.model';
import { ICliente } from 'app/shared/model/cliente.model';

export interface IClientePessoaFisica {
  id?: number;
  nome?: string;
  pessoas?: IPessoa;
  clientePF?: ICliente;
}

export class ClientePessoaFisica implements IClientePessoaFisica {
  constructor(public id?: number, public nome?: string, public pessoas?: IPessoa, public clientePF?: ICliente) {}
}
