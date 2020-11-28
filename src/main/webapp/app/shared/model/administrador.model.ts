import { IFuncionario } from 'app/shared/model/funcionario.model';

export interface IAdministrador {
  id?: number;
  nome?: string;
  funcionario1?: IFuncionario;
}

export class Administrador implements IAdministrador {
  constructor(public id?: number, public nome?: string, public funcionario1?: IFuncionario) {}
}
