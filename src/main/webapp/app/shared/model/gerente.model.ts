import { IFuncionario } from 'app/shared/model/funcionario.model';

export interface IGerente {
  id?: number;
  nome?: string;
  funcionario3?: IFuncionario;
}

export class Gerente implements IGerente {
  constructor(public id?: number, public nome?: string, public funcionario3?: IFuncionario) {}
}
