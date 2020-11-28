package br.com.crmvaleverdeapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Consultor.
 */
@Entity
@Table(name = "consultor")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Consultor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @OneToMany(mappedBy = "consultor")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Cliente> atendes = new HashSet<>();

    @OneToMany(mappedBy = "consultorVenda")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Venda> vendas = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "vendedores", allowSetters = true)
    private Funcionario cadastroFuncionario;

    @ManyToOne
    @JsonIgnoreProperties(value = "consultoresVendas", allowSetters = true)
    private Cliente clientesOportunidades;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Consultor nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Set<Cliente> getAtendes() {
        return atendes;
    }

    public Consultor atendes(Set<Cliente> clientes) {
        this.atendes = clientes;
        return this;
    }

    public Consultor addAtende(Cliente cliente) {
        this.atendes.add(cliente);
        cliente.setConsultor(this);
        return this;
    }

    public Consultor removeAtende(Cliente cliente) {
        this.atendes.remove(cliente);
        cliente.setConsultor(null);
        return this;
    }

    public void setAtendes(Set<Cliente> clientes) {
        this.atendes = clientes;
    }

    public Set<Venda> getVendas() {
        return vendas;
    }

    public Consultor vendas(Set<Venda> vendas) {
        this.vendas = vendas;
        return this;
    }

    public Consultor addVendas(Venda venda) {
        this.vendas.add(venda);
        venda.setConsultorVenda(this);
        return this;
    }

    public Consultor removeVendas(Venda venda) {
        this.vendas.remove(venda);
        venda.setConsultorVenda(null);
        return this;
    }

    public void setVendas(Set<Venda> vendas) {
        this.vendas = vendas;
    }

    public Funcionario getCadastroFuncionario() {
        return cadastroFuncionario;
    }

    public Consultor cadastroFuncionario(Funcionario funcionario) {
        this.cadastroFuncionario = funcionario;
        return this;
    }

    public void setCadastroFuncionario(Funcionario funcionario) {
        this.cadastroFuncionario = funcionario;
    }

    public Cliente getClientesOportunidades() {
        return clientesOportunidades;
    }

    public Consultor clientesOportunidades(Cliente cliente) {
        this.clientesOportunidades = cliente;
        return this;
    }

    public void setClientesOportunidades(Cliente cliente) {
        this.clientesOportunidades = cliente;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Consultor)) {
            return false;
        }
        return id != null && id.equals(((Consultor) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Consultor{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
