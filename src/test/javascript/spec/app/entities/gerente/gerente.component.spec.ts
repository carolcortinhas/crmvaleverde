import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { GerenteComponent } from 'app/entities/gerente/gerente.component';
import { GerenteService } from 'app/entities/gerente/gerente.service';
import { Gerente } from 'app/shared/model/gerente.model';

describe('Component Tests', () => {
  describe('Gerente Management Component', () => {
    let comp: GerenteComponent;
    let fixture: ComponentFixture<GerenteComponent>;
    let service: GerenteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [GerenteComponent],
      })
        .overrideTemplate(GerenteComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GerenteComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GerenteService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Gerente(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.gerentes && comp.gerentes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
