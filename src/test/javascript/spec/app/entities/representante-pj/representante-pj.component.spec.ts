import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { RepresentantePJComponent } from 'app/entities/representante-pj/representante-pj.component';
import { RepresentantePJService } from 'app/entities/representante-pj/representante-pj.service';
import { RepresentantePJ } from 'app/shared/model/representante-pj.model';

describe('Component Tests', () => {
  describe('RepresentantePJ Management Component', () => {
    let comp: RepresentantePJComponent;
    let fixture: ComponentFixture<RepresentantePJComponent>;
    let service: RepresentantePJService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [RepresentantePJComponent],
      })
        .overrideTemplate(RepresentantePJComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RepresentantePJComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RepresentantePJService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RepresentantePJ(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.representantePJS && comp.representantePJS[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
