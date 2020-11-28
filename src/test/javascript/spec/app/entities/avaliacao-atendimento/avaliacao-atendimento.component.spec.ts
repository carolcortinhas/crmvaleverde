import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { AvaliacaoAtendimentoComponent } from 'app/entities/avaliacao-atendimento/avaliacao-atendimento.component';
import { AvaliacaoAtendimentoService } from 'app/entities/avaliacao-atendimento/avaliacao-atendimento.service';
import { AvaliacaoAtendimento } from 'app/shared/model/avaliacao-atendimento.model';

describe('Component Tests', () => {
  describe('AvaliacaoAtendimento Management Component', () => {
    let comp: AvaliacaoAtendimentoComponent;
    let fixture: ComponentFixture<AvaliacaoAtendimentoComponent>;
    let service: AvaliacaoAtendimentoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [AvaliacaoAtendimentoComponent],
      })
        .overrideTemplate(AvaliacaoAtendimentoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AvaliacaoAtendimentoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AvaliacaoAtendimentoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AvaliacaoAtendimento(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.avaliacaoAtendimentos && comp.avaliacaoAtendimentos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
