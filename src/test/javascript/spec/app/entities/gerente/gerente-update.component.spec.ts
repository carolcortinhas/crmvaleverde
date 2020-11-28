import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { GerenteUpdateComponent } from 'app/entities/gerente/gerente-update.component';
import { GerenteService } from 'app/entities/gerente/gerente.service';
import { Gerente } from 'app/shared/model/gerente.model';

describe('Component Tests', () => {
  describe('Gerente Management Update Component', () => {
    let comp: GerenteUpdateComponent;
    let fixture: ComponentFixture<GerenteUpdateComponent>;
    let service: GerenteService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [GerenteUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(GerenteUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GerenteUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GerenteService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Gerente(123);
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
        const entity = new Gerente();
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
