package br.com.crmvaleverdeapp.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import br.com.crmvaleverdeapp.web.rest.TestUtil;

public class ClientePessoaJuridicaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ClientePessoaJuridica.class);
        ClientePessoaJuridica clientePessoaJuridica1 = new ClientePessoaJuridica();
        clientePessoaJuridica1.setId(1L);
        ClientePessoaJuridica clientePessoaJuridica2 = new ClientePessoaJuridica();
        clientePessoaJuridica2.setId(clientePessoaJuridica1.getId());
        assertThat(clientePessoaJuridica1).isEqualTo(clientePessoaJuridica2);
        clientePessoaJuridica2.setId(2L);
        assertThat(clientePessoaJuridica1).isNotEqualTo(clientePessoaJuridica2);
        clientePessoaJuridica1.setId(null);
        assertThat(clientePessoaJuridica1).isNotEqualTo(clientePessoaJuridica2);
    }
}
