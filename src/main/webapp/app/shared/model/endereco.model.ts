import { IContato } from 'app/shared/model/contato.model';
import { IPessoa } from 'app/shared/model/pessoa.model';
import { Estado } from 'app/shared/model/enumerations/estado.model';

export interface IEndereco {
  id?: number;
  logradouro?: string;
  cidade?: string;
  bairro?: string;
  cep?: string;
  numero?: number;
  complemento?: string;
  estado?: Estado;
  contato?: IContato;
  pessoa?: IPessoa;
}

export class Endereco implements IEndereco {
  constructor(
    public id?: number,
    public logradouro?: string,
    public cidade?: string,
    public bairro?: string,
    public cep?: string,
    public numero?: number,
    public complemento?: string,
    public estado?: Estado,
    public contato?: IContato,
    public pessoa?: IPessoa
  ) {}
}
