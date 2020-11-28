import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { OportunidadeDetailComponent } from 'app/entities/oportunidade/oportunidade-detail.component';
import { Oportunidade } from 'app/shared/model/oportunidade.model';

describe('Component Tests', () => {
  describe('Oportunidade Management Detail Component', () => {
    let comp: OportunidadeDetailComponent;
    let fixture: ComponentFixture<OportunidadeDetailComponent>;
    const route = ({ data: of({ oportunidade: new Oportunidade(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [OportunidadeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(OportunidadeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OportunidadeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load oportunidade on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.oportunidade).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
