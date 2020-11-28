import { IAdministrador } from 'app/shared/model/administrador.model';
import { IConsultor } from 'app/shared/model/consultor.model';
import { IGerente } from 'app/shared/model/gerente.model';
import { IPessoa } from 'app/shared/model/pessoa.model';

export interface IFuncionario {
  id?: number;
  codStur?: number;
  nome?: string;
  cargo?: string;
  administradores?: IAdministrador[];
  vendedores?: IConsultor[];
  gerentes?: IGerente[];
  pessoa?: IPessoa;
}

export class Funcionario implements IFuncionario {
  constructor(
    public id?: number,
    public codStur?: number,
    public nome?: string,
    public cargo?: string,
    public administradores?: IAdministrador[],
    public vendedores?: IConsultor[],
    public gerentes?: IGerente[],
    public pessoa?: IPessoa
  ) {}
}
