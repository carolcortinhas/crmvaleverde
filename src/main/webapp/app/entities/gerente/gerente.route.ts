import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IGerente, Gerente } from 'app/shared/model/gerente.model';
import { GerenteService } from './gerente.service';
import { GerenteComponent } from './gerente.component';
import { GerenteDetailComponent } from './gerente-detail.component';
import { GerenteUpdateComponent } from './gerente-update.component';

@Injectable({ providedIn: 'root' })
export class GerenteResolve implements Resolve<IGerente> {
  constructor(private service: GerenteService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGerente> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((gerente: HttpResponse<Gerente>) => {
          if (gerente.body) {
            return of(gerente.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Gerente());
  }
}

export const gerenteRoute: Routes = [
  {
    path: '',
    component: GerenteComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.gerente.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: GerenteDetailComponent,
    resolve: {
      gerente: GerenteResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.gerente.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: GerenteUpdateComponent,
    resolve: {
      gerente: GerenteResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.gerente.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: GerenteUpdateComponent,
    resolve: {
      gerente: GerenteResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.gerente.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
