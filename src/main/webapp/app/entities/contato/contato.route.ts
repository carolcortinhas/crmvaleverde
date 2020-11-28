import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IContato, Contato } from 'app/shared/model/contato.model';
import { ContatoService } from './contato.service';
import { ContatoComponent } from './contato.component';
import { ContatoDetailComponent } from './contato-detail.component';
import { ContatoUpdateComponent } from './contato-update.component';

@Injectable({ providedIn: 'root' })
export class ContatoResolve implements Resolve<IContato> {
  constructor(private service: ContatoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IContato> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((contato: HttpResponse<Contato>) => {
          if (contato.body) {
            return of(contato.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Contato());
  }
}

export const contatoRoute: Routes = [
  {
    path: '',
    component: ContatoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.contato.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ContatoDetailComponent,
    resolve: {
      contato: ContatoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.contato.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ContatoUpdateComponent,
    resolve: {
      contato: ContatoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.contato.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ContatoUpdateComponent,
    resolve: {
      contato: ContatoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.contato.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
