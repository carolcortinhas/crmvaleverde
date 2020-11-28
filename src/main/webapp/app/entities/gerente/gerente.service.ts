import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IGerente } from 'app/shared/model/gerente.model';

type EntityResponseType = HttpResponse<IGerente>;
type EntityArrayResponseType = HttpResponse<IGerente[]>;

@Injectable({ providedIn: 'root' })
export class GerenteService {
  public resourceUrl = SERVER_API_URL + 'api/gerentes';

  constructor(protected http: HttpClient) {}

  create(gerente: IGerente): Observable<EntityResponseType> {
    return this.http.post<IGerente>(this.resourceUrl, gerente, { observe: 'response' });
  }

  update(gerente: IGerente): Observable<EntityResponseType> {
    return this.http.put<IGerente>(this.resourceUrl, gerente, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGerente>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGerente[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
