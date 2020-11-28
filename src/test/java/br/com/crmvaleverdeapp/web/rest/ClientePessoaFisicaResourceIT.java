package br.com.crmvaleverdeapp.web.rest;

import br.com.crmvaleverdeapp.CrmvaleverdeApp;
import br.com.crmvaleverdeapp.domain.ClientePessoaFisica;
import br.com.crmvaleverdeapp.repository.ClientePessoaFisicaRepository;

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
 * Integration tests for the {@link ClientePessoaFisicaResource} REST controller.
 */
@SpringBootTest(classes = CrmvaleverdeApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ClientePessoaFisicaResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    @Autowired
    private ClientePessoaFisicaRepository clientePessoaFisicaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restClientePessoaFisicaMockMvc;

    private ClientePessoaFisica clientePessoaFisica;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ClientePessoaFisica createEntity(EntityManager em) {
        ClientePessoaFisica clientePessoaFisica = new ClientePessoaFisica()
            .nome(DEFAULT_NOME);
        return clientePessoaFisica;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ClientePessoaFisica createUpdatedEntity(EntityManager em) {
        ClientePessoaFisica clientePessoaFisica = new ClientePessoaFisica()
            .nome(UPDATED_NOME);
        return clientePessoaFisica;
    }

    @BeforeEach
    public void initTest() {
        clientePessoaFisica = createEntity(em);
    }

    @Test
    @Transactional
    public void createClientePessoaFisica() throws Exception {
        int databaseSizeBeforeCreate = clientePessoaFisicaRepository.findAll().size();
        // Create the ClientePessoaFisica
        restClientePessoaFisicaMockMvc.perform(post("/api/cliente-pessoa-fisicas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(clientePessoaFisica)))
            .andExpect(status().isCreated());

        // Validate the ClientePessoaFisica in the database
        List<ClientePessoaFisica> clientePessoaFisicaList = clientePessoaFisicaRepository.findAll();
        assertThat(clientePessoaFisicaList).hasSize(databaseSizeBeforeCreate + 1);
        ClientePessoaFisica testClientePessoaFisica = clientePessoaFisicaList.get(clientePessoaFisicaList.size() - 1);
        assertThat(testClientePessoaFisica.getNome()).isEqualTo(DEFAULT_NOME);
    }

    @Test
    @Transactional
    public void createClientePessoaFisicaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = clientePessoaFisicaRepository.findAll().size();

        // Create the ClientePessoaFisica with an existing ID
        clientePessoaFisica.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restClientePessoaFisicaMockMvc.perform(post("/api/cliente-pessoa-fisicas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(clientePessoaFisica)))
            .andExpect(status().isBadRequest());

        // Validate the ClientePessoaFisica in the database
        List<ClientePessoaFisica> clientePessoaFisicaList = clientePessoaFisicaRepository.findAll();
        assertThat(clientePessoaFisicaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllClientePessoaFisicas() throws Exception {
        // Initialize the database
        clientePessoaFisicaRepository.saveAndFlush(clientePessoaFisica);

        // Get all the clientePessoaFisicaList
        restClientePessoaFisicaMockMvc.perform(get("/api/cliente-pessoa-fisicas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(clientePessoaFisica.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)));
    }
    
    @Test
    @Transactional
    public void getClientePessoaFisica() throws Exception {
        // Initialize the database
        clientePessoaFisicaRepository.saveAndFlush(clientePessoaFisica);

        // Get the clientePessoaFisica
        restClientePessoaFisicaMockMvc.perform(get("/api/cliente-pessoa-fisicas/{id}", clientePessoaFisica.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(clientePessoaFisica.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME));
    }
    @Test
    @Transactional
    public void getNonExistingClientePessoaFisica() throws Exception {
        // Get the clientePessoaFisica
        restClientePessoaFisicaMockMvc.perform(get("/api/cliente-pessoa-fisicas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateClientePessoaFisica() throws Exception {
        // Initialize the database
        clientePessoaFisicaRepository.saveAndFlush(clientePessoaFisica);

        int databaseSizeBeforeUpdate = clientePessoaFisicaRepository.findAll().size();

        // Update the clientePessoaFisica
        ClientePessoaFisica updatedClientePessoaFisica = clientePessoaFisicaRepository.findById(clientePessoaFisica.getId()).get();
        // Disconnect from session so that the updates on updatedClientePessoaFisica are not directly saved in db
        em.detach(updatedClientePessoaFisica);
        updatedClientePessoaFisica
            .nome(UPDATED_NOME);

        restClientePessoaFisicaMockMvc.perform(put("/api/cliente-pessoa-fisicas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedClientePessoaFisica)))
            .andExpect(status().isOk());

        // Validate the ClientePessoaFisica in the database
        List<ClientePessoaFisica> clientePessoaFisicaList = clientePessoaFisicaRepository.findAll();
        assertThat(clientePessoaFisicaList).hasSize(databaseSizeBeforeUpdate);
        ClientePessoaFisica testClientePessoaFisica = clientePessoaFisicaList.get(clientePessoaFisicaList.size() - 1);
        assertThat(testClientePessoaFisica.getNome()).isEqualTo(UPDATED_NOME);
    }

    @Test
    @Transactional
    public void updateNonExistingClientePessoaFisica() throws Exception {
        int databaseSizeBeforeUpdate = clientePessoaFisicaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restClientePessoaFisicaMockMvc.perform(put("/api/cliente-pessoa-fisicas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(clientePessoaFisica)))
            .andExpect(status().isBadRequest());

        // Validate the ClientePessoaFisica in the database
        List<ClientePessoaFisica> clientePessoaFisicaList = clientePessoaFisicaRepository.findAll();
        assertThat(clientePessoaFisicaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteClientePessoaFisica() throws Exception {
        // Initialize the database
        clientePessoaFisicaRepository.saveAndFlush(clientePessoaFisica);

        int databaseSizeBeforeDelete = clientePessoaFisicaRepository.findAll().size();

        // Delete the clientePessoaFisica
        restClientePessoaFisicaMockMvc.perform(delete("/api/cliente-pessoa-fisicas/{id}", clientePessoaFisica.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ClientePessoaFisica> clientePessoaFisicaList = clientePessoaFisicaRepository.findAll();
        assertThat(clientePessoaFisicaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
