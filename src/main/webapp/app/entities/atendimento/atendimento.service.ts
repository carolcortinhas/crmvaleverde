import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAtendimento } from 'app/shared/model/atendimento.model';

type EntityResponseType = HttpResponse<IAtendimento>;
type EntityArrayResponseType = HttpResponse<IAtendimento[]>;

@Injectable({ providedIn: 'root' })
export class AtendimentoService {
  public resourceUrl = SERVER_API_URL + 'api/atendimentos';

  constructor(protected http: HttpClient) {}

  create(atendimento: IAtendimento): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(atendimento);
    return this.http
      .post<IAtendimento>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(atendimento: IAtendimento): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(atendimento);
    return this.http
      .put<IAtendimento>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAtendimento>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAtendimento[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(atendimento: IAtendimento): IAtendimento {
    const copy: IAtendimento = Object.assign({}, atendimento, {
      dataInicio: atendimento.dataInicio && atendimento.dataInicio.isValid() ? atendimento.dataInicio.toJSON() : undefined,
      dataFim: atendimento.dataFim && atendimento.dataFim.isValid() ? atendimento.dataFim.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataInicio = res.body.dataInicio ? moment(res.body.dataInicio) : undefined;
      res.body.dataFim = res.body.dataFim ? moment(res.body.dataFim) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((atendimento: IAtendimento) => {
        atendimento.dataInicio = atendimento.dataInicio ? moment(atendimento.dataInicio) : undefined;
        atendimento.dataFim = atendimento.dataFim ? moment(atendimento.dataFim) : undefined;
      });
    }
    return res;
  }
}
