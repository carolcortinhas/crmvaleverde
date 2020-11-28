import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { AdministradorUpdateComponent } from 'app/entities/administrador/administrador-update.component';
import { AdministradorService } from 'app/entities/administrador/administrador.service';
import { Administrador } from 'app/shared/model/administrador.model';

describe('Component Tests', () => {
  describe('Administrador Management Update Component', () => {
    let comp: AdministradorUpdateComponent;
    let fixture: ComponentFixture<AdministradorUpdateComponent>;
    let service: AdministradorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [AdministradorUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(AdministradorUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AdministradorUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AdministradorService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Administrador(123);
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
        const entity = new Administrador();
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
