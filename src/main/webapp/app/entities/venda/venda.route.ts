import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IVenda, Venda } from 'app/shared/model/venda.model';
import { VendaService } from './venda.service';
import { VendaComponent } from './venda.component';
import { VendaDetailComponent } from './venda-detail.component';
import { VendaUpdateComponent } from './venda-update.component';

@Injectable({ providedIn: 'root' })
export class VendaResolve implements Resolve<IVenda> {
  constructor(private service: VendaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IVenda> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((venda: HttpResponse<Venda>) => {
          if (venda.body) {
            return of(venda.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Venda());
  }
}

export const vendaRoute: Routes = [
  {
    path: '',
    component: VendaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.venda.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: VendaDetailComponent,
    resolve: {
      venda: VendaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.venda.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: VendaUpdateComponent,
    resolve: {
      venda: VendaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.venda.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: VendaUpdateComponent,
    resolve: {
      venda: VendaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.venda.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
