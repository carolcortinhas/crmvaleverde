import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { RepresentantePJDetailComponent } from 'app/entities/representante-pj/representante-pj-detail.component';
import { RepresentantePJ } from 'app/shared/model/representante-pj.model';

describe('Component Tests', () => {
  describe('RepresentantePJ Management Detail Component', () => {
    let comp: RepresentantePJDetailComponent;
    let fixture: ComponentFixture<RepresentantePJDetailComponent>;
    const route = ({ data: of({ representantePJ: new RepresentantePJ(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [RepresentantePJDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(RepresentantePJDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RepresentantePJDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load representantePJ on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.representantePJ).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
