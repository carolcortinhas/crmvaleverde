import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IConsultor } from 'app/shared/model/consultor.model';

type EntityResponseType = HttpResponse<IConsultor>;
type EntityArrayResponseType = HttpResponse<IConsultor[]>;

@Injectable({ providedIn: 'root' })
export class ConsultorService {
  public resourceUrl = SERVER_API_URL + 'api/consultors';

  constructor(protected http: HttpClient) {}

  create(consultor: IConsultor): Observable<EntityResponseType> {
    return this.http.post<IConsultor>(this.resourceUrl, consultor, { observe: 'response' });
  }

  update(consultor: IConsultor): Observable<EntityResponseType> {
    return this.http.put<IConsultor>(this.resourceUrl, consultor, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IConsultor>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IConsultor[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
