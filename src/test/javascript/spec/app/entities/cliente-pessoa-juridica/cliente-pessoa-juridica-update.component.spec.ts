import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { ClientePessoaJuridicaUpdateComponent } from 'app/entities/cliente-pessoa-juridica/cliente-pessoa-juridica-update.component';
import { ClientePessoaJuridicaService } from 'app/entities/cliente-pessoa-juridica/cliente-pessoa-juridica.service';
import { ClientePessoaJuridica } from 'app/shared/model/cliente-pessoa-juridica.model';

describe('Component Tests', () => {
  describe('ClientePessoaJuridica Management Update Component', () => {
    let comp: ClientePessoaJuridicaUpdateComponent;
    let fixture: ComponentFixture<ClientePessoaJuridicaUpdateComponent>;
    let service: ClientePessoaJuridicaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [ClientePessoaJuridicaUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ClientePessoaJuridicaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ClientePessoaJuridicaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ClientePessoaJuridicaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ClientePessoaJuridica(123);
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
        const entity = new ClientePessoaJuridica();
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
