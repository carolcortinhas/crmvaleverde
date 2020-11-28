package br.com.crmvaleverdeapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.crmvaleverdeapp.web.rest.TestUtil;

public class AvaliacaoProdutoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AvaliacaoProduto.class);
        AvaliacaoProduto avaliacaoProduto1 = new AvaliacaoProduto();
        avaliacaoProduto1.setId(1L);
        AvaliacaoProduto avaliacaoProduto2 = new AvaliacaoProduto();
        avaliacaoProduto2.setId(avaliacaoProduto1.getId());
        assertThat(avaliacaoProduto1).isEqualTo(avaliacaoProduto2);
        avaliacaoProduto2.setId(2L);
        assertThat(avaliacaoProduto1).isNotEqualTo(avaliacaoProduto2);
        avaliacaoProduto1.setId(null);
        assertThat(avaliacaoProduto1).isNotEqualTo(avaliacaoProduto2);
    }
}
