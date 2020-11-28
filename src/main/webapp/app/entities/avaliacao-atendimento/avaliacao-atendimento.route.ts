import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAvaliacaoAtendimento, AvaliacaoAtendimento } from 'app/shared/model/avaliacao-atendimento.model';
import { AvaliacaoAtendimentoService } from './avaliacao-atendimento.service';
import { AvaliacaoAtendimentoComponent } from './avaliacao-atendimento.component';
import { AvaliacaoAtendimentoDetailComponent } from './avaliacao-atendimento-detail.component';
import { AvaliacaoAtendimentoUpdateComponent } from './avaliacao-atendimento-update.component';

@Injectable({ providedIn: 'root' })
export class AvaliacaoAtendimentoResolve implements Resolve<IAvaliacaoAtendimento> {
  constructor(private service: AvaliacaoAtendimentoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAvaliacaoAtendimento> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((avaliacaoAtendimento: HttpResponse<AvaliacaoAtendimento>) => {
          if (avaliacaoAtendimento.body) {
            return of(avaliacaoAtendimento.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AvaliacaoAtendimento());
  }
}

export const avaliacaoAtendimentoRoute: Routes = [
  {
    path: '',
    component: AvaliacaoAtendimentoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.avaliacaoAtendimento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AvaliacaoAtendimentoDetailComponent,
    resolve: {
      avaliacaoAtendimento: AvaliacaoAtendimentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.avaliacaoAtendimento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AvaliacaoAtendimentoUpdateComponent,
    resolve: {
      avaliacaoAtendimento: AvaliacaoAtendimentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.avaliacaoAtendimento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AvaliacaoAtendimentoUpdateComponent,
    resolve: {
      avaliacaoAtendimento: AvaliacaoAtendimentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.avaliacaoAtendimento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
