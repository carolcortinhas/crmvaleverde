import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProposta, Proposta } from 'app/shared/model/proposta.model';
import { PropostaService } from './proposta.service';
import { PropostaComponent } from './proposta.component';
import { PropostaDetailComponent } from './proposta-detail.component';
import { PropostaUpdateComponent } from './proposta-update.component';

@Injectable({ providedIn: 'root' })
export class PropostaResolve implements Resolve<IProposta> {
  constructor(private service: PropostaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProposta> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((proposta: HttpResponse<Proposta>) => {
          if (proposta.body) {
            return of(proposta.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Proposta());
  }
}

export const propostaRoute: Routes = [
  {
    path: '',
    component: PropostaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.proposta.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PropostaDetailComponent,
    resolve: {
      proposta: PropostaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.proposta.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PropostaUpdateComponent,
    resolve: {
      proposta: PropostaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.proposta.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PropostaUpdateComponent,
    resolve: {
      proposta: PropostaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.proposta.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
