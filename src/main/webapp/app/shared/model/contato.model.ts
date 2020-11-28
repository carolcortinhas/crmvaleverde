import { ITelefone } from 'app/shared/model/telefone.model';
import { IEmail } from 'app/shared/model/email.model';
import { IEndereco } from 'app/shared/model/endereco.model';
import { IPessoa } from 'app/shared/model/pessoa.model';

export interface IContato {
  id?: number;
  telefone?: ITelefone;
  email?: IEmail;
  endereco?: IEndereco;
  pessoa?: IPessoa;
}

export class Contato implements IContato {
  constructor(
    public id?: number,
    public telefone?: ITelefone,
    public email?: IEmail,
    public endereco?: IEndereco,
    public pessoa?: IPessoa
  ) {}
}
