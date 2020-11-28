package br.com.crmvaleverdeapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.crmvaleverdeapp.web.rest.TestUtil;

public class ProdutoVendaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProdutoVenda.class);
        ProdutoVenda produtoVenda1 = new ProdutoVenda();
        produtoVenda1.setId(1L);
        ProdutoVenda produtoVenda2 = new ProdutoVenda();
        produtoVenda2.setId(produtoVenda1.getId());
        assertThat(produtoVenda1).isEqualTo(produtoVenda2);
        produtoVenda2.setId(2L);
        assertThat(produtoVenda1).isNotEqualTo(produtoVenda2);
        produtoVenda1.setId(null);
        assertThat(produtoVenda1).isNotEqualTo(produtoVenda2);
    }
}
