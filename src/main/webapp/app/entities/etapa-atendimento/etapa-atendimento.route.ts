import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEtapaAtendimento, EtapaAtendimento } from 'app/shared/model/etapa-atendimento.model';
import { EtapaAtendimentoService } from './etapa-atendimento.service';
import { EtapaAtendimentoComponent } from './etapa-atendimento.component';
import { EtapaAtendimentoDetailComponent } from './etapa-atendimento-detail.component';
import { EtapaAtendimentoUpdateComponent } from './etapa-atendimento-update.component';

@Injectable({ providedIn: 'root' })
export class EtapaAtendimentoResolve implements Resolve<IEtapaAtendimento> {
  constructor(private service: EtapaAtendimentoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEtapaAtendimento> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((etapaAtendimento: HttpResponse<EtapaAtendimento>) => {
          if (etapaAtendimento.body) {
            return of(etapaAtendimento.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EtapaAtendimento());
  }
}

export const etapaAtendimentoRoute: Routes = [
  {
    path: '',
    component: EtapaAtendimentoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.etapaAtendimento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EtapaAtendimentoDetailComponent,
    resolve: {
      etapaAtendimento: EtapaAtendimentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.etapaAtendimento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EtapaAtendimentoUpdateComponent,
    resolve: {
      etapaAtendimento: EtapaAtendimentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.etapaAtendimento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EtapaAtendimentoUpdateComponent,
    resolve: {
      etapaAtendimento: EtapaAtendimentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.etapaAtendimento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
