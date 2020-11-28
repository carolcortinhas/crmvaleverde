import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { ClientePessoaJuridicaDeleteDialogComponent } from 'app/entities/cliente-pessoa-juridica/cliente-pessoa-juridica-delete-dialog.component';
import { ClientePessoaJuridicaService } from 'app/entities/cliente-pessoa-juridica/cliente-pessoa-juridica.service';

describe('Component Tests', () => {
  describe('ClientePessoaJuridica Management Delete Component', () => {
    let comp: ClientePessoaJuridicaDeleteDialogComponent;
    let fixture: ComponentFixture<ClientePessoaJuridicaDeleteDialogComponent>;
    let service: ClientePessoaJuridicaService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [ClientePessoaJuridicaDeleteDialogComponent],
      })
        .overrideTemplate(ClientePessoaJuridicaDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ClientePessoaJuridicaDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ClientePessoaJuridicaService);
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
