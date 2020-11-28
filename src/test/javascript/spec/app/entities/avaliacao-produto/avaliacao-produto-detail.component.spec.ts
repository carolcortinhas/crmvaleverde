import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { AvaliacaoProdutoDetailComponent } from 'app/entities/avaliacao-produto/avaliacao-produto-detail.component';
import { AvaliacaoProduto } from 'app/shared/model/avaliacao-produto.model';

describe('Component Tests', () => {
  describe('AvaliacaoProduto Management Detail Component', () => {
    let comp: AvaliacaoProdutoDetailComponent;
    let fixture: ComponentFixture<AvaliacaoProdutoDetailComponent>;
    const route = ({ data: of({ avaliacaoProduto: new AvaliacaoProduto(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [AvaliacaoProdutoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AvaliacaoProdutoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AvaliacaoProdutoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load avaliacaoProduto on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.avaliacaoProduto).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
