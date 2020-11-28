import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { ClientePessoaJuridicaDetailComponent } from 'app/entities/cliente-pessoa-juridica/cliente-pessoa-juridica-detail.component';
import { ClientePessoaJuridica } from 'app/shared/model/cliente-pessoa-juridica.model';

describe('Component Tests', () => {
  describe('ClientePessoaJuridica Management Detail Component', () => {
    let comp: ClientePessoaJuridicaDetailComponent;
    let fixture: ComponentFixture<ClientePessoaJuridicaDetailComponent>;
    const route = ({ data: of({ clientePessoaJuridica: new ClientePessoaJuridica(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [ClientePessoaJuridicaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ClientePessoaJuridicaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ClientePessoaJuridicaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load clientePessoaJuridica on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.clientePessoaJuridica).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
