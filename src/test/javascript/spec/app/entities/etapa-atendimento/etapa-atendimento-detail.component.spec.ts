import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { EtapaAtendimentoDetailComponent } from 'app/entities/etapa-atendimento/etapa-atendimento-detail.component';
import { EtapaAtendimento } from 'app/shared/model/etapa-atendimento.model';

describe('Component Tests', () => {
  describe('EtapaAtendimento Management Detail Component', () => {
    let comp: EtapaAtendimentoDetailComponent;
    let fixture: ComponentFixture<EtapaAtendimentoDetailComponent>;
    const route = ({ data: of({ etapaAtendimento: new EtapaAtendimento(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [EtapaAtendimentoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(EtapaAtendimentoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EtapaAtendimentoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load etapaAtendimento on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.etapaAtendimento).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
