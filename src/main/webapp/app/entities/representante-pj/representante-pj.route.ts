import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRepresentantePJ, RepresentantePJ } from 'app/shared/model/representante-pj.model';
import { RepresentantePJService } from './representante-pj.service';
import { RepresentantePJComponent } from './representante-pj.component';
import { RepresentantePJDetailComponent } from './representante-pj-detail.component';
import { RepresentantePJUpdateComponent } from './representante-pj-update.component';

@Injectable({ providedIn: 'root' })
export class RepresentantePJResolve implements Resolve<IRepresentantePJ> {
  constructor(private service: RepresentantePJService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRepresentantePJ> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((representantePJ: HttpResponse<RepresentantePJ>) => {
          if (representantePJ.body) {
            return of(representantePJ.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RepresentantePJ());
  }
}

export const representantePJRoute: Routes = [
  {
    path: '',
    component: RepresentantePJComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.representantePJ.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RepresentantePJDetailComponent,
    resolve: {
      representantePJ: RepresentantePJResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.representantePJ.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RepresentantePJUpdateComponent,
    resolve: {
      representantePJ: RepresentantePJResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.representantePJ.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RepresentantePJUpdateComponent,
    resolve: {
      representantePJ: RepresentantePJResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.representantePJ.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
