import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IClientePessoaFisica, ClientePessoaFisica } from 'app/shared/model/cliente-pessoa-fisica.model';
import { ClientePessoaFisicaService } from './cliente-pessoa-fisica.service';
import { ClientePessoaFisicaComponent } from './cliente-pessoa-fisica.component';
import { ClientePessoaFisicaDetailComponent } from './cliente-pessoa-fisica-detail.component';
import { ClientePessoaFisicaUpdateComponent } from './cliente-pessoa-fisica-update.component';

@Injectable({ providedIn: 'root' })
export class ClientePessoaFisicaResolve implements Resolve<IClientePessoaFisica> {
  constructor(private service: ClientePessoaFisicaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IClientePessoaFisica> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((clientePessoaFisica: HttpResponse<ClientePessoaFisica>) => {
          if (clientePessoaFisica.body) {
            return of(clientePessoaFisica.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ClientePessoaFisica());
  }
}

export const clientePessoaFisicaRoute: Routes = [
  {
    path: '',
    component: ClientePessoaFisicaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.clientePessoaFisica.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ClientePessoaFisicaDetailComponent,
    resolve: {
      clientePessoaFisica: ClientePessoaFisicaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.clientePessoaFisica.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ClientePessoaFisicaUpdateComponent,
    resolve: {
      clientePessoaFisica: ClientePessoaFisicaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.clientePessoaFisica.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ClientePessoaFisicaUpdateComponent,
    resolve: {
      clientePessoaFisica: ClientePessoaFisicaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.clientePessoaFisica.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
