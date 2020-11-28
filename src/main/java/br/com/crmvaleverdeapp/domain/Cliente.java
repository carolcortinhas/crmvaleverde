package br.com.crmvaleverdeapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import br.com.crmvaleverdeapp.domain.enumeration.Origem;

import br.com.crmvaleverdeapp.domain.enumeration.Categoria;

/**
 * A Cliente.
 */
@Entity
@Table(name = "cliente")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Cliente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nivel_satisfacao")
    private String nivelSatisfacao;

    @Enumerated(EnumType.STRING)
    @Column(name = "origem")
    private Origem origem;

    @Enumerated(EnumType.STRING)
    @Column(name = "categoria")
    private Categoria categoria;

    @OneToOne
    @JoinColumn(unique = true)
    private ClientePessoaJuridica clientePessoaJuridica;

    @OneToOne
    @JoinColumn(unique = true)
    private ClientePessoaFisica clientePessoaFisica;

    @OneToMany(mappedBy = "clientesAtendidos")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Atendimento> atendimentos = new HashSet<>();

    @OneToMany(mappedBy = "clientesOportunidades")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Consultor> consultoresVendas = new HashSet<>();

    @OneToMany(mappedBy = "clientesAvaliacoes")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Avaliacao> avalias = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "atendes", allowSetters = true)
    private Consultor consultor;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNivelSatisfacao() {
        return nivelSatisfacao;
    }

    public Cliente nivelSatisfacao(String nivelSatisfacao) {
        this.nivelSatisfacao = nivelSatisfacao;
        return this;
    }

    public void setNivelSatisfacao(String nivelSatisfacao) {
        this.nivelSatisfacao = nivelSatisfacao;
    }

    public Origem getOrigem() {
        return origem;
    }

    public Cliente origem(Origem origem) {
        this.origem = origem;
        return this;
    }

    public void setOrigem(Origem origem) {
        this.origem = origem;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public Cliente categoria(Categoria categoria) {
        this.categoria = categoria;
        return this;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public ClientePessoaJuridica getClientePessoaJuridica() {
        return clientePessoaJuridica;
    }

    public Cliente clientePessoaJuridica(ClientePessoaJuridica clientePessoaJuridica) {
        this.clientePessoaJuridica = clientePessoaJuridica;
        return this;
    }

    public void setClientePessoaJuridica(ClientePessoaJuridica clientePessoaJuridica) {
        this.clientePessoaJuridica = clientePessoaJuridica;
    }

    public ClientePessoaFisica getClientePessoaFisica() {
        return clientePessoaFisica;
    }

    public Cliente clientePessoaFisica(ClientePessoaFisica clientePessoaFisica) {
        this.clientePessoaFisica = clientePessoaFisica;
        return this;
    }

    public void setClientePessoaFisica(ClientePessoaFisica clientePessoaFisica) {
        this.clientePessoaFisica = clientePessoaFisica;
    }

    public Set<Atendimento> getAtendimentos() {
        return atendimentos;
    }

    public Cliente atendimentos(Set<Atendimento> atendimentos) {
        this.atendimentos = atendimentos;
        return this;
    }

    public Cliente addAtendimentos(Atendimento atendimento) {
        this.atendimentos.add(atendimento);
        atendimento.setClientesAtendidos(this);
        return this;
    }

    public Cliente removeAtendimentos(Atendimento atendimento) {
        this.atendimentos.remove(atendimento);
        atendimento.setClientesAtendidos(null);
        return this;
    }

    public void setAtendimentos(Set<Atendimento> atendimentos) {
        this.atendimentos = atendimentos;
    }

    public Set<Consultor> getConsultoresVendas() {
        return consultoresVendas;
    }

    public Cliente consultoresVendas(Set<Consultor> consultors) {
        this.consultoresVendas = consultors;
        return this;
    }

    public Cliente addConsultoresVenda(Consultor consultor) {
        this.consultoresVendas.add(consultor);
        consultor.setClientesOportunidades(this);
        return this;
    }

    public Cliente removeConsultoresVenda(Consultor consultor) {
        this.consultoresVendas.remove(consultor);
        consultor.setClientesOportunidades(null);
        return this;
    }

    public void setConsultoresVendas(Set<Consultor> consultors) {
        this.consultoresVendas = consultors;
    }

    public Set<Avaliacao> getAvalias() {
        return avalias;
    }

    public Cliente avalias(Set<Avaliacao> avaliacaos) {
        this.avalias = avaliacaos;
        return this;
    }

    public Cliente addAvalia(Avaliacao avaliacao) {
        this.avalias.add(avaliacao);
        avaliacao.setClientesAvaliacoes(this);
        return this;
    }

    public Cliente removeAvalia(Avaliacao avaliacao) {
        this.avalias.remove(avaliacao);
        avaliacao.setClientesAvaliacoes(null);
        return this;
    }

    public void setAvalias(Set<Avaliacao> avaliacaos) {
        this.avalias = avaliacaos;
    }

    public Consultor getConsultor() {
        return consultor;
    }

    public Cliente consultor(Consultor consultor) {
        this.consultor = consultor;
        return this;
    }

    public void setConsultor(Consultor consultor) {
        this.consultor = consultor;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Cliente)) {
            return false;
        }
        return id != null && id.equals(((Cliente) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Cliente{" +
            "id=" + getId() +
            ", nivelSatisfacao='" + getNivelSatisfacao() + "'" +
            ", origem='" + getOrigem() + "'" +
            ", categoria='" + getCategoria() + "'" +
            "}";
    }
}
