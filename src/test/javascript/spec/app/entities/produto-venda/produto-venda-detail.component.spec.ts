import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { ProdutoVendaDetailComponent } from 'app/entities/produto-venda/produto-venda-detail.component';
import { ProdutoVenda } from 'app/shared/model/produto-venda.model';

describe('Component Tests', () => {
  describe('ProdutoVenda Management Detail Component', () => {
    let comp: ProdutoVendaDetailComponent;
    let fixture: ComponentFixture<ProdutoVendaDetailComponent>;
    const route = ({ data: of({ produtoVenda: new ProdutoVenda(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [ProdutoVendaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ProdutoVendaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProdutoVendaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load produtoVenda on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.produtoVenda).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
