import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAdministrador, Administrador } from 'app/shared/model/administrador.model';
import { AdministradorService } from './administrador.service';
import { AdministradorComponent } from './administrador.component';
import { AdministradorDetailComponent } from './administrador-detail.component';
import { AdministradorUpdateComponent } from './administrador-update.component';

@Injectable({ providedIn: 'root' })
export class AdministradorResolve implements Resolve<IAdministrador> {
  constructor(private service: AdministradorService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAdministrador> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((administrador: HttpResponse<Administrador>) => {
          if (administrador.body) {
            return of(administrador.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Administrador());
  }
}

export const administradorRoute: Routes = [
  {
    path: '',
    component: AdministradorComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.administrador.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AdministradorDetailComponent,
    resolve: {
      administrador: AdministradorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.administrador.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AdministradorUpdateComponent,
    resolve: {
      administrador: AdministradorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.administrador.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AdministradorUpdateComponent,
    resolve: {
      administrador: AdministradorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.administrador.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
