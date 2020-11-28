import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { ProdutoVendaComponent } from 'app/entities/produto-venda/produto-venda.component';
import { ProdutoVendaService } from 'app/entities/produto-venda/produto-venda.service';
import { ProdutoVenda } from 'app/shared/model/produto-venda.model';

describe('Component Tests', () => {
  describe('ProdutoVenda Management Component', () => {
    let comp: ProdutoVendaComponent;
    let fixture: ComponentFixture<ProdutoVendaComponent>;
    let service: ProdutoVendaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [ProdutoVendaComponent],
      })
        .overrideTemplate(ProdutoVendaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProdutoVendaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProdutoVendaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProdutoVenda(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.produtoVendas && comp.produtoVendas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
