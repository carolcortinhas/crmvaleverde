package br.com.crmvaleverdeapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.crmvaleverdeapp.web.rest.TestUtil;

public class ConsultorTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Consultor.class);
        Consultor consultor1 = new Consultor();
        consultor1.setId(1L);
        Consultor consultor2 = new Consultor();
        consultor2.setId(consultor1.getId());
        assertThat(consultor1).isEqualTo(consultor2);
        consultor2.setId(2L);
        assertThat(consultor1).isNotEqualTo(consultor2);
        consultor1.setId(null);
        assertThat(consultor1).isNotEqualTo(consultor2);
    }
}
