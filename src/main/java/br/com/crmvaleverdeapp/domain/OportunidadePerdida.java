package br.com.crmvaleverdeapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A OportunidadePerdida.
 */
@Entity
@Table(name = "oportunidade_perdida")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class OportunidadePerdida implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "descricao_perda")
    private String descricaoPerda;

    @Column(name = "date")
    private LocalDate date;

    @OneToOne(mappedBy = "oportunidadePerdida")
    @JsonIgnore
    private Oportunidade vendaNaoEfetuada;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricaoPerda() {
        return descricaoPerda;
    }

    public OportunidadePerdida descricaoPerda(String descricaoPerda) {
        this.descricaoPerda = descricaoPerda;
        return this;
    }

    public void setDescricaoPerda(String descricaoPerda) {
        this.descricaoPerda = descricaoPerda;
    }

    public LocalDate getDate() {
        return date;
    }

    public OportunidadePerdida date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Oportunidade getVendaNaoEfetuada() {
        return vendaNaoEfetuada;
    }

    public OportunidadePerdida vendaNaoEfetuada(Oportunidade oportunidade) {
        this.vendaNaoEfetuada = oportunidade;
        return this;
    }

    public void setVendaNaoEfetuada(Oportunidade oportunidade) {
        this.vendaNaoEfetuada = oportunidade;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OportunidadePerdida)) {
            return false;
        }
        return id != null && id.equals(((OportunidadePerdida) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "OportunidadePerdida{" +
            "id=" + getId() +
            ", descricaoPerda='" + getDescricaoPerda() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
