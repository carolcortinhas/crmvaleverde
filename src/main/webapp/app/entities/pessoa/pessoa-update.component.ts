import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IPessoa, Pessoa } from 'app/shared/model/pessoa.model';
import { PessoaService } from './pessoa.service';
import { IContato } from 'app/shared/model/contato.model';
import { ContatoService } from 'app/entities/contato/contato.service';
import { IEndereco } from 'app/shared/model/endereco.model';
import { EnderecoService } from 'app/entities/endereco/endereco.service';
import { IFuncionario } from 'app/shared/model/funcionario.model';
import { FuncionarioService } from 'app/entities/funcionario/funcionario.service';
import { IClientePessoaJuridica } from 'app/shared/model/cliente-pessoa-juridica.model';
import { ClientePessoaJuridicaService } from 'app/entities/cliente-pessoa-juridica/cliente-pessoa-juridica.service';

type SelectableEntity = IContato | IEndereco | IFuncionario | IClientePessoaJuridica;

@Component({
  selector: 'jhi-pessoa-update',
  templateUrl: './pessoa-update.component.html',
})
export class PessoaUpdateComponent implements OnInit {
  isSaving = false;
  contatoes: IContato[] = [];
  enderecos: IEndereco[] = [];
  funcionarios: IFuncionario[] = [];
  juridicas: IClientePessoaJuridica[] = [];
  dataNascimentoDp: any;

  editForm = this.fb.group({
    id: [],
    nome: [null, [Validators.required]],
    sobrenome: [null, [Validators.required]],
    descricao: [null, [Validators.required]],
    cpf: [null, [Validators.required]],
    rg: [null, [Validators.required]],
    dataNascimento: [null, [Validators.required]],
    sexo: [],
    contato: [],
    endereco: [],
    funcionario: [],
    juridica: [],
  });

  constructor(
    protected pessoaService: PessoaService,
    protected contatoService: ContatoService,
    protected enderecoService: EnderecoService,
    protected funcionarioService: FuncionarioService,
    protected clientePessoaJuridicaService: ClientePessoaJuridicaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pessoa }) => {
      this.updateForm(pessoa);

      this.contatoService
        .query({ filter: 'pessoa-is-null' })
        .pipe(
          map((res: HttpResponse<IContato[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IContato[]) => {
          if (!pessoa.contato || !pessoa.contato.id) {
            this.contatoes = resBody;
          } else {
            this.contatoService
              .find(pessoa.contato.id)
              .pipe(
                map((subRes: HttpResponse<IContato>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IContato[]) => (this.contatoes = concatRes));
          }
        });

      this.enderecoService
        .query({ filter: 'pessoa-is-null' })
        .pipe(
          map((res: HttpResponse<IEndereco[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IEndereco[]) => {
          if (!pessoa.endereco || !pessoa.endereco.id) {
            this.enderecos = resBody;
          } else {
            this.enderecoService
              .find(pessoa.endereco.id)
              .pipe(
                map((subRes: HttpResponse<IEndereco>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IEndereco[]) => (this.enderecos = concatRes));
          }
        });

      this.funcionarioService
        .query({ filter: 'pessoa-is-null' })
        .pipe(
          map((res: HttpResponse<IFuncionario[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IFuncionario[]) => {
          if (!pessoa.funcionario || !pessoa.funcionario.id) {
            this.funcionarios = resBody;
          } else {
            this.funcionarioService
              .find(pessoa.funcionario.id)
              .pipe(
                map((subRes: HttpResponse<IFuncionario>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IFuncionario[]) => (this.funcionarios = concatRes));
          }
        });

      this.clientePessoaJuridicaService
        .query({ filter: 'pessoa-is-null' })
        .pipe(
          map((res: HttpResponse<IClientePessoaJuridica[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IClientePessoaJuridica[]) => {
          if (!pessoa.juridica || !pessoa.juridica.id) {
            this.juridicas = resBody;
          } else {
            this.clientePessoaJuridicaService
              .find(pessoa.juridica.id)
              .pipe(
                map((subRes: HttpResponse<IClientePessoaJuridica>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IClientePessoaJuridica[]) => (this.juridicas = concatRes));
          }
        });
    });
  }

  updateForm(pessoa: IPessoa): void {
    this.editForm.patchValue({
      id: pessoa.id,
      nome: pessoa.nome,
      sobrenome: pessoa.sobrenome,
      descricao: pessoa.descricao,
      cpf: pessoa.cpf,
      rg: pessoa.rg,
      dataNascimento: pessoa.dataNascimento,
      sexo: pessoa.sexo,
      contato: pessoa.contato,
      endereco: pessoa.endereco,
      funcionario: pessoa.funcionario,
      juridica: pessoa.juridica,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pessoa = this.createFromForm();
    if (pessoa.id !== undefined) {
      this.subscribeToSaveResponse(this.pessoaService.update(pessoa));
    } else {
      this.subscribeToSaveResponse(this.pessoaService.create(pessoa));
    }
  }

  private createFromForm(): IPessoa {
    return {
      ...new Pessoa(),
      id: this.editForm.get(['id'])!.value,
      nome: this.editForm.get(['nome'])!.value,
      sobrenome: this.editForm.get(['sobrenome'])!.value,
      descricao: this.editForm.get(['descricao'])!.value,
      cpf: this.editForm.get(['cpf'])!.value,
      rg: this.editForm.get(['rg'])!.value,
      dataNascimento: this.editForm.get(['dataNascimento'])!.value,
      sexo: this.editForm.get(['sexo'])!.value,
      contato: this.editForm.get(['contato'])!.value,
      endereco: this.editForm.get(['endereco'])!.value,
      funcionario: this.editForm.get(['funcionario'])!.value,
      juridica: this.editForm.get(['juridica'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPessoa>>): void {
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
