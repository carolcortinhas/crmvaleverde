import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { GerenteDetailComponent } from 'app/entities/gerente/gerente-detail.component';
import { Gerente } from 'app/shared/model/gerente.model';

describe('Component Tests', () => {
  describe('Gerente Management Detail Component', () => {
    let comp: GerenteDetailComponent;
    let fixture: ComponentFixture<GerenteDetailComponent>;
    const route = ({ data: of({ gerente: new Gerente(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [GerenteDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(GerenteDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GerenteDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load gerente on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.gerente).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
