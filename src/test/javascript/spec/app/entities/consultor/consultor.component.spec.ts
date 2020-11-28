import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { ConsultorComponent } from 'app/entities/consultor/consultor.component';
import { ConsultorService } from 'app/entities/consultor/consultor.service';
import { Consultor } from 'app/shared/model/consultor.model';

describe('Component Tests', () => {
  describe('Consultor Management Component', () => {
    let comp: ConsultorComponent;
    let fixture: ComponentFixture<ConsultorComponent>;
    let service: ConsultorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [ConsultorComponent],
      })
        .overrideTemplate(ConsultorComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ConsultorComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ConsultorService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Consultor(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.consultors && comp.consultors[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
