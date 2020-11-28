package br.com.crmvaleverdeapp.web.rest;

import br.com.crmvaleverdeapp.CrmvaleverdeApp;
import br.com.crmvaleverdeapp.domain.Gerente;
import br.com.crmvaleverdeapp.repository.GerenteRepository;

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
 * Integration tests for the {@link GerenteResource} REST controller.
 */
@SpringBootTest(classes = CrmvaleverdeApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class GerenteResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    @Autowired
    private GerenteRepository gerenteRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restGerenteMockMvc;

    private Gerente gerente;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Gerente createEntity(EntityManager em) {
        Gerente gerente = new Gerente()
            .nome(DEFAULT_NOME);
        return gerente;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Gerente createUpdatedEntity(EntityManager em) {
        Gerente gerente = new Gerente()
            .nome(UPDATED_NOME);
        return gerente;
    }

    @BeforeEach
    public void initTest() {
        gerente = createEntity(em);
    }

    @Test
    @Transactional
    public void createGerente() throws Exception {
        int databaseSizeBeforeCreate = gerenteRepository.findAll().size();
        // Create the Gerente
        restGerenteMockMvc.perform(post("/api/gerentes").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gerente)))
            .andExpect(status().isCreated());

        // Validate the Gerente in the database
        List<Gerente> gerenteList = gerenteRepository.findAll();
        assertThat(gerenteList).hasSize(databaseSizeBeforeCreate + 1);
        Gerente testGerente = gerenteList.get(gerenteList.size() - 1);
        assertThat(testGerente.getNome()).isEqualTo(DEFAULT_NOME);
    }

    @Test
    @Transactional
    public void createGerenteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gerenteRepository.findAll().size();

        // Create the Gerente with an existing ID
        gerente.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGerenteMockMvc.perform(post("/api/gerentes").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gerente)))
            .andExpect(status().isBadRequest());

        // Validate the Gerente in the database
        List<Gerente> gerenteList = gerenteRepository.findAll();
        assertThat(gerenteList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllGerentes() throws Exception {
        // Initialize the database
        gerenteRepository.saveAndFlush(gerente);

        // Get all the gerenteList
        restGerenteMockMvc.perform(get("/api/gerentes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gerente.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)));
    }
    
    @Test
    @Transactional
    public void getGerente() throws Exception {
        // Initialize the database
        gerenteRepository.saveAndFlush(gerente);

        // Get the gerente
        restGerenteMockMvc.perform(get("/api/gerentes/{id}", gerente.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(gerente.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME));
    }
    @Test
    @Transactional
    public void getNonExistingGerente() throws Exception {
        // Get the gerente
        restGerenteMockMvc.perform(get("/api/gerentes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGerente() throws Exception {
        // Initialize the database
        gerenteRepository.saveAndFlush(gerente);

        int databaseSizeBeforeUpdate = gerenteRepository.findAll().size();

        // Update the gerente
        Gerente updatedGerente = gerenteRepository.findById(gerente.getId()).get();
        // Disconnect from session so that the updates on updatedGerente are not directly saved in db
        em.detach(updatedGerente);
        updatedGerente
            .nome(UPDATED_NOME);

        restGerenteMockMvc.perform(put("/api/gerentes").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedGerente)))
            .andExpect(status().isOk());

        // Validate the Gerente in the database
        List<Gerente> gerenteList = gerenteRepository.findAll();
        assertThat(gerenteList).hasSize(databaseSizeBeforeUpdate);
        Gerente testGerente = gerenteList.get(gerenteList.size() - 1);
        assertThat(testGerente.getNome()).isEqualTo(UPDATED_NOME);
    }

    @Test
    @Transactional
    public void updateNonExistingGerente() throws Exception {
        int databaseSizeBeforeUpdate = gerenteRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGerenteMockMvc.perform(put("/api/gerentes").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(gerente)))
            .andExpect(status().isBadRequest());

        // Validate the Gerente in the database
        List<Gerente> gerenteList = gerenteRepository.findAll();
        assertThat(gerenteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGerente() throws Exception {
        // Initialize the database
        gerenteRepository.saveAndFlush(gerente);

        int databaseSizeBeforeDelete = gerenteRepository.findAll().size();

        // Delete the gerente
        restGerenteMockMvc.perform(delete("/api/gerentes/{id}", gerente.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Gerente> gerenteList = gerenteRepository.findAll();
        assertThat(gerenteList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
