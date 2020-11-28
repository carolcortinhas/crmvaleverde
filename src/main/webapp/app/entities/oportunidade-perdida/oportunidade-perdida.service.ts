import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IOportunidadePerdida } from 'app/shared/model/oportunidade-perdida.model';

type EntityResponseType = HttpResponse<IOportunidadePerdida>;
type EntityArrayResponseType = HttpResponse<IOportunidadePerdida[]>;

@Injectable({ providedIn: 'root' })
export class OportunidadePerdidaService {
  public resourceUrl = SERVER_API_URL + 'api/oportunidade-perdidas';

  constructor(protected http: HttpClient) {}

  create(oportunidadePerdida: IOportunidadePerdida): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(oportunidadePerdida);
    return this.http
      .post<IOportunidadePerdida>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(oportunidadePerdida: IOportunidadePerdida): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(oportunidadePerdida);
    return this.http
      .put<IOportunidadePerdida>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IOportunidadePerdida>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IOportunidadePerdida[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(oportunidadePerdida: IOportunidadePerdida): IOportunidadePerdida {
    const copy: IOportunidadePerdida = Object.assign({}, oportunidadePerdida, {
      date: oportunidadePerdida.date && oportunidadePerdida.date.isValid() ? oportunidadePerdida.date.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? moment(res.body.date) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((oportunidadePerdida: IOportunidadePerdida) => {
        oportunidadePerdida.date = oportunidadePerdida.date ? moment(oportunidadePerdida.date) : undefined;
      });
    }
    return res;
  }
}
