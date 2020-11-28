import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { OportunidadeComponent } from 'app/entities/oportunidade/oportunidade.component';
import { OportunidadeService } from 'app/entities/oportunidade/oportunidade.service';
import { Oportunidade } from 'app/shared/model/oportunidade.model';

describe('Component Tests', () => {
  describe('Oportunidade Management Component', () => {
    let comp: OportunidadeComponent;
    let fixture: ComponentFixture<OportunidadeComponent>;
    let service: OportunidadeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [OportunidadeComponent],
      })
        .overrideTemplate(OportunidadeComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OportunidadeComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OportunidadeService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Oportunidade(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.oportunidades && comp.oportunidades[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
