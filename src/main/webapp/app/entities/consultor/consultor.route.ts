import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IConsultor, Consultor } from 'app/shared/model/consultor.model';
import { ConsultorService } from './consultor.service';
import { ConsultorComponent } from './consultor.component';
import { ConsultorDetailComponent } from './consultor-detail.component';
import { ConsultorUpdateComponent } from './consultor-update.component';

@Injectable({ providedIn: 'root' })
export class ConsultorResolve implements Resolve<IConsultor> {
  constructor(private service: ConsultorService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IConsultor> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((consultor: HttpResponse<Consultor>) => {
          if (consultor.body) {
            return of(consultor.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Consultor());
  }
}

export const consultorRoute: Routes = [
  {
    path: '',
    component: ConsultorComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.consultor.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ConsultorDetailComponent,
    resolve: {
      consultor: ConsultorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.consultor.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ConsultorUpdateComponent,
    resolve: {
      consultor: ConsultorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.consultor.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ConsultorUpdateComponent,
    resolve: {
      consultor: ConsultorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.consultor.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
