import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAvaliacaoProduto, AvaliacaoProduto } from 'app/shared/model/avaliacao-produto.model';
import { AvaliacaoProdutoService } from './avaliacao-produto.service';
import { AvaliacaoProdutoComponent } from './avaliacao-produto.component';
import { AvaliacaoProdutoDetailComponent } from './avaliacao-produto-detail.component';
import { AvaliacaoProdutoUpdateComponent } from './avaliacao-produto-update.component';

@Injectable({ providedIn: 'root' })
export class AvaliacaoProdutoResolve implements Resolve<IAvaliacaoProduto> {
  constructor(private service: AvaliacaoProdutoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAvaliacaoProduto> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((avaliacaoProduto: HttpResponse<AvaliacaoProduto>) => {
          if (avaliacaoProduto.body) {
            return of(avaliacaoProduto.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AvaliacaoProduto());
  }
}

export const avaliacaoProdutoRoute: Routes = [
  {
    path: '',
    component: AvaliacaoProdutoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.avaliacaoProduto.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AvaliacaoProdutoDetailComponent,
    resolve: {
      avaliacaoProduto: AvaliacaoProdutoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.avaliacaoProduto.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AvaliacaoProdutoUpdateComponent,
    resolve: {
      avaliacaoProduto: AvaliacaoProdutoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.avaliacaoProduto.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AvaliacaoProdutoUpdateComponent,
    resolve: {
      avaliacaoProduto: AvaliacaoProdutoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.avaliacaoProduto.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
