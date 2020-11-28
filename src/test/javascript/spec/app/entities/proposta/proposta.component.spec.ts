import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { PropostaComponent } from 'app/entities/proposta/proposta.component';
import { PropostaService } from 'app/entities/proposta/proposta.service';
import { Proposta } from 'app/shared/model/proposta.model';

describe('Component Tests', () => {
  describe('Proposta Management Component', () => {
    let comp: PropostaComponent;
    let fixture: ComponentFixture<PropostaComponent>;
    let service: PropostaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [PropostaComponent],
      })
        .overrideTemplate(PropostaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PropostaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PropostaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Proposta(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.propostas && comp.propostas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
