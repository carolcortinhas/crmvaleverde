import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IOportunidade } from 'app/shared/model/oportunidade.model';

type EntityResponseType = HttpResponse<IOportunidade>;
type EntityArrayResponseType = HttpResponse<IOportunidade[]>;

@Injectable({ providedIn: 'root' })
export class OportunidadeService {
  public resourceUrl = SERVER_API_URL + 'api/oportunidades';

  constructor(protected http: HttpClient) {}

  create(oportunidade: IOportunidade): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(oportunidade);
    return this.http
      .post<IOportunidade>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(oportunidade: IOportunidade): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(oportunidade);
    return this.http
      .put<IOportunidade>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IOportunidade>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IOportunidade[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(oportunidade: IOportunidade): IOportunidade {
    const copy: IOportunidade = Object.assign({}, oportunidade, {
      data: oportunidade.data && oportunidade.data.isValid() ? oportunidade.data.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((oportunidade: IOportunidade) => {
        oportunidade.data = oportunidade.data ? moment(oportunidade.data) : undefined;
      });
    }
    return res;
  }
}
