import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { PropostaDetailComponent } from 'app/entities/proposta/proposta-detail.component';
import { Proposta } from 'app/shared/model/proposta.model';

describe('Component Tests', () => {
  describe('Proposta Management Detail Component', () => {
    let comp: PropostaDetailComponent;
    let fixture: ComponentFixture<PropostaDetailComponent>;
    const route = ({ data: of({ proposta: new Proposta(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [PropostaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PropostaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PropostaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load proposta on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.proposta).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
