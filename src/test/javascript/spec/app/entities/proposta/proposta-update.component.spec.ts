import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { PropostaUpdateComponent } from 'app/entities/proposta/proposta-update.component';
import { PropostaService } from 'app/entities/proposta/proposta.service';
import { Proposta } from 'app/shared/model/proposta.model';

describe('Component Tests', () => {
  describe('Proposta Management Update Component', () => {
    let comp: PropostaUpdateComponent;
    let fixture: ComponentFixture<PropostaUpdateComponent>;
    let service: PropostaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [PropostaUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(PropostaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PropostaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PropostaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Proposta(123);
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
        const entity = new Proposta();
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
