import { Moment } from 'moment';
import { IAtendimento } from 'app/shared/model/atendimento.model';
import { Situacao } from 'app/shared/model/enumerations/situacao.model';

export interface IEtapaAtendimento {
  id?: number;
  data?: Moment;
  descricao?: string;
  situacao?: Situacao;
  atendimento?: IAtendimento;
}

export class EtapaAtendimento implements IEtapaAtendimento {
  constructor(
    public id?: number,
    public data?: Moment,
    public descricao?: string,
    public situacao?: Situacao,
    public atendimento?: IAtendimento
  ) {}
}
