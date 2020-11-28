package br.com.crmvaleverdeapp.web.rest;

import br.com.crmvaleverdeapp.CrmvaleverdeApp;
import br.com.crmvaleverdeapp.domain.RepresentantePJ;
import br.com.crmvaleverdeapp.repository.RepresentantePJRepository;

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
 * Integration tests for the {@link RepresentantePJResource} REST controller.
 */
@SpringBootTest(classes = CrmvaleverdeApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class RepresentantePJResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    @Autowired
    private RepresentantePJRepository representantePJRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restRepresentantePJMockMvc;

    private RepresentantePJ representantePJ;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RepresentantePJ createEntity(EntityManager em) {
        RepresentantePJ representantePJ = new RepresentantePJ()
            .nome(DEFAULT_NOME);
        return representantePJ;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static RepresentantePJ createUpdatedEntity(EntityManager em) {
        RepresentantePJ representantePJ = new RepresentantePJ()
            .nome(UPDATED_NOME);
        return representantePJ;
    }

    @BeforeEach
    public void initTest() {
        representantePJ = createEntity(em);
    }

    @Test
    @Transactional
    public void createRepresentantePJ() throws Exception {
        int databaseSizeBeforeCreate = representantePJRepository.findAll().size();
        // Create the RepresentantePJ
        restRepresentantePJMockMvc.perform(post("/api/representante-pjs").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(representantePJ)))
            .andExpect(status().isCreated());

        // Validate the RepresentantePJ in the database
        List<RepresentantePJ> representantePJList = representantePJRepository.findAll();
        assertThat(representantePJList).hasSize(databaseSizeBeforeCreate + 1);
        RepresentantePJ testRepresentantePJ = representantePJList.get(representantePJList.size() - 1);
        assertThat(testRepresentantePJ.getNome()).isEqualTo(DEFAULT_NOME);
    }

    @Test
    @Transactional
    public void createRepresentantePJWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = representantePJRepository.findAll().size();

        // Create the RepresentantePJ with an existing ID
        representantePJ.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRepresentantePJMockMvc.perform(post("/api/representante-pjs").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(representantePJ)))
            .andExpect(status().isBadRequest());

        // Validate the RepresentantePJ in the database
        List<RepresentantePJ> representantePJList = representantePJRepository.findAll();
        assertThat(representantePJList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllRepresentantePJS() throws Exception {
        // Initialize the database
        representantePJRepository.saveAndFlush(representantePJ);

        // Get all the representantePJList
        restRepresentantePJMockMvc.perform(get("/api/representante-pjs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(representantePJ.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)));
    }
    
    @Test
    @Transactional
    public void getRepresentantePJ() throws Exception {
        // Initialize the database
        representantePJRepository.saveAndFlush(representantePJ);

        // Get the representantePJ
        restRepresentantePJMockMvc.perform(get("/api/representante-pjs/{id}", representantePJ.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(representantePJ.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME));
    }
    @Test
    @Transactional
    public void getNonExistingRepresentantePJ() throws Exception {
        // Get the representantePJ
        restRepresentantePJMockMvc.perform(get("/api/representante-pjs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRepresentantePJ() throws Exception {
        // Initialize the database
        representantePJRepository.saveAndFlush(representantePJ);

        int databaseSizeBeforeUpdate = representantePJRepository.findAll().size();

        // Update the representantePJ
        RepresentantePJ updatedRepresentantePJ = representantePJRepository.findById(representantePJ.getId()).get();
        // Disconnect from session so that the updates on updatedRepresentantePJ are not directly saved in db
        em.detach(updatedRepresentantePJ);
        updatedRepresentantePJ
            .nome(UPDATED_NOME);

        restRepresentantePJMockMvc.perform(put("/api/representante-pjs").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedRepresentantePJ)))
            .andExpect(status().isOk());

        // Validate the RepresentantePJ in the database
        List<RepresentantePJ> representantePJList = representantePJRepository.findAll();
        assertThat(representantePJList).hasSize(databaseSizeBeforeUpdate);
        RepresentantePJ testRepresentantePJ = representantePJList.get(representantePJList.size() - 1);
        assertThat(testRepresentantePJ.getNome()).isEqualTo(UPDATED_NOME);
    }

    @Test
    @Transactional
    public void updateNonExistingRepresentantePJ() throws Exception {
        int databaseSizeBeforeUpdate = representantePJRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRepresentantePJMockMvc.perform(put("/api/representante-pjs").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(representantePJ)))
            .andExpect(status().isBadRequest());

        // Validate the RepresentantePJ in the database
        List<RepresentantePJ> representantePJList = representantePJRepository.findAll();
        assertThat(representantePJList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRepresentantePJ() throws Exception {
        // Initialize the database
        representantePJRepository.saveAndFlush(representantePJ);

        int databaseSizeBeforeDelete = representantePJRepository.findAll().size();

        // Delete the representantePJ
        restRepresentantePJMockMvc.perform(delete("/api/representante-pjs/{id}", representantePJ.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<RepresentantePJ> representantePJList = representantePJRepository.findAll();
        assertThat(representantePJList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
