import { Moment } from 'moment';
import { IContato } from 'app/shared/model/contato.model';
import { IEndereco } from 'app/shared/model/endereco.model';
import { IFuncionario } from 'app/shared/model/funcionario.model';
import { IClientePessoaJuridica } from 'app/shared/model/cliente-pessoa-juridica.model';
import { IRepresentantePJ } from 'app/shared/model/representante-pj.model';

export interface IPessoa {
  id?: number;
  nome?: string;
  sobrenome?: string;
  descricao?: string;
  cpf?: string;
  rg?: string;
  dataNascimento?: Moment;
  sexo?: string;
  contato?: IContato;
  endereco?: IEndereco;
  funcionario?: IFuncionario;
  juridica?: IClientePessoaJuridica;
  representante?: IRepresentantePJ;
}

export class Pessoa implements IPessoa {
  constructor(
    public id?: number,
    public nome?: string,
    public sobrenome?: string,
    public descricao?: string,
    public cpf?: string,
    public rg?: string,
    public dataNascimento?: Moment,
    public sexo?: string,
    public contato?: IContato,
    public endereco?: IEndereco,
    public funcionario?: IFuncionario,
    public juridica?: IClientePessoaJuridica,
    public representante?: IRepresentantePJ
  ) {}
}
