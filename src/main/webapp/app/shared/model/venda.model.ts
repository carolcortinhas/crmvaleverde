import { Moment } from 'moment';
import { IProduto } from 'app/shared/model/produto.model';
import { IProdutoVenda } from 'app/shared/model/produto-venda.model';
import { IConsultor } from 'app/shared/model/consultor.model';
import { IOportunidade } from 'app/shared/model/oportunidade.model';

export interface IVenda {
  id?: number;
  valorDesconto?: number;
  valorTotal?: number;
  diaFechamento?: Moment;
  produtosVenda1s?: IProduto[];
  produtosVenda3s?: IProdutoVenda[];
  consultorVenda?: IConsultor;
  oportunidadeVenda?: IOportunidade;
}

export class Venda implements IVenda {
  constructor(
    public id?: number,
    public valorDesconto?: number,
    public valorTotal?: number,
    public diaFechamento?: Moment,
    public produtosVenda1s?: IProduto[],
    public produtosVenda3s?: IProdutoVenda[],
    public consultorVenda?: IConsultor,
    public oportunidadeVenda?: IOportunidade
  ) {}
}
