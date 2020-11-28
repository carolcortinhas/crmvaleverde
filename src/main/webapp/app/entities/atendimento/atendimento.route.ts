import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAtendimento, Atendimento } from 'app/shared/model/atendimento.model';
import { AtendimentoService } from './atendimento.service';
import { AtendimentoComponent } from './atendimento.component';
import { AtendimentoDetailComponent } from './atendimento-detail.component';
import { AtendimentoUpdateComponent } from './atendimento-update.component';

@Injectable({ providedIn: 'root' })
export class AtendimentoResolve implements Resolve<IAtendimento> {
  constructor(private service: AtendimentoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAtendimento> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((atendimento: HttpResponse<Atendimento>) => {
          if (atendimento.body) {
            return of(atendimento.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Atendimento());
  }
}

export const atendimentoRoute: Routes = [
  {
    path: '',
    component: AtendimentoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.atendimento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AtendimentoDetailComponent,
    resolve: {
      atendimento: AtendimentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.atendimento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AtendimentoUpdateComponent,
    resolve: {
      atendimento: AtendimentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.atendimento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AtendimentoUpdateComponent,
    resolve: {
      atendimento: AtendimentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.atendimento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
