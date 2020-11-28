import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { ClientePessoaFisicaDetailComponent } from 'app/entities/cliente-pessoa-fisica/cliente-pessoa-fisica-detail.component';
import { ClientePessoaFisica } from 'app/shared/model/cliente-pessoa-fisica.model';

describe('Component Tests', () => {
  describe('ClientePessoaFisica Management Detail Component', () => {
    let comp: ClientePessoaFisicaDetailComponent;
    let fixture: ComponentFixture<ClientePessoaFisicaDetailComponent>;
    const route = ({ data: of({ clientePessoaFisica: new ClientePessoaFisica(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [ClientePessoaFisicaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ClientePessoaFisicaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ClientePessoaFisicaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load clientePessoaFisica on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.clientePessoaFisica).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
