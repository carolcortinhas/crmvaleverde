import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { AvaliacaoAtendimentoDeleteDialogComponent } from 'app/entities/avaliacao-atendimento/avaliacao-atendimento-delete-dialog.component';
import { AvaliacaoAtendimentoService } from 'app/entities/avaliacao-atendimento/avaliacao-atendimento.service';

describe('Component Tests', () => {
  describe('AvaliacaoAtendimento Management Delete Component', () => {
    let comp: AvaliacaoAtendimentoDeleteDialogComponent;
    let fixture: ComponentFixture<AvaliacaoAtendimentoDeleteDialogComponent>;
    let service: AvaliacaoAtendimentoService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [AvaliacaoAtendimentoDeleteDialogComponent],
      })
        .overrideTemplate(AvaliacaoAtendimentoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AvaliacaoAtendimentoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AvaliacaoAtendimentoService);
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
