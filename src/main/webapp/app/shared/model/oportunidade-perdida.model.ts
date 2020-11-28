import { Moment } from 'moment';
import { IOportunidade } from 'app/shared/model/oportunidade.model';

export interface IOportunidadePerdida {
  id?: number;
  descricaoPerda?: string;
  date?: Moment;
  vendaNaoEfetuada?: IOportunidade;
}

export class OportunidadePerdida implements IOportunidadePerdida {
  constructor(public id?: number, public descricaoPerda?: string, public date?: Moment, public vendaNaoEfetuada?: IOportunidade) {}
}
