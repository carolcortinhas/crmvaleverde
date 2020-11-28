import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { OportunidadeUpdateComponent } from 'app/entities/oportunidade/oportunidade-update.component';
import { OportunidadeService } from 'app/entities/oportunidade/oportunidade.service';
import { Oportunidade } from 'app/shared/model/oportunidade.model';

describe('Component Tests', () => {
  describe('Oportunidade Management Update Component', () => {
    let comp: OportunidadeUpdateComponent;
    let fixture: ComponentFixture<OportunidadeUpdateComponent>;
    let service: OportunidadeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [OportunidadeUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(OportunidadeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OportunidadeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OportunidadeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Oportunidade(123);
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
        const entity = new Oportunidade();
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
