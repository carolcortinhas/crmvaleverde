import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDocumento, Documento } from 'app/shared/model/documento.model';
import { DocumentoService } from './documento.service';
import { DocumentoComponent } from './documento.component';
import { DocumentoDetailComponent } from './documento-detail.component';
import { DocumentoUpdateComponent } from './documento-update.component';

@Injectable({ providedIn: 'root' })
export class DocumentoResolve implements Resolve<IDocumento> {
  constructor(private service: DocumentoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDocumento> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((documento: HttpResponse<Documento>) => {
          if (documento.body) {
            return of(documento.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Documento());
  }
}

export const documentoRoute: Routes = [
  {
    path: '',
    component: DocumentoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.documento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DocumentoDetailComponent,
    resolve: {
      documento: DocumentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.documento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DocumentoUpdateComponent,
    resolve: {
      documento: DocumentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.documento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DocumentoUpdateComponent,
    resolve: {
      documento: DocumentoResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'crmvaleverdeApp.documento.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
