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
 * A Oportunidade.
 */
@Entity
@Table(name = "oportunidade")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Oportunidade implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome_cliente")
    private String nomeCliente;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "data")
    private LocalDate data;

    @OneToOne
    @JoinColumn(unique = true)
    private OportunidadePerdida oportunidadePerdida;

    @OneToMany(mappedBy = "oportunidadeVenda")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Venda> vendasOportunidades = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "oportunidadesVendas", allowSetters = true)
    private Atendimento atendimentosOportunidades;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeCliente() {
        return nomeCliente;
    }

    public Oportunidade nomeCliente(String nomeCliente) {
        this.nomeCliente = nomeCliente;
        return this;
    }

    public void setNomeCliente(String nomeCliente) {
        this.nomeCliente = nomeCliente;
    }

    public String getDescricao() {
        return descricao;
    }

    public Oportunidade descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public LocalDate getData() {
        return data;
    }

    public Oportunidade data(LocalDate data) {
        this.data = data;
        return this;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public OportunidadePerdida getOportunidadePerdida() {
        return oportunidadePerdida;
    }

    public Oportunidade oportunidadePerdida(OportunidadePerdida oportunidadePerdida) {
        this.oportunidadePerdida = oportunidadePerdida;
        return this;
    }

    public void setOportunidadePerdida(OportunidadePerdida oportunidadePerdida) {
        this.oportunidadePerdida = oportunidadePerdida;
    }

    public Set<Venda> getVendasOportunidades() {
        return vendasOportunidades;
    }

    public Oportunidade vendasOportunidades(Set<Venda> vendas) {
        this.vendasOportunidades = vendas;
        return this;
    }

    public Oportunidade addVendasOportunidades(Venda venda) {
        this.vendasOportunidades.add(venda);
        venda.setOportunidadeVenda(this);
        return this;
    }

    public Oportunidade removeVendasOportunidades(Venda venda) {
        this.vendasOportunidades.remove(venda);
        venda.setOportunidadeVenda(null);
        return this;
    }

    public void setVendasOportunidades(Set<Venda> vendas) {
        this.vendasOportunidades = vendas;
    }

    public Atendimento getAtendimentosOportunidades() {
        return atendimentosOportunidades;
    }

    public Oportunidade atendimentosOportunidades(Atendimento atendimento) {
        this.atendimentosOportunidades = atendimento;
        return this;
    }

    public void setAtendimentosOportunidades(Atendimento atendimento) {
        this.atendimentosOportunidades = atendimento;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Oportunidade)) {
            return false;
        }
        return id != null && id.equals(((Oportunidade) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Oportunidade{" +
            "id=" + getId() +
            ", nomeCliente='" + getNomeCliente() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", data='" + getData() + "'" +
            "}";
    }
}
