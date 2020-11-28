package br.com.crmvaleverdeapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.crmvaleverdeapp.web.rest.TestUtil;

public class EtapaAtendimentoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EtapaAtendimento.class);
        EtapaAtendimento etapaAtendimento1 = new EtapaAtendimento();
        etapaAtendimento1.setId(1L);
        EtapaAtendimento etapaAtendimento2 = new EtapaAtendimento();
        etapaAtendimento2.setId(etapaAtendimento1.getId());
        assertThat(etapaAtendimento1).isEqualTo(etapaAtendimento2);
        etapaAtendimento2.setId(2L);
        assertThat(etapaAtendimento1).isNotEqualTo(etapaAtendimento2);
        etapaAtendimento1.setId(null);
        assertThat(etapaAtendimento1).isNotEqualTo(etapaAtendimento2);
    }
}
