import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { ConsultorDetailComponent } from 'app/entities/consultor/consultor-detail.component';
import { Consultor } from 'app/shared/model/consultor.model';

describe('Component Tests', () => {
  describe('Consultor Management Detail Component', () => {
    let comp: ConsultorDetailComponent;
    let fixture: ComponentFixture<ConsultorDetailComponent>;
    const route = ({ data: of({ consultor: new Consultor(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [ConsultorDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ConsultorDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ConsultorDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load consultor on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.consultor).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
