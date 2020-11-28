import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { CrmvaleverdeTestModule } from '../../../test.module';
import { RepresentantePJUpdateComponent } from 'app/entities/representante-pj/representante-pj-update.component';
import { RepresentantePJService } from 'app/entities/representante-pj/representante-pj.service';
import { RepresentantePJ } from 'app/shared/model/representante-pj.model';

describe('Component Tests', () => {
  describe('RepresentantePJ Management Update Component', () => {
    let comp: RepresentantePJUpdateComponent;
    let fixture: ComponentFixture<RepresentantePJUpdateComponent>;
    let service: RepresentantePJService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CrmvaleverdeTestModule],
        declarations: [RepresentantePJUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(RepresentantePJUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RepresentantePJUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RepresentantePJService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RepresentantePJ(123);
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
        const entity = new RepresentantePJ();
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
