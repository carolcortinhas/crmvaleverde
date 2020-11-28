package br.com.crmvaleverdeapp.web.rest;

import br.com.crmvaleverdeapp.CrmvaleverdeApp;
import br.com.crmvaleverdeapp.domain.ClientePessoaJuridica;
import br.com.crmvaleverdeapp.repository.ClientePessoaJuridicaRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ClientePessoaJuridicaResource} REST controller.
 */
@SpringBootTest(classes = CrmvaleverdeApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ClientePessoaJuridicaResourceIT {

    private static final Integer DEFAULT_CNPJ = 1;
    private static final Integer UPDATED_CNPJ = 2;

    private static final String DEFAULT_RAZAO_SOCIAL = "AAAAAAAAAA";
    private static final String UPDATED_RAZAO_SOCIAL = "BBBBBBBBBB";

    @Autowired
    private ClientePessoaJuridicaRepository clientePessoaJuridicaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restClientePessoaJuridicaMockMvc;

    private ClientePessoaJuridica clientePessoaJuridica;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ClientePessoaJuridica createEntity(EntityManager em) {
        ClientePessoaJuridica clientePessoaJuridica = new ClientePessoaJuridica()
            .cnpj(DEFAULT_CNPJ)
            .razaoSocial(DEFAULT_RAZAO_SOCIAL);
        return clientePessoaJuridica;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ClientePessoaJuridica createUpdatedEntity(EntityManager em) {
        ClientePessoaJuridica clientePessoaJuridica = new ClientePessoaJuridica()
            .cnpj(UPDATED_CNPJ)
            .razaoSocial(UPDATED_RAZAO_SOCIAL);
        return clientePessoaJuridica;
    }

    @BeforeEach
    public void initTest() {
        clientePessoaJuridica = createEntity(em);
    }

    @Test
    @Transactional
    public void createClientePessoaJuridica() throws Exception {
        int databaseSizeBeforeCreate = clientePessoaJuridicaRepository.findAll().size();
        // Create the ClientePessoaJuridica
        restClientePessoaJuridicaMockMvc.perform(post("/api/cliente-pessoa-juridicas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(clientePessoaJuridica)))
            .andExpect(status().isCreated());

        // Validate the ClientePessoaJuridica in the database
        List<ClientePessoaJuridica> clientePessoaJuridicaList = clientePessoaJuridicaRepository.findAll();
        assertThat(clientePessoaJuridicaList).hasSize(databaseSizeBeforeCreate + 1);
        ClientePessoaJuridica testClientePessoaJuridica = clientePessoaJuridicaList.get(clientePessoaJuridicaList.size() - 1);
        assertThat(testClientePessoaJuridica.getCnpj()).isEqualTo(DEFAULT_CNPJ);
        assertThat(testClientePessoaJuridica.getRazaoSocial()).isEqualTo(DEFAULT_RAZAO_SOCIAL);
    }

    @Test
    @Transactional
    public void createClientePessoaJuridicaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = clientePessoaJuridicaRepository.findAll().size();

        // Create the ClientePessoaJuridica with an existing ID
        clientePessoaJuridica.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restClientePessoaJuridicaMockMvc.perform(post("/api/cliente-pessoa-juridicas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(clientePessoaJuridica)))
            .andExpect(status().isBadRequest());

        // Validate the ClientePessoaJuridica in the database
        List<ClientePessoaJuridica> clientePessoaJuridicaList = clientePessoaJuridicaRepository.findAll();
        assertThat(clientePessoaJuridicaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllClientePessoaJuridicas() throws Exception {
        // Initialize the database
        clientePessoaJuridicaRepository.saveAndFlush(clientePessoaJuridica);

        // Get all the clientePessoaJuridicaList
        restClientePessoaJuridicaMockMvc.perform(get("/api/cliente-pessoa-juridicas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(clientePessoaJuridica.getId().intValue())))
            .andExpect(jsonPath("$.[*].cnpj").value(hasItem(DEFAULT_CNPJ)))
            .andExpect(jsonPath("$.[*].razaoSocial").value(hasItem(DEFAULT_RAZAO_SOCIAL)));
    }
    
    @Test
    @Transactional
    public void getClientePessoaJuridica() throws Exception {
        // Initialize the database
        clientePessoaJuridicaRepository.saveAndFlush(clientePessoaJuridica);

        // Get the clientePessoaJuridica
        restClientePessoaJuridicaMockMvc.perform(get("/api/cliente-pessoa-juridicas/{id}", clientePessoaJuridica.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(clientePessoaJuridica.getId().intValue()))
            .andExpect(jsonPath("$.cnpj").value(DEFAULT_CNPJ))
            .andExpect(jsonPath("$.razaoSocial").value(DEFAULT_RAZAO_SOCIAL));
    }
    @Test
    @Transactional
    public void getNonExistingClientePessoaJuridica() throws Exception {
        // Get the clientePessoaJuridica
        restClientePessoaJuridicaMockMvc.perform(get("/api/cliente-pessoa-juridicas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateClientePessoaJuridica() throws Exception {
        // Initialize the database
        clientePessoaJuridicaRepository.saveAndFlush(clientePessoaJuridica);

        int databaseSizeBeforeUpdate = clientePessoaJuridicaRepository.findAll().size();

        // Update the clientePessoaJuridica
        ClientePessoaJuridica updatedClientePessoaJuridica = clientePessoaJuridicaRepository.findById(clientePessoaJuridica.getId()).get();
        // Disconnect from session so that the updates on updatedClientePessoaJuridica are not directly saved in db
        em.detach(updatedClientePessoaJuridica);
        updatedClientePessoaJuridica
            .cnpj(UPDATED_CNPJ)
            .razaoSocial(UPDATED_RAZAO_SOCIAL);

        restClientePessoaJuridicaMockMvc.perform(put("/api/cliente-pessoa-juridicas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedClientePessoaJuridica)))
            .andExpect(status().isOk());

        // Validate the ClientePessoaJuridica in the database
        List<ClientePessoaJuridica> clientePessoaJuridicaList = clientePessoaJuridicaRepository.findAll();
        assertThat(clientePessoaJuridicaList).hasSize(databaseSizeBeforeUpdate);
        ClientePessoaJuridica testClientePessoaJuridica = clientePessoaJuridicaList.get(clientePessoaJuridicaList.size() - 1);
        assertThat(testClientePessoaJuridica.getCnpj()).isEqualTo(UPDATED_CNPJ);
        assertThat(testClientePessoaJuridica.getRazaoSocial()).isEqualTo(UPDATED_RAZAO_SOCIAL);
    }

    @Test
    @Transactional
    public void updateNonExistingClientePessoaJuridica() throws Exception {
        int databaseSizeBeforeUpdate = clientePessoaJuridicaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restClientePessoaJuridicaMockMvc.perform(put("/api/cliente-pessoa-juridicas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(clientePessoaJuridica)))
            .andExpect(status().isBadRequest());

        // Validate the ClientePessoaJuridica in the database
        List<ClientePessoaJuridica> clientePessoaJuridicaList = clientePessoaJuridicaRepository.findAll();
        assertThat(clientePessoaJuridicaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteClientePessoaJuridica() throws Exception {
        // Initialize the database
        clientePessoaJuridicaRepository.saveAndFlush(clientePessoaJuridica);

        int databaseSizeBeforeDelete = clientePessoaJuridicaRepository.findAll().size();

        // Delete the clientePessoaJuridica
        restClientePessoaJuridicaMockMvc.perform(delete("/api/cliente-pessoa-juridicas/{id}", clientePessoaJuridica.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ClientePessoaJuridica> clientePessoaJuridicaList = clientePessoaJuridicaRepository.findAll();
        assertThat(clientePessoaJuridicaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
