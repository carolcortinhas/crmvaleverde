import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { EtapaAtendimentoComponent } from 'app/entities/etapa-atendimento/etapa-atendimento.component';
import { EtapaAtendimentoService } from 'app/entities/etapa-atendimento/etapa-atendimento.service';
import { EtapaAtendimento } from 'app/shared/model/etapa-atendimento.model';

describe('Component Tests', () => {
  describe('EtapaAtendimento Management Component', () => {
    let comp: EtapaAtendimentoComponent;
    let fixture: ComponentFixture<EtapaAtendimentoComponent>;
    let service: EtapaAtendimentoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [EtapaAtendimentoComponent],
      })
        .overrideTemplate(EtapaAtendimentoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EtapaAtendimentoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EtapaAtendimentoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new EtapaAtendimento(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.etapaAtendimentos && comp.etapaAtendimentos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
