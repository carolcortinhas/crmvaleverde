import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'pessoa',
        loadChildren: () => import('./pessoa/pessoa.module').then(m => m.CrmvaleverdePessoaModule),
      },
      {
        path: 'contato',
        loadChildren: () => import('./contato/contato.module').then(m => m.CrmvaleverdeContatoModule),
      },
      {
        path: 'telefone',
        loadChildren: () => import('./telefone/telefone.module').then(m => m.CrmvaleverdeTelefoneModule),
      },
      {
        path: 'email',
        loadChildren: () => import('./email/email.module').then(m => m.CrmvaleverdeEmailModule),
      },
      {
        path: 'administrador',
        loadChildren: () => import('./administrador/administrador.module').then(m => m.CrmvaleverdeAdministradorModule),
      },
      {
        path: 'consultor',
        loadChildren: () => import('./consultor/consultor.module').then(m => m.CrmvaleverdeConsultorModule),
      },
      {
        path: 'gerente',
        loadChildren: () => import('./gerente/gerente.module').then(m => m.CrmvaleverdeGerenteModule),
      },
      {
        path: 'funcionario',
        loadChildren: () => import('./funcionario/funcionario.module').then(m => m.CrmvaleverdeFuncionarioModule),
      },
      {
        path: 'cliente',
        loadChildren: () => import('./cliente/cliente.module').then(m => m.CrmvaleverdeClienteModule),
      },
      {
        path: 'cliente-pessoa-fisica',
        loadChildren: () =>
          import('./cliente-pessoa-fisica/cliente-pessoa-fisica.module').then(m => m.CrmvaleverdeClientePessoaFisicaModule),
      },
      {
        path: 'cliente-pessoa-juridica',
        loadChildren: () =>
          import('./cliente-pessoa-juridica/cliente-pessoa-juridica.module').then(m => m.CrmvaleverdeClientePessoaJuridicaModule),
      },
      {
        path: 'representante-pj',
        loadChildren: () => import('./representante-pj/representante-pj.module').then(m => m.CrmvaleverdeRepresentantePJModule),
      },
      {
        path: 'endereco',
        loadChildren: () => import('./endereco/endereco.module').then(m => m.CrmvaleverdeEnderecoModule),
      },
      {
        path: 'atendimento',
        loadChildren: () => import('./atendimento/atendimento.module').then(m => m.CrmvaleverdeAtendimentoModule),
      },
      {
        path: 'etapa-atendimento',
        loadChildren: () => import('./etapa-atendimento/etapa-atendimento.module').then(m => m.CrmvaleverdeEtapaAtendimentoModule),
      },
      {
        path: 'avaliacao',
        loadChildren: () => import('./avaliacao/avaliacao.module').then(m => m.CrmvaleverdeAvaliacaoModule),
      },
      {
        path: 'avaliacao-atendimento',
        loadChildren: () =>
          import('./avaliacao-atendimento/avaliacao-atendimento.module').then(m => m.CrmvaleverdeAvaliacaoAtendimentoModule),
      },
      {
        path: 'avaliacao-produto',
        loadChildren: () => import('./avaliacao-produto/avaliacao-produto.module').then(m => m.CrmvaleverdeAvaliacaoProdutoModule),
      },
      {
        path: 'venda',
        loadChildren: () => import('./venda/venda.module').then(m => m.CrmvaleverdeVendaModule),
      },
      {
        path: 'produto-venda',
        loadChildren: () => import('./produto-venda/produto-venda.module').then(m => m.CrmvaleverdeProdutoVendaModule),
      },
      {
        path: 'produto',
        loadChildren: () => import('./produto/produto.module').then(m => m.CrmvaleverdeProdutoModule),
      },
      {
        path: 'proposta',
        loadChildren: () => import('./proposta/proposta.module').then(m => m.CrmvaleverdePropostaModule),
      },
      {
        path: 'documento',
        loadChildren: () => import('./documento/documento.module').then(m => m.CrmvaleverdeDocumentoModule),
      },
      {
        path: 'oportunidade',
        loadChildren: () => import('./oportunidade/oportunidade.module').then(m => m.CrmvaleverdeOportunidadeModule),
      },
      {
        path: 'oportunidade-perdida',
        loadChildren: () => import('./oportunidade-perdida/oportunidade-perdida.module').then(m => m.CrmvaleverdeOportunidadePerdidaModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class CrmvaleverdeEntityModule {}
