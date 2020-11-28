package br.com.crmvaleverdeapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Venda.
 */
@Entity
@Table(name = "venda")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Venda implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "valor_desconto")
    private Long valorDesconto;

    @Column(name = "valor_total")
    private Long valorTotal;

    @Column(name = "dia_fechamento")
    private Instant diaFechamento;

    @OneToMany(mappedBy = "vendas1")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Produto> produtosVenda1s = new HashSet<>();

    @OneToMany(mappedBy = "vendasProdutos")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<ProdutoVenda> produtosVenda3s = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "vendas", allowSetters = true)
    private Consultor consultorVenda;

    @ManyToOne
    @JsonIgnoreProperties(value = "vendasOportunidades", allowSetters = true)
    private Oportunidade oportunidadeVenda;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getValorDesconto() {
        return valorDesconto;
    }

    public Venda valorDesconto(Long valorDesconto) {
        this.valorDesconto = valorDesconto;
        return this;
    }

    public void setValorDesconto(Long valorDesconto) {
        this.valorDesconto = valorDesconto;
    }

    public Long getValorTotal() {
        return valorTotal;
    }

    public Venda valorTotal(Long valorTotal) {
        this.valorTotal = valorTotal;
        return this;
    }

    public void setValorTotal(Long valorTotal) {
        this.valorTotal = valorTotal;
    }

    public Instant getDiaFechamento() {
        return diaFechamento;
    }

    public Venda diaFechamento(Instant diaFechamento) {
        this.diaFechamento = diaFechamento;
        return this;
    }

    public void setDiaFechamento(Instant diaFechamento) {
        this.diaFechamento = diaFechamento;
    }

    public Set<Produto> getProdutosVenda1s() {
        return produtosVenda1s;
    }

    public Venda produtosVenda1s(Set<Produto> produtos) {
        this.produtosVenda1s = produtos;
        return this;
    }

    public Venda addProdutosVenda1(Produto produto) {
        this.produtosVenda1s.add(produto);
        produto.setVendas1(this);
        return this;
    }

    public Venda removeProdutosVenda1(Produto produto) {
        this.produtosVenda1s.remove(produto);
        produto.setVendas1(null);
        return this;
    }

    public void setProdutosVenda1s(Set<Produto> produtos) {
        this.produtosVenda1s = produtos;
    }

    public Set<ProdutoVenda> getProdutosVenda3s() {
        return produtosVenda3s;
    }

    public Venda produtosVenda3s(Set<ProdutoVenda> produtoVendas) {
        this.produtosVenda3s = produtoVendas;
        return this;
    }

    public Venda addProdutosVenda3(ProdutoVenda produtoVenda) {
        this.produtosVenda3s.add(produtoVenda);
        produtoVenda.setVendasProdutos(this);
        return this;
    }

    public Venda removeProdutosVenda3(ProdutoVenda produtoVenda) {
        this.produtosVenda3s.remove(produtoVenda);
        produtoVenda.setVendasProdutos(null);
        return this;
    }

    public void setProdutosVenda3s(Set<ProdutoVenda> produtoVendas) {
        this.produtosVenda3s = produtoVendas;
    }

    public Consultor getConsultorVenda() {
        return consultorVenda;
    }

    public Venda consultorVenda(Consultor consultor) {
        this.consultorVenda = consultor;
        return this;
    }

    public void setConsultorVenda(Consultor consultor) {
        this.consultorVenda = consultor;
    }

    public Oportunidade getOportunidadeVenda() {
        return oportunidadeVenda;
    }

    public Venda oportunidadeVenda(Oportunidade oportunidade) {
        this.oportunidadeVenda = oportunidade;
        return this;
    }

    public void setOportunidadeVenda(Oportunidade oportunidade) {
        this.oportunidadeVenda = oportunidade;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Venda)) {
            return false;
        }
        return id != null && id.equals(((Venda) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Venda{" +
            "id=" + getId() +
            ", valorDesconto=" + getValorDesconto() +
            ", valorTotal=" + getValorTotal() +
            ", diaFechamento='" + getDiaFechamento() + "'" +
            "}";
    }
}
