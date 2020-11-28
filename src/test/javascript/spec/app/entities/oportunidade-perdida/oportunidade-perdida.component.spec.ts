import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { OportunidadePerdidaComponent } from 'app/entities/oportunidade-perdida/oportunidade-perdida.component';
import { OportunidadePerdidaService } from 'app/entities/oportunidade-perdida/oportunidade-perdida.service';
import { OportunidadePerdida } from 'app/shared/model/oportunidade-perdida.model';

describe('Component Tests', () => {
  describe('OportunidadePerdida Management Component', () => {
    let comp: OportunidadePerdidaComponent;
    let fixture: ComponentFixture<OportunidadePerdidaComponent>;
    let service: OportunidadePerdidaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [OportunidadePerdidaComponent],
      })
        .overrideTemplate(OportunidadePerdidaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OportunidadePerdidaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OportunidadePerdidaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new OportunidadePerdida(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.oportunidadePerdidas && comp.oportunidadePerdidas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
