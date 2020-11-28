import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IOportunidadePerdida, OportunidadePerdida } from 'app/shared/model/oportunidade-perdida.model';
import { OportunidadePerdidaService } from './oportunidade-perdida.service';
import { OportunidadePerdidaComponent } from './oportunidade-perdida.component';
import { OportunidadePerdidaDetailComponent } from './oportunidade-perdida-detail.component';
import { OportunidadePerdidaUpdateComponent } from './oportunidade-perdida-update.component';

@Injectable({ providedIn: 'root' })
export class OportunidadePerdidaResolve implements Resolve<IOportunidadePerdida> {
  constructor(private service: OportunidadePerdidaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOportunidadePerdida> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((oportunidadePerdida: HttpResponse<OportunidadePerdida>) => {
          if (oportunidadePerdida.body) {
            return of(oportunidadePerdida.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new OportunidadePerdida());
  }
}

export const oportunidadePerdidaRoute: Routes = [
  {
    path: '',
    component: OportunidadePerdidaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.oportunidadePerdida.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OportunidadePerdidaDetailComponent,
    resolve: {
      oportunidadePerdida: OportunidadePerdidaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.oportunidadePerdida.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OportunidadePerdidaUpdateComponent,
    resolve: {
      oportunidadePerdida: OportunidadePerdidaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.oportunidadePerdida.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OportunidadePerdidaUpdateComponent,
    resolve: {
      oportunidadePerdida: OportunidadePerdidaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.oportunidadePerdida.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
