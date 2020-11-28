import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { AtendimentoComponent } from 'app/entities/atendimento/atendimento.component';
import { AtendimentoService } from 'app/entities/atendimento/atendimento.service';
import { Atendimento } from 'app/shared/model/atendimento.model';

describe('Component Tests', () => {
  describe('Atendimento Management Component', () => {
    let comp: AtendimentoComponent;
    let fixture: ComponentFixture<AtendimentoComponent>;
    let service: AtendimentoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [AtendimentoComponent],
      })
        .overrideTemplate(AtendimentoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AtendimentoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AtendimentoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Atendimento(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.atendimentos && comp.atendimentos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
