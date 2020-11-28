package br.com.crmvaleverdeapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.crmvaleverdeapp.web.rest.TestUtil;

public class OportunidadePerdidaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OportunidadePerdida.class);
        OportunidadePerdida oportunidadePerdida1 = new OportunidadePerdida();
        oportunidadePerdida1.setId(1L);
        OportunidadePerdida oportunidadePerdida2 = new OportunidadePerdida();
        oportunidadePerdida2.setId(oportunidadePerdida1.getId());
        assertThat(oportunidadePerdida1).isEqualTo(oportunidadePerdida2);
        oportunidadePerdida2.setId(2L);
        assertThat(oportunidadePerdida1).isNotEqualTo(oportunidadePerdida2);
        oportunidadePerdida1.setId(null);
        assertThat(oportunidadePerdida1).isNotEqualTo(oportunidadePerdida2);
    }
}
