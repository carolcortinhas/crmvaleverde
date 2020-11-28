package br.com.crmvaleverdeapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.crmvaleverdeapp.web.rest.TestUtil;

public class OportunidadeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Oportunidade.class);
        Oportunidade oportunidade1 = new Oportunidade();
        oportunidade1.setId(1L);
        Oportunidade oportunidade2 = new Oportunidade();
        oportunidade2.setId(oportunidade1.getId());
        assertThat(oportunidade1).isEqualTo(oportunidade2);
        oportunidade2.setId(2L);
        assertThat(oportunidade1).isNotEqualTo(oportunidade2);
        oportunidade1.setId(null);
        assertThat(oportunidade1).isNotEqualTo(oportunidade2);
    }
}
