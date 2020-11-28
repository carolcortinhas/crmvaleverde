import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IClientePessoaJuridica } from 'app/shared/model/cliente-pessoa-juridica.model';

type EntityResponseType = HttpResponse<IClientePessoaJuridica>;
type EntityArrayResponseType = HttpResponse<IClientePessoaJuridica[]>;

@Injectable({ providedIn: 'root' })
export class ClientePessoaJuridicaService {
  public resourceUrl = SERVER_API_URL + 'api/cliente-pessoa-juridicas';

  constructor(protected http: HttpClient) {}

  create(clientePessoaJuridica: IClientePessoaJuridica): Observable<EntityResponseType> {
    return this.http.post<IClientePessoaJuridica>(this.resourceUrl, clientePessoaJuridica, { observe: 'response' });
  }

  update(clientePessoaJuridica: IClientePessoaJuridica): Observable<EntityResponseType> {
    return this.http.put<IClientePessoaJuridica>(this.resourceUrl, clientePessoaJuridica, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IClientePessoaJuridica>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IClientePessoaJuridica[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
