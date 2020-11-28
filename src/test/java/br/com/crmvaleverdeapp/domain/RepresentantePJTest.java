package br.com.crmvaleverdeapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.crmvaleverdeapp.web.rest.TestUtil;

public class RepresentantePJTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(RepresentantePJ.class);
        RepresentantePJ representantePJ1 = new RepresentantePJ();
        representantePJ1.setId(1L);
        RepresentantePJ representantePJ2 = new RepresentantePJ();
        representantePJ2.setId(representantePJ1.getId());
        assertThat(representantePJ1).isEqualTo(representantePJ2);
        representantePJ2.setId(2L);
        assertThat(representantePJ1).isNotEqualTo(representantePJ2);
        representantePJ1.setId(null);
        assertThat(representantePJ1).isNotEqualTo(representantePJ2);
    }
}
