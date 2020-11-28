import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { ConsultorUpdateComponent } from 'app/entities/consultor/consultor-update.component';
import { ConsultorService } from 'app/entities/consultor/consultor.service';
import { Consultor } from 'app/shared/model/consultor.model';

describe('Component Tests', () => {
  describe('Consultor Management Update Component', () => {
    let comp: ConsultorUpdateComponent;
    let fixture: ComponentFixture<ConsultorUpdateComponent>;
    let service: ConsultorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [ConsultorUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(ConsultorUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ConsultorUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ConsultorService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Consultor(123);
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
        const entity = new Consultor();
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
