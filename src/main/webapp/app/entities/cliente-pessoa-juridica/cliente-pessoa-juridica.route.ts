import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IClientePessoaJuridica, ClientePessoaJuridica } from 'app/shared/model/cliente-pessoa-juridica.model';
import { ClientePessoaJuridicaService } from './cliente-pessoa-juridica.service';
import { ClientePessoaJuridicaComponent } from './cliente-pessoa-juridica.component';
import { ClientePessoaJuridicaDetailComponent } from './cliente-pessoa-juridica-detail.component';
import { ClientePessoaJuridicaUpdateComponent } from './cliente-pessoa-juridica-update.component';

@Injectable({ providedIn: 'root' })
export class ClientePessoaJuridicaResolve implements Resolve<IClientePessoaJuridica> {
  constructor(private service: ClientePessoaJuridicaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IClientePessoaJuridica> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((clientePessoaJuridica: HttpResponse<ClientePessoaJuridica>) => {
          if (clientePessoaJuridica.body) {
            return of(clientePessoaJuridica.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ClientePessoaJuridica());
  }
}

export const clientePessoaJuridicaRoute: Routes = [
  {
    path: '',
    component: ClientePessoaJuridicaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.clientePessoaJuridica.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ClientePessoaJuridicaDetailComponent,
    resolve: {
      clientePessoaJuridica: ClientePessoaJuridicaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.clientePessoaJuridica.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ClientePessoaJuridicaUpdateComponent,
    resolve: {
      clientePessoaJuridica: ClientePessoaJuridicaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.clientePessoaJuridica.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ClientePessoaJuridicaUpdateComponent,
    resolve: {
      clientePessoaJuridica: ClientePessoaJuridicaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.clientePessoaJuridica.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
