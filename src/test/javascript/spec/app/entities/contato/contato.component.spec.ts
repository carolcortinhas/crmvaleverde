import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { ContatoComponent } from 'app/entities/contato/contato.component';
import { ContatoService } from 'app/entities/contato/contato.service';
import { Contato } from 'app/shared/model/contato.model';

describe('Component Tests', () => {
  describe('Contato Management Component', () => {
    let comp: ContatoComponent;
    let fixture: ComponentFixture<ContatoComponent>;
    let service: ContatoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [ContatoComponent],
      })
        .overrideTemplate(ContatoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ContatoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContatoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Contato(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.contatoes && comp.contatoes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
