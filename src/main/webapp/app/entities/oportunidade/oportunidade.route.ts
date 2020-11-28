import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IOportunidade, Oportunidade } from 'app/shared/model/oportunidade.model';
import { OportunidadeService } from './oportunidade.service';
import { OportunidadeComponent } from './oportunidade.component';
import { OportunidadeDetailComponent } from './oportunidade-detail.component';
import { OportunidadeUpdateComponent } from './oportunidade-update.component';

@Injectable({ providedIn: 'root' })
export class OportunidadeResolve implements Resolve<IOportunidade> {
  constructor(private service: OportunidadeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOportunidade> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((oportunidade: HttpResponse<Oportunidade>) => {
          if (oportunidade.body) {
            return of(oportunidade.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Oportunidade());
  }
}

export const oportunidadeRoute: Routes = [
  {
    path: '',
    component: OportunidadeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.oportunidade.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OportunidadeDetailComponent,
    resolve: {
      oportunidade: OportunidadeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.oportunidade.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OportunidadeUpdateComponent,
    resolve: {
      oportunidade: OportunidadeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.oportunidade.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OportunidadeUpdateComponent,
    resolve: {
      oportunidade: OportunidadeResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.oportunidade.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
