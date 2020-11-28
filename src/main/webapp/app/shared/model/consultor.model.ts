import { ICliente } from 'app/shared/model/cliente.model';
import { IVenda } from 'app/shared/model/venda.model';
import { IFuncionario } from 'app/shared/model/funcionario.model';

export interface IConsultor {
  id?: number;
  nome?: string;
  atendes?: ICliente[];
  vendas?: IVenda[];
  cadastroFuncionario?: IFuncionario;
  clientesOportunidades?: ICliente;
}

export class Consultor implements IConsultor {
  constructor(
    public id?: number,
    public nome?: string,
    public atendes?: ICliente[],
    public vendas?: IVenda[],
    public cadastroFuncionario?: IFuncionario,
    public clientesOportunidades?: ICliente
  ) {}
}
