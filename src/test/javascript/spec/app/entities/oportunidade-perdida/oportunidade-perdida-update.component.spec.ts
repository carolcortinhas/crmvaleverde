import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { OportunidadePerdidaUpdateComponent } from 'app/entities/oportunidade-perdida/oportunidade-perdida-update.component';
import { OportunidadePerdidaService } from 'app/entities/oportunidade-perdida/oportunidade-perdida.service';
import { OportunidadePerdida } from 'app/shared/model/oportunidade-perdida.model';

describe('Component Tests', () => {
  describe('OportunidadePerdida Management Update Component', () => {
    let comp: OportunidadePerdidaUpdateComponent;
    let fixture: ComponentFixture<OportunidadePerdidaUpdateComponent>;
    let service: OportunidadePerdidaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [OportunidadePerdidaUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(OportunidadePerdidaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OportunidadePerdidaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OportunidadePerdidaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new OportunidadePerdida(123);
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
        const entity = new OportunidadePerdida();
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
