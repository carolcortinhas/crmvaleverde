package br.com.crmvaleverdeapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Avaliacao.
 */
@Entity
@Table(name = "avaliacao")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Avaliacao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nivel_satisfacao", nullable = false)
    private String nivelSatisfacao;

    @Column(name = "descricao")
    private String descricao;

    @OneToOne
    @JoinColumn(unique = true)
    private AvaliacaoProduto avaliacaoProduto;

    @OneToOne
    @JoinColumn(unique = true)
    private AvaliacaoAtendimento avaliacaoAtendimento;

    @ManyToOne
    @JsonIgnoreProperties(value = "avalias", allowSetters = true)
    private Cliente clientesAvaliacoes;

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

    public Avaliacao nivelSatisfacao(String nivelSatisfacao) {
        this.nivelSatisfacao = nivelSatisfacao;
        return this;
    }

    public void setNivelSatisfacao(String nivelSatisfacao) {
        this.nivelSatisfacao = nivelSatisfacao;
    }

    public String getDescricao() {
        return descricao;
    }

    public Avaliacao descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public AvaliacaoProduto getAvaliacaoProduto() {
        return avaliacaoProduto;
    }

    public Avaliacao avaliacaoProduto(AvaliacaoProduto avaliacaoProduto) {
        this.avaliacaoProduto = avaliacaoProduto;
        return this;
    }

    public void setAvaliacaoProduto(AvaliacaoProduto avaliacaoProduto) {
        this.avaliacaoProduto = avaliacaoProduto;
    }

    public AvaliacaoAtendimento getAvaliacaoAtendimento() {
        return avaliacaoAtendimento;
    }

    public Avaliacao avaliacaoAtendimento(AvaliacaoAtendimento avaliacaoAtendimento) {
        this.avaliacaoAtendimento = avaliacaoAtendimento;
        return this;
    }

    public void setAvaliacaoAtendimento(AvaliacaoAtendimento avaliacaoAtendimento) {
        this.avaliacaoAtendimento = avaliacaoAtendimento;
    }

    public Cliente getClientesAvaliacoes() {
        return clientesAvaliacoes;
    }

    public Avaliacao clientesAvaliacoes(Cliente cliente) {
        this.clientesAvaliacoes = cliente;
        return this;
    }

    public void setClientesAvaliacoes(Cliente cliente) {
        this.clientesAvaliacoes = cliente;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Avaliacao)) {
            return false;
        }
        return id != null && id.equals(((Avaliacao) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Avaliacao{" +
            "id=" + getId() +
            ", nivelSatisfacao='" + getNivelSatisfacao() + "'" +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}
