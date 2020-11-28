import { Moment } from 'moment';
import { IDocumento } from 'app/shared/model/documento.model';
import { IAtendimento } from 'app/shared/model/atendimento.model';

export interface IProposta {
  id?: number;
  numero?: number;
  data?: Moment;
  geraDocumentos?: IDocumento[];
  propostaVenda?: IAtendimento;
}

export class Proposta implements IProposta {
  constructor(
    public id?: number,
    public numero?: number,
    public data?: Moment,
    public geraDocumentos?: IDocumento[],
    public propostaVenda?: IAtendimento
  ) {}
}
