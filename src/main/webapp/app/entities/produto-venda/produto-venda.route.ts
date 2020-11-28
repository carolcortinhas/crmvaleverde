import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProdutoVenda, ProdutoVenda } from 'app/shared/model/produto-venda.model';
import { ProdutoVendaService } from './produto-venda.service';
import { ProdutoVendaComponent } from './produto-venda.component';
import { ProdutoVendaDetailComponent } from './produto-venda-detail.component';
import { ProdutoVendaUpdateComponent } from './produto-venda-update.component';

@Injectable({ providedIn: 'root' })
export class ProdutoVendaResolve implements Resolve<IProdutoVenda> {
  constructor(private service: ProdutoVendaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProdutoVenda> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((produtoVenda: HttpResponse<ProdutoVenda>) => {
          if (produtoVenda.body) {
            return of(produtoVenda.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProdutoVenda());
  }
}

export const produtoVendaRoute: Routes = [
  {
    path: '',
    component: ProdutoVendaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.produtoVenda.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProdutoVendaDetailComponent,
    resolve: {
      produtoVenda: ProdutoVendaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.produtoVenda.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProdutoVendaUpdateComponent,
    resolve: {
      produtoVenda: ProdutoVendaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.produtoVenda.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProdutoVendaUpdateComponent,
    resolve: {
      produtoVenda: ProdutoVendaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.produtoVenda.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
