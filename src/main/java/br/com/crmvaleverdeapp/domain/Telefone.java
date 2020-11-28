package br.com.crmvaleverdeapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Telefone.
 */
@Entity
@Table(name = "telefone")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Telefone implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cod_area")
    private Integer codArea;

    @Column(name = "numero")
    private Integer numero;

    @Column(name = "whats_app")
    private Boolean whatsApp;

    @OneToOne(mappedBy = "telefone")
    @JsonIgnore
    private Contato contato;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCodArea() {
        return codArea;
    }

    public Telefone codArea(Integer codArea) {
        this.codArea = codArea;
        return this;
    }

    public void setCodArea(Integer codArea) {
        this.codArea = codArea;
    }

    public Integer getNumero() {
        return numero;
    }

    public Telefone numero(Integer numero) {
        this.numero = numero;
        return this;
    }

    public void setNumero(Integer numero) {
        this.numero = numero;
    }

    public Boolean isWhatsApp() {
        return whatsApp;
    }

    public Telefone whatsApp(Boolean whatsApp) {
        this.whatsApp = whatsApp;
        return this;
    }

    public void setWhatsApp(Boolean whatsApp) {
        this.whatsApp = whatsApp;
    }

    public Contato getContato() {
        return contato;
    }

    public Telefone contato(Contato contato) {
        this.contato = contato;
        return this;
    }

    public void setContato(Contato contato) {
        this.contato = contato;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Telefone)) {
            return false;
        }
        return id != null && id.equals(((Telefone) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Telefone{" +
            "id=" + getId() +
            ", codArea=" + getCodArea() +
            ", numero=" + getNumero() +
            ", whatsApp='" + isWhatsApp() + "'" +
            "}";
    }
}
