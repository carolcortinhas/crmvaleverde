package br.com.crmvaleverdeapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.crmvaleverdeapp.web.rest.TestUtil;

public class ClientePessoaFisicaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ClientePessoaFisica.class);
        ClientePessoaFisica clientePessoaFisica1 = new ClientePessoaFisica();
        clientePessoaFisica1.setId(1L);
        ClientePessoaFisica clientePessoaFisica2 = new ClientePessoaFisica();
        clientePessoaFisica2.setId(clientePessoaFisica1.getId());
        assertThat(clientePessoaFisica1).isEqualTo(clientePessoaFisica2);
        clientePessoaFisica2.setId(2L);
        assertThat(clientePessoaFisica1).isNotEqualTo(clientePessoaFisica2);
        clientePessoaFisica1.setId(null);
        assertThat(clientePessoaFisica1).isNotEqualTo(clientePessoaFisica2);
    }
}
