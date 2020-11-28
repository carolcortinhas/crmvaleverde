import { IProdutoVenda } from 'app/shared/model/produto-venda.model';
import { IVenda } from 'app/shared/model/venda.model';

export interface IProduto {
  id?: number;
  codProdutoBackoffice?: number;
  valorUnitario?: number;
  nome?: string;
  descricao?: string;
  produtosVenda2s?: IProdutoVenda[];
  vendas1?: IVenda;
}

export class Produto implements IProduto {
  constructor(
    public id?: number,
    public codProdutoBackoffice?: number,
    public valorUnitario?: number,
    public nome?: string,
    public descricao?: string,
    public produtosVenda2s?: IProdutoVenda[],
    public vendas1?: IVenda
  ) {}
}
