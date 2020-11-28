import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IOportunidade, Oportunidade } from 'app/shared/model/oportunidade.model';
import { OportunidadeService } from './oportunidade.service';
import { IOportunidadePerdida } from 'app/shared/model/oportunidade-perdida.model';
import { OportunidadePerdidaService } from 'app/entities/oportunidade-perdida/oportunidade-perdida.service';
import { IAtendimento } from 'app/shared/model/atendimento.model';
import { AtendimentoService } from 'app/entities/atendimento/atendimento.service';

type SelectableEntity = IOportunidadePerdida | IAtendimento;

@Component({
  selector: 'jhi-oportunidade-update',
  templateUrl: './oportunidade-update.component.html',
})
export class OportunidadeUpdateComponent implements OnInit {
  isSaving = false;
  oportunidadeperdidas: IOportunidadePerdida[] = [];
  atendimentos: IAtendimento[] = [];
  dataDp: any;

  editForm = this.fb.group({
    id: [],
    nomeCliente: [],
    descricao: [],
    data: [],
    oportunidadePerdida: [],
    atendimentosOportunidades: [],
  });

  constructor(
    protected oportunidadeService: OportunidadeService,
    protected oportunidadePerdidaService: OportunidadePerdidaService,
    protected atendimentoService: AtendimentoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ oportunidade }) => {
      this.updateForm(oportunidade);

      this.oportunidadePerdidaService
        .query({ filter: 'vendanaoefetuada-is-null' })
        .pipe(
          map((res: HttpResponse<IOportunidadePerdida[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IOportunidadePerdida[]) => {
          if (!oportunidade.oportunidadePerdida || !oportunidade.oportunidadePerdida.id) {
            this.oportunidadeperdidas = resBody;
          } else {
            this.oportunidadePerdidaService
              .find(oportunidade.oportunidadePerdida.id)
              .pipe(
                map((subRes: HttpResponse<IOportunidadePerdida>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IOportunidadePerdida[]) => (this.oportunidadeperdidas = concatRes));
          }
        });

      this.atendimentoService.query().subscribe((res: HttpResponse<IAtendimento[]>) => (this.atendimentos = res.body || []));
    });
  }

  updateForm(oportunidade: IOportunidade): void {
    this.editForm.patchValue({
      id: oportunidade.id,
      nomeCliente: oportunidade.nomeCliente,
      descricao: oportunidade.descricao,
      data: oportunidade.data,
      oportunidadePerdida: oportunidade.oportunidadePerdida,
      atendimentosOportunidades: oportunidade.atendimentosOportunidades,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const oportunidade = this.createFromForm();
    if (oportunidade.id !== undefined) {
      this.subscribeToSaveResponse(this.oportunidadeService.update(oportunidade));
    } else {
      this.subscribeToSaveResponse(this.oportunidadeService.create(oportunidade));
    }
  }

  private createFromForm(): IOportunidade {
    return {
      ...new Oportunidade(),
      id: this.editForm.get(['id'])!.value,
      nomeCliente: this.editForm.get(['nomeCliente'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      data: this.editForm.get(['data'])!.value,
      oportunidadePerdida: this.editForm.get(['oportunidadePerdida'])!.value,
      atendimentosOportunidades: this.editForm.get(['atendimentosOportunidades'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOportunidade>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
