import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { TelefoneComponent } from 'app/entities/telefone/telefone.component';
import { TelefoneService } from 'app/entities/telefone/telefone.service';
import { Telefone } from 'app/shared/model/telefone.model';

describe('Component Tests', () => {
  describe('Telefone Management Component', () => {
    let comp: TelefoneComponent;
    let fixture: ComponentFixture<TelefoneComponent>;
    let service: TelefoneService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [TelefoneComponent],
      })
        .overrideTemplate(TelefoneComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TelefoneComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TelefoneService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Telefone(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.telefones && comp.telefones[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
