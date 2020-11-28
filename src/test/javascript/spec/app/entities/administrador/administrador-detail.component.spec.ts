import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { AdministradorDetailComponent } from 'app/entities/administrador/administrador-detail.component';
import { Administrador } from 'app/shared/model/administrador.model';

describe('Component Tests', () => {
  describe('Administrador Management Detail Component', () => {
    let comp: AdministradorDetailComponent;
    let fixture: ComponentFixture<AdministradorDetailComponent>;
    const route = ({ data: of({ administrador: new Administrador(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [AdministradorDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AdministradorDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AdministradorDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load administrador on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.administrador).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
