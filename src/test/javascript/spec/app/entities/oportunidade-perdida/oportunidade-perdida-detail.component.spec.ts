import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { OportunidadePerdidaDetailComponent } from 'app/entities/oportunidade-perdida/oportunidade-perdida-detail.component';
import { OportunidadePerdida } from 'app/shared/model/oportunidade-perdida.model';

describe('Component Tests', () => {
  describe('OportunidadePerdida Management Detail Component', () => {
    let comp: OportunidadePerdidaDetailComponent;
    let fixture: ComponentFixture<OportunidadePerdidaDetailComponent>;
    const route = ({ data: of({ oportunidadePerdida: new OportunidadePerdida(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [OportunidadePerdidaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(OportunidadePerdidaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OportunidadePerdidaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load oportunidadePerdida on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.oportunidadePerdida).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
