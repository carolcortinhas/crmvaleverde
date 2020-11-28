import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAvaliacaoProduto } from 'app/shared/model/avaliacao-produto.model';

type EntityResponseType = HttpResponse<IAvaliacaoProduto>;
type EntityArrayResponseType = HttpResponse<IAvaliacaoProduto[]>;

@Injectable({ providedIn: 'root' })
export class AvaliacaoProdutoService {
  public resourceUrl = SERVER_API_URL + 'api/avaliacao-produtos';

  constructor(protected http: HttpClient) {}

  create(avaliacaoProduto: IAvaliacaoProduto): Observable<EntityResponseType> {
    return this.http.post<IAvaliacaoProduto>(this.resourceUrl, avaliacaoProduto, { observe: 'response' });
  }

  update(avaliacaoProduto: IAvaliacaoProduto): Observable<EntityResponseType> {
    return this.http.put<IAvaliacaoProduto>(this.resourceUrl, avaliacaoProduto, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAvaliacaoProduto>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAvaliacaoProduto[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
