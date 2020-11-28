package br.com.crmvaleverdeapp.web.rest;

import br.com.crmvaleverdeapp.CrmvaleverdeApp;
import br.com.crmvaleverdeapp.domain.Consultor;
import br.com.crmvaleverdeapp.repository.ConsultorRepository;

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
 * Integration tests for the {@link ConsultorResource} REST controller.
 */
@SpringBootTest(classes = CrmvaleverdeApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ConsultorResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    @Autowired
    private ConsultorRepository consultorRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restConsultorMockMvc;

    private Consultor consultor;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Consultor createEntity(EntityManager em) {
        Consultor consultor = new Consultor()
            .nome(DEFAULT_NOME);
        return consultor;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Consultor createUpdatedEntity(EntityManager em) {
        Consultor consultor = new Consultor()
            .nome(UPDATED_NOME);
        return consultor;
    }

    @BeforeEach
    public void initTest() {
        consultor = createEntity(em);
    }

    @Test
    @Transactional
    public void createConsultor() throws Exception {
        int databaseSizeBeforeCreate = consultorRepository.findAll().size();
        // Create the Consultor
        restConsultorMockMvc.perform(post("/api/consultors").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(consultor)))
            .andExpect(status().isCreated());

        // Validate the Consultor in the database
        List<Consultor> consultorList = consultorRepository.findAll();
        assertThat(consultorList).hasSize(databaseSizeBeforeCreate + 1);
        Consultor testConsultor = consultorList.get(consultorList.size() - 1);
        assertThat(testConsultor.getNome()).isEqualTo(DEFAULT_NOME);
    }

    @Test
    @Transactional
    public void createConsultorWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = consultorRepository.findAll().size();

        // Create the Consultor with an existing ID
        consultor.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restConsultorMockMvc.perform(post("/api/consultors").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(consultor)))
            .andExpect(status().isBadRequest());

        // Validate the Consultor in the database
        List<Consultor> consultorList = consultorRepository.findAll();
        assertThat(consultorList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllConsultors() throws Exception {
        // Initialize the database
        consultorRepository.saveAndFlush(consultor);

        // Get all the consultorList
        restConsultorMockMvc.perform(get("/api/consultors?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(consultor.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)));
    }
    
    @Test
    @Transactional
    public void getConsultor() throws Exception {
        // Initialize the database
        consultorRepository.saveAndFlush(consultor);

        // Get the consultor
        restConsultorMockMvc.perform(get("/api/consultors/{id}", consultor.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(consultor.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME));
    }
    @Test
    @Transactional
    public void getNonExistingConsultor() throws Exception {
        // Get the consultor
        restConsultorMockMvc.perform(get("/api/consultors/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateConsultor() throws Exception {
        // Initialize the database
        consultorRepository.saveAndFlush(consultor);

        int databaseSizeBeforeUpdate = consultorRepository.findAll().size();

        // Update the consultor
        Consultor updatedConsultor = consultorRepository.findById(consultor.getId()).get();
        // Disconnect from session so that the updates on updatedConsultor are not directly saved in db
        em.detach(updatedConsultor);
        updatedConsultor
            .nome(UPDATED_NOME);

        restConsultorMockMvc.perform(put("/api/consultors").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedConsultor)))
            .andExpect(status().isOk());

        // Validate the Consultor in the database
        List<Consultor> consultorList = consultorRepository.findAll();
        assertThat(consultorList).hasSize(databaseSizeBeforeUpdate);
        Consultor testConsultor = consultorList.get(consultorList.size() - 1);
        assertThat(testConsultor.getNome()).isEqualTo(UPDATED_NOME);
    }

    @Test
    @Transactional
    public void updateNonExistingConsultor() throws Exception {
        int databaseSizeBeforeUpdate = consultorRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConsultorMockMvc.perform(put("/api/consultors").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(consultor)))
            .andExpect(status().isBadRequest());

        // Validate the Consultor in the database
        List<Consultor> consultorList = consultorRepository.findAll();
        assertThat(consultorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteConsultor() throws Exception {
        // Initialize the database
        consultorRepository.saveAndFlush(consultor);

        int databaseSizeBeforeDelete = consultorRepository.findAll().size();

        // Delete the consultor
        restConsultorMockMvc.perform(delete("/api/consultors/{id}", consultor.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Consultor> consultorList = consultorRepository.findAll();
        assertThat(consultorList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
