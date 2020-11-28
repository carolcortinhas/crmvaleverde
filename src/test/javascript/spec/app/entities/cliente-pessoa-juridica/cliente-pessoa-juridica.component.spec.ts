import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { ClientePessoaJuridicaComponent } from 'app/entities/cliente-pessoa-juridica/cliente-pessoa-juridica.component';
import { ClientePessoaJuridicaService } from 'app/entities/cliente-pessoa-juridica/cliente-pessoa-juridica.service';
import { ClientePessoaJuridica } from 'app/shared/model/cliente-pessoa-juridica.model';

describe('Component Tests', () => {
  describe('ClientePessoaJuridica Management Component', () => {
    let comp: ClientePessoaJuridicaComponent;
    let fixture: ComponentFixture<ClientePessoaJuridicaComponent>;
    let service: ClientePessoaJuridicaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [ClientePessoaJuridicaComponent],
      })
        .overrideTemplate(ClientePessoaJuridicaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ClientePessoaJuridicaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ClientePessoaJuridicaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ClientePessoaJuridica(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.clientePessoaJuridicas && comp.clientePessoaJuridicas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
