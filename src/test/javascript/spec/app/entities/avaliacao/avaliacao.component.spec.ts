import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { AvaliacaoComponent } from 'app/entities/avaliacao/avaliacao.component';
import { AvaliacaoService } from 'app/entities/avaliacao/avaliacao.service';
import { Avaliacao } from 'app/shared/model/avaliacao.model';

describe('Component Tests', () => {
  describe('Avaliacao Management Component', () => {
    let comp: AvaliacaoComponent;
    let fixture: ComponentFixture<AvaliacaoComponent>;
    let service: AvaliacaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [AvaliacaoComponent],
      })
        .overrideTemplate(AvaliacaoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AvaliacaoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AvaliacaoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Avaliacao(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.avaliacaos && comp.avaliacaos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
