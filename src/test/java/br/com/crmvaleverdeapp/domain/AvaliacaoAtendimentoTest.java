package br.com.crmvaleverdeapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.crmvaleverdeapp.web.rest.TestUtil;

public class AvaliacaoAtendimentoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AvaliacaoAtendimento.class);
        AvaliacaoAtendimento avaliacaoAtendimento1 = new AvaliacaoAtendimento();
        avaliacaoAtendimento1.setId(1L);
        AvaliacaoAtendimento avaliacaoAtendimento2 = new AvaliacaoAtendimento();
        avaliacaoAtendimento2.setId(avaliacaoAtendimento1.getId());
        assertThat(avaliacaoAtendimento1).isEqualTo(avaliacaoAtendimento2);
        avaliacaoAtendimento2.setId(2L);
        assertThat(avaliacaoAtendimento1).isNotEqualTo(avaliacaoAtendimento2);
        avaliacaoAtendimento1.setId(null);
        assertThat(avaliacaoAtendimento1).isNotEqualTo(avaliacaoAtendimento2);
    }
}
