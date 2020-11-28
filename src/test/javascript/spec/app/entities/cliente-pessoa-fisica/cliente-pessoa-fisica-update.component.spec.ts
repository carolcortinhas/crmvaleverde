import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { ClientePessoaFisicaUpdateComponent } from 'app/entities/cliente-pessoa-fisica/cliente-pessoa-fisica-update.component';
import { ClientePessoaFisicaService } from 'app/entities/cliente-pessoa-fisica/cliente-pessoa-fisica.service';
import { ClientePessoaFisica } from 'app/shared/model/cliente-pessoa-fisica.model';

describe('Component Tests', () => {
  describe('ClientePessoaFisica Management Update Component', () => {
    let comp: ClientePessoaFisicaUpdateComponent;
    let fixture: ComponentFixture<ClientePessoaFisicaUpdateComponent>;
    let service: ClientePessoaFisicaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [ClientePessoaFisicaUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ClientePessoaFisicaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ClientePessoaFisicaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ClientePessoaFisicaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ClientePessoaFisica(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ClientePessoaFisica();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
