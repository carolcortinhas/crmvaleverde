import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { AvaliacaoAtendimentoDetailComponent } from 'app/entities/avaliacao-atendimento/avaliacao-atendimento-detail.component';
import { AvaliacaoAtendimento } from 'app/shared/model/avaliacao-atendimento.model';

describe('Component Tests', () => {
  describe('AvaliacaoAtendimento Management Detail Component', () => {
    let comp: AvaliacaoAtendimentoDetailComponent;
    let fixture: ComponentFixture<AvaliacaoAtendimentoDetailComponent>;
    const route = ({ data: of({ avaliacaoAtendimento: new AvaliacaoAtendimento(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [AvaliacaoAtendimentoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AvaliacaoAtendimentoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AvaliacaoAtendimentoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load avaliacaoAtendimento on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.avaliacaoAtendimento).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
