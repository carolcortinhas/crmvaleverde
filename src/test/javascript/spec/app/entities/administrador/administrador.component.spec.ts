import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { AdministradorComponent } from 'app/entities/administrador/administrador.component';
import { AdministradorService } from 'app/entities/administrador/administrador.service';
import { Administrador } from 'app/shared/model/administrador.model';

describe('Component Tests', () => {
  describe('Administrador Management Component', () => {
    let comp: AdministradorComponent;
    let fixture: ComponentFixture<AdministradorComponent>;
    let service: AdministradorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [AdministradorComponent],
      })
        .overrideTemplate(AdministradorComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AdministradorComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AdministradorService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Administrador(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.administradors && comp.administradors[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
