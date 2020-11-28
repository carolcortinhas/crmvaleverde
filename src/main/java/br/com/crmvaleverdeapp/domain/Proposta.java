package br.com.crmvaleverdeapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Proposta.
 */
@Entity
@Table(name = "proposta")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Proposta implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero")
    private Integer numero;

    @Column(name = "data")
    private LocalDate data;

    @OneToMany(mappedBy = "propostaDocumentos")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Documento> geraDocumentos = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "propostas", allowSetters = true)
    private Atendimento propostaVenda;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumero() {
        return numero;
    }

    public Proposta numero(Integer numero) {
        this.numero = numero;
        return this;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public LocalDate getData() {
        return data;
    }

    public Proposta data(LocalDate data) {
        this.data = data;
        return this;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public Set<Documento> getGeraDocumentos() {
        return geraDocumentos;
    }

    public Proposta geraDocumentos(Set<Documento> documentos) {
        this.geraDocumentos = documentos;
        return this;
    }

    public Proposta addGeraDocumento(Documento documento) {
        this.geraDocumentos.add(documento);
        documento.setPropostaDocumentos(this);
        return this;
    }

    public Proposta removeGeraDocumento(Documento documento) {
        this.geraDocumentos.remove(documento);
        documento.setPropostaDocumentos(null);
        return this;
    }

    public void setGeraDocumentos(Set<Documento> documentos) {
        this.geraDocumentos = documentos;
    }

    public Atendimento getPropostaVenda() {
        return propostaVenda;
    }

    public Proposta propostaVenda(Atendimento atendimento) {
        this.propostaVenda = atendimento;
        return this;
    }

    public void setPropostaVenda(Atendimento atendimento) {
        this.propostaVenda = atendimento;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Proposta)) {
            return false;
        }
        return id != null && id.equals(((Proposta) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Proposta{" +
            "id=" + getId() +
            ", numero=" + getNumero() +
            ", data='" + getData() + "'" +
            "}";
    }
}
