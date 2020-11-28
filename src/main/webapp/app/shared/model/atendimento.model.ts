import { Moment } from 'moment';
import { IOportunidade } from 'app/shared/model/oportunidade.model';
import { IEtapaAtendimento } from 'app/shared/model/etapa-atendimento.model';
import { IProposta } from 'app/shared/model/proposta.model';
import { ICliente } from 'app/shared/model/cliente.model';
import { Tarefa } from 'app/shared/model/enumerations/tarefa.model';

export interface IAtendimento {
  id?: number;
  valorTotal?: number;
  dataInicio?: Moment;
  dataFim?: Moment;
  privacidade?: string;
  tarefa?: Tarefa;
  oportunidadesVendas?: IOportunidade[];
  etapasAtendimentos?: IEtapaAtendimento[];
  propostas?: IProposta[];
  clientesAtendidos?: ICliente;
}

export class Atendimento implements IAtendimento {
  constructor(
    public id?: number,
    public valorTotal?: number,
    public dataInicio?: Moment,
    public dataFim?: Moment,
    public privacidade?: string,
    public tarefa?: Tarefa,
    public oportunidadesVendas?: IOportunidade[],
    public etapasAtendimentos?: IEtapaAtendimento[],
    public propostas?: IProposta[],
    public clientesAtendidos?: ICliente
  ) {}
}
