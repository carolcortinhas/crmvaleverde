import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRepresentantePJ } from 'app/shared/model/representante-pj.model';

type EntityResponseType = HttpResponse<IRepresentantePJ>;
type EntityArrayResponseType = HttpResponse<IRepresentantePJ[]>;

@Injectable({ providedIn: 'root' })
export class RepresentantePJService {
  public resourceUrl = SERVER_API_URL + 'api/representante-pjs';

  constructor(protected http: HttpClient) {}

  create(representantePJ: IRepresentantePJ): Observable<EntityResponseType> {
    return this.http.post<IRepresentantePJ>(this.resourceUrl, representantePJ, { observe: 'response' });
  }

  update(representantePJ: IRepresentantePJ): Observable<EntityResponseType> {
    return this.http.put<IRepresentantePJ>(this.resourceUrl, representantePJ, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRepresentantePJ>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRepresentantePJ[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
