import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAvaliacaoAtendimento } from 'app/shared/model/avaliacao-atendimento.model';

type EntityResponseType = HttpResponse<IAvaliacaoAtendimento>;
type EntityArrayResponseType = HttpResponse<IAvaliacaoAtendimento[]>;

@Injectable({ providedIn: 'root' })
export class AvaliacaoAtendimentoService {
  public resourceUrl = SERVER_API_URL + 'api/avaliacao-atendimentos';

  constructor(protected http: HttpClient) {}

  create(avaliacaoAtendimento: IAvaliacaoAtendimento): Observable<EntityResponseType> {
    return this.http.post<IAvaliacaoAtendimento>(this.resourceUrl, avaliacaoAtendimento, { observe: 'response' });
  }

  update(avaliacaoAtendimento: IAvaliacaoAtendimento): Observable<EntityResponseType> {
    return this.http.put<IAvaliacaoAtendimento>(this.resourceUrl, avaliacaoAtendimento, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAvaliacaoAtendimento>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAvaliacaoAtendimento[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
