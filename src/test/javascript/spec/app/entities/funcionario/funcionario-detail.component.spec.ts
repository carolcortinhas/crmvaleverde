import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { FuncionarioDetailComponent } from 'app/entities/funcionario/funcionario-detail.component';
import { Funcionario } from 'app/shared/model/funcionario.model';

describe('Component Tests', () => {
  describe('Funcionario Management Detail Component', () => {
    let comp: FuncionarioDetailComponent;
    let fixture: ComponentFixture<FuncionarioDetailComponent>;
    const route = ({ data: of({ funcionario: new Funcionario(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [FuncionarioDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(FuncionarioDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FuncionarioDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load funcionario on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.funcionario).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
