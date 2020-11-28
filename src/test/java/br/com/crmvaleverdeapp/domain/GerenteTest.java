package br.com.crmvaleverdeapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.crmvaleverdeapp.web.rest.TestUtil;

public class GerenteTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Gerente.class);
        Gerente gerente1 = new Gerente();
        gerente1.setId(1L);
        Gerente gerente2 = new Gerente();
        gerente2.setId(gerente1.getId());
        assertThat(gerente1).isEqualTo(gerente2);
        gerente2.setId(2L);
        assertThat(gerente1).isNotEqualTo(gerente2);
        gerente1.setId(null);
        assertThat(gerente1).isNotEqualTo(gerente2);
    }
}
