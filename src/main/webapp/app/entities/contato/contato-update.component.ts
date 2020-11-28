import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IContato, Contato } from 'app/shared/model/contato.model';
import { ContatoService } from './contato.service';
import { ITelefone } from 'app/shared/model/telefone.model';
import { TelefoneService } from 'app/entities/telefone/telefone.service';
import { IEmail } from 'app/shared/model/email.model';
import { EmailService } from 'app/entities/email/email.service';
import { IEndereco } from 'app/shared/model/endereco.model';
import { EnderecoService } from 'app/entities/endereco/endereco.service';

type SelectableEntity = ITelefone | IEmail | IEndereco;

@Component({
  selector: 'jhi-contato-update',
  templateUrl: './contato-update.component.html',
})
export class ContatoUpdateComponent implements OnInit {
  isSaving = false;
  telefones: ITelefone[] = [];
  emails: IEmail[] = [];
  enderecos: IEndereco[] = [];

  editForm = this.fb.group({
    id: [],
    telefone: [],
    email: [],
    endereco: [],
  });

  constructor(
    protected contatoService: ContatoService,
    protected telefoneService: TelefoneService,
    protected emailService: EmailService,
    protected enderecoService: EnderecoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ contato }) => {
      this.updateForm(contato);

      this.telefoneService
        .query({ filter: 'contato-is-null' })
        .pipe(
          map((res: HttpResponse<ITelefone[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ITelefone[]) => {
          if (!contato.telefone || !contato.telefone.id) {
            this.telefones = resBody;
          } else {
            this.telefoneService
              .find(contato.telefone.id)
              .pipe(
                map((subRes: HttpResponse<ITelefone>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ITelefone[]) => (this.telefones = concatRes));
          }
        });

      this.emailService
        .query({ filter: 'contato-is-null' })
        .pipe(
          map((res: HttpResponse<IEmail[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IEmail[]) => {
          if (!contato.email || !contato.email.id) {
            this.emails = resBody;
          } else {
            this.emailService
              .find(contato.email.id)
              .pipe(
                map((subRes: HttpResponse<IEmail>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IEmail[]) => (this.emails = concatRes));
          }
        });

      this.enderecoService
        .query({ filter: 'contato-is-null' })
        .pipe(
          map((res: HttpResponse<IEndereco[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IEndereco[]) => {
          if (!contato.endereco || !contato.endereco.id) {
            this.enderecos = resBody;
          } else {
            this.enderecoService
              .find(contato.endereco.id)
              .pipe(
                map((subRes: HttpResponse<IEndereco>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IEndereco[]) => (this.enderecos = concatRes));
          }
        });
    });
  }

  updateForm(contato: IContato): void {
    this.editForm.patchValue({
      id: contato.id,
      telefone: contato.telefone,
      email: contato.email,
      endereco: contato.endereco,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const contato = this.createFromForm();
    if (contato.id !== undefined) {
      this.subscribeToSaveResponse(this.contatoService.update(contato));
    } else {
      this.subscribeToSaveResponse(this.contatoService.create(contato));
    }
  }

  private createFromForm(): IContato {
    return {
      ...new Contato(),
      id: this.editForm.get(['id'])!.value,
      telefone: this.editForm.get(['telefone'])!.value,
      email: this.editForm.get(['email'])!.value,
      endereco: this.editForm.get(['endereco'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContato>>): void {
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
