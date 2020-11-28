import { IAvaliacaoProduto } from 'app/shared/model/avaliacao-produto.model';
import { IAvaliacaoAtendimento } from 'app/shared/model/avaliacao-atendimento.model';
import { ICliente } from 'app/shared/model/cliente.model';

export interface IAvaliacao {
  id?: number;
  nivelSatisfacao?: string;
  descricao?: string;
  avaliacaoProduto?: IAvaliacaoProduto;
  avaliacaoAtendimento?: IAvaliacaoAtendimento;
  clientesAvaliacoes?: ICliente;
}

export class Avaliacao implements IAvaliacao {
  constructor(
    public id?: number,
    public nivelSatisfacao?: string,
    public descricao?: string,
    public avaliacaoProduto?: IAvaliacaoProduto,
    public avaliacaoAtendimento?: IAvaliacaoAtendimento,
    public clientesAvaliacoes?: ICliente
  ) {}
}
