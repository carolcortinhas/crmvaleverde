import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { ContatoDetailComponent } from 'app/entities/contato/contato-detail.component';
import { Contato } from 'app/shared/model/contato.model';

describe('Component Tests', () => {
  describe('Contato Management Detail Component', () => {
    let comp: ContatoDetailComponent;
    let fixture: ComponentFixture<ContatoDetailComponent>;
    const route = ({ data: of({ contato: new Contato(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [ContatoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ContatoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ContatoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load contato on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.contato).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
