import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { DocumentoDetailComponent } from 'app/entities/documento/documento-detail.component';
import { Documento } from 'app/shared/model/documento.model';

describe('Component Tests', () => {
  describe('Documento Management Detail Component', () => {
    let comp: DocumentoDetailComponent;
    let fixture: ComponentFixture<DocumentoDetailComponent>;
    const route = ({ data: of({ documento: new Documento(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [DocumentoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DocumentoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DocumentoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load documento on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.documento).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
