import { IProduto } from 'app/shared/model/produto.model';
import { IVenda } from 'app/shared/model/venda.model';

export interface IProdutoVenda {
  id?: number;
  quantidade?: number;
  produto?: IProduto;
  vendasProdutos?: IVenda;
}

export class ProdutoVenda implements IProdutoVenda {
  constructor(public id?: number, public quantidade?: number, public produto?: IProduto, public vendasProdutos?: IVenda) {}
}
