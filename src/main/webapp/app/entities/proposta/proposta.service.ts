import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProposta } from 'app/shared/model/proposta.model';

type EntityResponseType = HttpResponse<IProposta>;
type EntityArrayResponseType = HttpResponse<IProposta[]>;

@Injectable({ providedIn: 'root' })
export class PropostaService {
  public resourceUrl = SERVER_API_URL + 'api/propostas';

  constructor(protected http: HttpClient) {}

  create(proposta: IProposta): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(proposta);
    return this.http
      .post<IProposta>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(proposta: IProposta): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(proposta);
    return this.http
      .put<IProposta>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProposta>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProposta[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(proposta: IProposta): IProposta {
    const copy: IProposta = Object.assign({}, proposta, {
      data: proposta.data && proposta.data.isValid() ? proposta.data.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((proposta: IProposta) => {
        proposta.data = proposta.data ? moment(proposta.data) : undefined;
      });
    }
    return res;
  }
}
