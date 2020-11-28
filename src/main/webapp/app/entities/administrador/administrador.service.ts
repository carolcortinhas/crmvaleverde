import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAdministrador } from 'app/shared/model/administrador.model';

type EntityResponseType = HttpResponse<IAdministrador>;
type EntityArrayResponseType = HttpResponse<IAdministrador[]>;

@Injectable({ providedIn: 'root' })
export class AdministradorService {
  public resourceUrl = SERVER_API_URL + 'api/administradors';

  constructor(protected http: HttpClient) {}

  create(administrador: IAdministrador): Observable<EntityResponseType> {
    return this.http.post<IAdministrador>(this.resourceUrl, administrador, { observe: 'response' });
  }

  update(administrador: IAdministrador): Observable<EntityResponseType> {
    return this.http.put<IAdministrador>(this.resourceUrl, administrador, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAdministrador>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAdministrador[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
