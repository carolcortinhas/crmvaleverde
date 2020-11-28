import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { ClientePessoaFisicaComponent } from 'app/entities/cliente-pessoa-fisica/cliente-pessoa-fisica.component';
import { ClientePessoaFisicaService } from 'app/entities/cliente-pessoa-fisica/cliente-pessoa-fisica.service';
import { ClientePessoaFisica } from 'app/shared/model/cliente-pessoa-fisica.model';

describe('Component Tests', () => {
  describe('ClientePessoaFisica Management Component', () => {
    let comp: ClientePessoaFisicaComponent;
    let fixture: ComponentFixture<ClientePessoaFisicaComponent>;
    let service: ClientePessoaFisicaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [ClientePessoaFisicaComponent],
      })
        .overrideTemplate(ClientePessoaFisicaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ClientePessoaFisicaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ClientePessoaFisicaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ClientePessoaFisica(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.clientePessoaFisicas && comp.clientePessoaFisicas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
