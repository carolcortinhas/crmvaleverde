import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { AvaliacaoAtendimentoUpdateComponent } from 'app/entities/avaliacao-atendimento/avaliacao-atendimento-update.component';
import { AvaliacaoAtendimentoService } from 'app/entities/avaliacao-atendimento/avaliacao-atendimento.service';
import { AvaliacaoAtendimento } from 'app/shared/model/avaliacao-atendimento.model';

describe('Component Tests', () => {
  describe('AvaliacaoAtendimento Management Update Component', () => {
    let comp: AvaliacaoAtendimentoUpdateComponent;
    let fixture: ComponentFixture<AvaliacaoAtendimentoUpdateComponent>;
    let service: AvaliacaoAtendimentoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [AvaliacaoAtendimentoUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(AvaliacaoAtendimentoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AvaliacaoAtendimentoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AvaliacaoAtendimentoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AvaliacaoAtendimento(123);
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
        const entity = new AvaliacaoAtendimento();
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
