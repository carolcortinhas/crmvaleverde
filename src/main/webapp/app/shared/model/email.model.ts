import { IContato } from 'app/shared/model/contato.model';

export interface IEmail {
  id?: number;
  enderecoEmail?: string;
  contato?: IContato;
}

export class Email implements IEmail {
  constructor(public id?: number, public enderecoEmail?: string, public contato?: IContato) {}
}
