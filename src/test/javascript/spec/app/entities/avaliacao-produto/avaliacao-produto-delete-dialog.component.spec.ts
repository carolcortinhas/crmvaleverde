import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { AvaliacaoProdutoDeleteDialogComponent } from 'app/entities/avaliacao-produto/avaliacao-produto-delete-dialog.component';
import { AvaliacaoProdutoService } from 'app/entities/avaliacao-produto/avaliacao-produto.service';

describe('Component Tests', () => {
  describe('AvaliacaoProduto Management Delete Component', () => {
    let comp: AvaliacaoProdutoDeleteDialogComponent;
    let fixture: ComponentFixture<AvaliacaoProdutoDeleteDialogComponent>;
    let service: AvaliacaoProdutoService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [AvaliacaoProdutoDeleteDialogComponent],
      })
        .overrideTemplate(AvaliacaoProdutoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AvaliacaoProdutoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AvaliacaoProdutoService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
