import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IClientePessoaFisica } from 'app/shared/model/cliente-pessoa-fisica.model';

type EntityResponseType = HttpResponse<IClientePessoaFisica>;
type EntityArrayResponseType = HttpResponse<IClientePessoaFisica[]>;

@Injectable({ providedIn: 'root' })
export class ClientePessoaFisicaService {
  public resourceUrl = SERVER_API_URL + 'api/cliente-pessoa-fisicas';

  constructor(protected http: HttpClient) {}

  create(clientePessoaFisica: IClientePessoaFisica): Observable<EntityResponseType> {
    return this.http.post<IClientePessoaFisica>(this.resourceUrl, clientePessoaFisica, { observe: 'response' });
  }

  update(clientePessoaFisica: IClientePessoaFisica): Observable<EntityResponseType> {
    return this.http.put<IClientePessoaFisica>(this.resourceUrl, clientePessoaFisica, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IClientePessoaFisica>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IClientePessoaFisica[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
