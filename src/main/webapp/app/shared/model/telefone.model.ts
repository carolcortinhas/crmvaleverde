import { IContato } from 'app/shared/model/contato.model';

export interface ITelefone {
  id?: number;
  codArea?: number;
  numero?: number;
  whatsApp?: boolean;
  contato?: IContato;
}

export class Telefone implements ITelefone {
  constructor(public id?: number, public codArea?: number, public numero?: number, public whatsApp?: boolean, public contato?: IContato) {
    this.whatsApp = this.whatsApp || false;
  }
}
