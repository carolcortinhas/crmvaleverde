package br.com.crmvaleverdeapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import br.com.crmvaleverdeapp.domain.enumeration.Tarefa;

/**
 * A Atendimento.
 */
@Entity
@Table(name = "atendimento")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Atendimento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "valor_total")
    private Long valorTotal;

    @Column(name = "data_inicio")
    private Instant dataInicio;

    @Column(name = "data_fim")
    private Instant dataFim;

    @Column(name = "privacidade")
    private String privacidade;

    @Enumerated(EnumType.STRING)
    @Column(name = "tarefa")
    private Tarefa tarefa;

    @OneToMany(mappedBy = "atendimentosOportunidades")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Oportunidade> oportunidadesVendas = new HashSet<>();

    @OneToMany(mappedBy = "atendimento")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<EtapaAtendimento> etapasAtendimentos = new HashSet<>();

    @OneToMany(mappedBy = "propostaVenda")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Proposta> propostas = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "atendimentos", allowSetters = true)
    private Cliente clientesAtendidos;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getValorTotal() {
        return valorTotal;
    }

    public Atendimento valorTotal(Long valorTotal) {
        this.valorTotal = valorTotal;
        return this;
    }

    public void setValorTotal(Long valorTotal) {
        this.valorTotal = valorTotal;
    }

    public Instant getDataInicio() {
        return dataInicio;
    }

    public Atendimento dataInicio(Instant dataInicio) {
        this.dataInicio = dataInicio;
        return this;
    }

    public void setDataInicio(Instant dataInicio) {
        this.dataInicio = dataInicio;
    }

    public Instant getDataFim() {
        return dataFim;
    }

    public Atendimento dataFim(Instant dataFim) {
        this.dataFim = dataFim;
        return this;
    }

    public void setDataFim(Instant dataFim) {
        this.dataFim = dataFim;
    }

    public String getPrivacidade() {
        return privacidade;
    }

    public Atendimento privacidade(String privacidade) {
        this.privacidade = privacidade;
        return this;
    }

    public void setPrivacidade(String privacidade) {
        this.privacidade = privacidade;
    }

    public Tarefa getTarefa() {
        return tarefa;
    }

    public Atendimento tarefa(Tarefa tarefa) {
        this.tarefa = tarefa;
        return this;
    }

    public void setTarefa(Tarefa tarefa) {
        this.tarefa = tarefa;
    }

    public Set<Oportunidade> getOportunidadesVendas() {
        return oportunidadesVendas;
    }

    public Atendimento oportunidadesVendas(Set<Oportunidade> oportunidades) {
        this.oportunidadesVendas = oportunidades;
        return this;
    }

    public Atendimento addOportunidadesVendas(Oportunidade oportunidade) {
        this.oportunidadesVendas.add(oportunidade);
        oportunidade.setAtendimentosOportunidades(this);
        return this;
    }

    public Atendimento removeOportunidadesVendas(Oportunidade oportunidade) {
        this.oportunidadesVendas.remove(oportunidade);
        oportunidade.setAtendimentosOportunidades(null);
        return this;
    }

    public void setOportunidadesVendas(Set<Oportunidade> oportunidades) {
        this.oportunidadesVendas = oportunidades;
    }

    public Set<EtapaAtendimento> getEtapasAtendimentos() {
        return etapasAtendimentos;
    }

    public Atendimento etapasAtendimentos(Set<EtapaAtendimento> etapaAtendimentos) {
        this.etapasAtendimentos = etapaAtendimentos;
        return this;
    }

    public Atendimento addEtapasAtendimento(EtapaAtendimento etapaAtendimento) {
        this.etapasAtendimentos.add(etapaAtendimento);
        etapaAtendimento.setAtendimento(this);
        return this;
    }

    public Atendimento removeEtapasAtendimento(EtapaAtendimento etapaAtendimento) {
        this.etapasAtendimentos.remove(etapaAtendimento);
        etapaAtendimento.setAtendimento(null);
        return this;
    }

    public void setEtapasAtendimentos(Set<EtapaAtendimento> etapaAtendimentos) {
        this.etapasAtendimentos = etapaAtendimentos;
    }

    public Set<Proposta> getPropostas() {
        return propostas;
    }

    public Atendimento propostas(Set<Proposta> propostas) {
        this.propostas = propostas;
        return this;
    }

    public Atendimento addPropostas(Proposta proposta) {
        this.propostas.add(proposta);
        proposta.setPropostaVenda(this);
        return this;
    }

    public Atendimento removePropostas(Proposta proposta) {
        this.propostas.remove(proposta);
        proposta.setPropostaVenda(null);
        return this;
    }

    public void setPropostas(Set<Proposta> propostas) {
        this.propostas = propostas;
    }

    public Cliente getClientesAtendidos() {
        return clientesAtendidos;
    }

    public Atendimento clientesAtendidos(Cliente cliente) {
        this.clientesAtendidos = cliente;
        return this;
    }

    public void setClientesAtendidos(Cliente cliente) {
        this.clientesAtendidos = cliente;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Atendimento)) {
            return false;
        }
        return id != null && id.equals(((Atendimento) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Atendimento{" +
            "id=" + getId() +
            ", valorTotal=" + getValorTotal() +
            ", dataInicio='" + getDataInicio() + "'" +
            ", dataFim='" + getDataFim() + "'" +
            ", privacidade='" + getPrivacidade() + "'" +
            ", tarefa='" + getTarefa() + "'" +
            "}";
    }
}
