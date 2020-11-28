import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { AvaliacaoProdutoComponent } from 'app/entities/avaliacao-produto/avaliacao-produto.component';
import { AvaliacaoProdutoService } from 'app/entities/avaliacao-produto/avaliacao-produto.service';
import { AvaliacaoProduto } from 'app/shared/model/avaliacao-produto.model';

describe('Component Tests', () => {
  describe('AvaliacaoProduto Management Component', () => {
    let comp: AvaliacaoProdutoComponent;
    let fixture: ComponentFixture<AvaliacaoProdutoComponent>;
    let service: AvaliacaoProdutoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [AvaliacaoProdutoComponent],
      })
        .overrideTemplate(AvaliacaoProdutoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AvaliacaoProdutoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AvaliacaoProdutoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AvaliacaoProduto(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.avaliacaoProdutos && comp.avaliacaoProdutos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
