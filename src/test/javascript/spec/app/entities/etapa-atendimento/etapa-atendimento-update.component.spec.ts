import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { EtapaAtendimentoUpdateComponent } from 'app/entities/etapa-atendimento/etapa-atendimento-update.component';
import { EtapaAtendimentoService } from 'app/entities/etapa-atendimento/etapa-atendimento.service';
import { EtapaAtendimento } from 'app/shared/model/etapa-atendimento.model';

describe('Component Tests', () => {
  describe('EtapaAtendimento Management Update Component', () => {
    let comp: EtapaAtendimentoUpdateComponent;
    let fixture: ComponentFixture<EtapaAtendimentoUpdateComponent>;
    let service: EtapaAtendimentoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [EtapaAtendimentoUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(EtapaAtendimentoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EtapaAtendimentoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EtapaAtendimentoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EtapaAtendimento(123);
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
        const entity = new EtapaAtendimento();
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
