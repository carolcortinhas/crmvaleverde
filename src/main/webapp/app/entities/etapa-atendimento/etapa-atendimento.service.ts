import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IEtapaAtendimento } from 'app/shared/model/etapa-atendimento.model';

type EntityResponseType = HttpResponse<IEtapaAtendimento>;
type EntityArrayResponseType = HttpResponse<IEtapaAtendimento[]>;

@Injectable({ providedIn: 'root' })
export class EtapaAtendimentoService {
  public resourceUrl = SERVER_API_URL + 'api/etapa-atendimentos';

  constructor(protected http: HttpClient) {}

  create(etapaAtendimento: IEtapaAtendimento): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(etapaAtendimento);
    return this.http
      .post<IEtapaAtendimento>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(etapaAtendimento: IEtapaAtendimento): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(etapaAtendimento);
    return this.http
      .put<IEtapaAtendimento>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IEtapaAtendimento>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IEtapaAtendimento[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(etapaAtendimento: IEtapaAtendimento): IEtapaAtendimento {
    const copy: IEtapaAtendimento = Object.assign({}, etapaAtendimento, {
      data: etapaAtendimento.data && etapaAtendimento.data.isValid() ? etapaAtendimento.data.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.data = res.body.data ? moment(res.body.data) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((etapaAtendimento: IEtapaAtendimento) => {
        etapaAtendimento.data = etapaAtendimento.data ? moment(etapaAtendimento.data) : undefined;
      });
    }
    return res;
  }
}
