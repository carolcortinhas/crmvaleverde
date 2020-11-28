import { Moment } from 'moment';
import { IOportunidadePerdida } from 'app/shared/model/oportunidade-perdida.model';
import { IVenda } from 'app/shared/model/venda.model';
import { IAtendimento } from 'app/shared/model/atendimento.model';

export interface IOportunidade {
  id?: number;
  nomeCliente?: string;
  descricao?: string;
  data?: Moment;
  oportunidadePerdida?: IOportunidadePerdida;
  vendasOportunidades?: IVenda[];
  atendimentosOportunidades?: IAtendimento;
}

export class Oportunidade implements IOportunidade {
  constructor(
    public id?: number,
    public nomeCliente?: string,
    public descricao?: string,
    public data?: Moment,
    public oportunidadePerdida?: IOportunidadePerdida,
    public vendasOportunidades?: IVenda[],
    public atendimentosOportunidades?: IAtendimento
  ) {}
}
