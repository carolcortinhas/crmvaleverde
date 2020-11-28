import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { ClientePessoaFisicaDeleteDialogComponent } from 'app/entities/cliente-pessoa-fisica/cliente-pessoa-fisica-delete-dialog.component';
import { ClientePessoaFisicaService } from 'app/entities/cliente-pessoa-fisica/cliente-pessoa-fisica.service';

describe('Component Tests', () => {
  describe('ClientePessoaFisica Management Delete Component', () => {
    let comp: ClientePessoaFisicaDeleteDialogComponent;
    let fixture: ComponentFixture<ClientePessoaFisicaDeleteDialogComponent>;
    let service: ClientePessoaFisicaService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [ClientePessoaFisicaDeleteDialogComponent],
      })
        .overrideTemplate(ClientePessoaFisicaDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ClientePessoaFisicaDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ClientePessoaFisicaService);
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
