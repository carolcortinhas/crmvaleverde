import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAvaliacao, Avaliacao } from 'app/shared/model/avaliacao.model';
import { AvaliacaoService } from './avaliacao.service';
import { AvaliacaoComponent } from './avaliacao.component';
import { AvaliacaoDetailComponent } from './avaliacao-detail.component';
import { AvaliacaoUpdateComponent } from './avaliacao-update.component';

@Injectable({ providedIn: 'root' })
export class AvaliacaoResolve implements Resolve<IAvaliacao> {
  constructor(private service: AvaliacaoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAvaliacao> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((avaliacao: HttpResponse<Avaliacao>) => {
          if (avaliacao.body) {
            return of(avaliacao.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Avaliacao());
  }
}

export const avaliacaoRoute: Routes = [
  {
    path: '',
    component: AvaliacaoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.avaliacao.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AvaliacaoDetailComponent,
    resolve: {
      avaliacao: AvaliacaoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.avaliacao.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AvaliacaoUpdateComponent,
    resolve: {
      avaliacao: AvaliacaoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.avaliacao.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AvaliacaoUpdateComponent,
    resolve: {
      avaliacao: AvaliacaoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.avaliacao.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
