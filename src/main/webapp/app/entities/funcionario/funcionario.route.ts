import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFuncionario, Funcionario } from 'app/shared/model/funcionario.model';
import { FuncionarioService } from './funcionario.service';
import { FuncionarioComponent } from './funcionario.component';
import { FuncionarioDetailComponent } from './funcionario-detail.component';
import { FuncionarioUpdateComponent } from './funcionario-update.component';

@Injectable({ providedIn: 'root' })
export class FuncionarioResolve implements Resolve<IFuncionario> {
  constructor(private service: FuncionarioService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFuncionario> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((funcionario: HttpResponse<Funcionario>) => {
          if (funcionario.body) {
            return of(funcionario.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Funcionario());
  }
}

export const funcionarioRoute: Routes = [
  {
    path: '',
    component: FuncionarioComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.funcionario.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FuncionarioDetailComponent,
    resolve: {
      funcionario: FuncionarioResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.funcionario.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FuncionarioUpdateComponent,
    resolve: {
      funcionario: FuncionarioResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.funcionario.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FuncionarioUpdateComponent,
    resolve: {
      funcionario: FuncionarioResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.funcionario.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
