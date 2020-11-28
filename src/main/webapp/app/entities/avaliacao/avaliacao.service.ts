import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAvaliacao } from 'app/shared/model/avaliacao.model';

type EntityResponseType = HttpResponse<IAvaliacao>;
type EntityArrayResponseType = HttpResponse<IAvaliacao[]>;

@Injectable({ providedIn: 'root' })
export class AvaliacaoService {
  public resourceUrl = SERVER_API_URL + 'api/avaliacaos';

  constructor(protected http: HttpClient) {}

  create(avaliacao: IAvaliacao): Observable<EntityResponseType> {
    return this.http.post<IAvaliacao>(this.resourceUrl, avaliacao, { observe: 'response' });
  }

  update(avaliacao: IAvaliacao): Observable<EntityResponseType> {
    return this.http.put<IAvaliacao>(this.resourceUrl, avaliacao, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAvaliacao>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAvaliacao[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
