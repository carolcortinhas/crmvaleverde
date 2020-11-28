package br.com.crmvaleverdeapp.web.rest;

import br.com.crmvaleverdeapp.CrmvaleverdeApp;
import br.com.crmvaleverdeapp.domain.AvaliacaoAtendimento;
import br.com.crmvaleverdeapp.repository.AvaliacaoAtendimentoRepository;

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
 * Integration tests for the {@link AvaliacaoAtendimentoResource} REST controller.
 */
@SpringBootTest(classes = CrmvaleverdeApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class AvaliacaoAtendimentoResourceIT {

    @Autowired
    private AvaliacaoAtendimentoRepository avaliacaoAtendimentoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAvaliacaoAtendimentoMockMvc;

    private AvaliacaoAtendimento avaliacaoAtendimento;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AvaliacaoAtendimento createEntity(EntityManager em) {
        AvaliacaoAtendimento avaliacaoAtendimento = new AvaliacaoAtendimento();
        return avaliacaoAtendimento;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AvaliacaoAtendimento createUpdatedEntity(EntityManager em) {
        AvaliacaoAtendimento avaliacaoAtendimento = new AvaliacaoAtendimento();
        return avaliacaoAtendimento;
    }

    @BeforeEach
    public void initTest() {
        avaliacaoAtendimento = createEntity(em);
    }

    @Test
    @Transactional
    public void createAvaliacaoAtendimento() throws Exception {
        int databaseSizeBeforeCreate = avaliacaoAtendimentoRepository.findAll().size();
        // Create the AvaliacaoAtendimento
        restAvaliacaoAtendimentoMockMvc.perform(post("/api/avaliacao-atendimentos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(avaliacaoAtendimento)))
            .andExpect(status().isCreated());

        // Validate the AvaliacaoAtendimento in the database
        List<AvaliacaoAtendimento> avaliacaoAtendimentoList = avaliacaoAtendimentoRepository.findAll();
        assertThat(avaliacaoAtendimentoList).hasSize(databaseSizeBeforeCreate + 1);
        AvaliacaoAtendimento testAvaliacaoAtendimento = avaliacaoAtendimentoList.get(avaliacaoAtendimentoList.size() - 1);
    }

    @Test
    @Transactional
    public void createAvaliacaoAtendimentoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = avaliacaoAtendimentoRepository.findAll().size();

        // Create the AvaliacaoAtendimento with an existing ID
        avaliacaoAtendimento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAvaliacaoAtendimentoMockMvc.perform(post("/api/avaliacao-atendimentos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(avaliacaoAtendimento)))
            .andExpect(status().isBadRequest());

        // Validate the AvaliacaoAtendimento in the database
        List<AvaliacaoAtendimento> avaliacaoAtendimentoList = avaliacaoAtendimentoRepository.findAll();
        assertThat(avaliacaoAtendimentoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAvaliacaoAtendimentos() throws Exception {
        // Initialize the database
        avaliacaoAtendimentoRepository.saveAndFlush(avaliacaoAtendimento);

        // Get all the avaliacaoAtendimentoList
        restAvaliacaoAtendimentoMockMvc.perform(get("/api/avaliacao-atendimentos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(avaliacaoAtendimento.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getAvaliacaoAtendimento() throws Exception {
        // Initialize the database
        avaliacaoAtendimentoRepository.saveAndFlush(avaliacaoAtendimento);

        // Get the avaliacaoAtendimento
        restAvaliacaoAtendimentoMockMvc.perform(get("/api/avaliacao-atendimentos/{id}", avaliacaoAtendimento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(avaliacaoAtendimento.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingAvaliacaoAtendimento() throws Exception {
        // Get the avaliacaoAtendimento
        restAvaliacaoAtendimentoMockMvc.perform(get("/api/avaliacao-atendimentos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAvaliacaoAtendimento() throws Exception {
        // Initialize the database
        avaliacaoAtendimentoRepository.saveAndFlush(avaliacaoAtendimento);

        int databaseSizeBeforeUpdate = avaliacaoAtendimentoRepository.findAll().size();

        // Update the avaliacaoAtendimento
        AvaliacaoAtendimento updatedAvaliacaoAtendimento = avaliacaoAtendimentoRepository.findById(avaliacaoAtendimento.getId()).get();
        // Disconnect from session so that the updates on updatedAvaliacaoAtendimento are not directly saved in db
        em.detach(updatedAvaliacaoAtendimento);

        restAvaliacaoAtendimentoMockMvc.perform(put("/api/avaliacao-atendimentos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAvaliacaoAtendimento)))
            .andExpect(status().isOk());

        // Validate the AvaliacaoAtendimento in the database
        List<AvaliacaoAtendimento> avaliacaoAtendimentoList = avaliacaoAtendimentoRepository.findAll();
        assertThat(avaliacaoAtendimentoList).hasSize(databaseSizeBeforeUpdate);
        AvaliacaoAtendimento testAvaliacaoAtendimento = avaliacaoAtendimentoList.get(avaliacaoAtendimentoList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingAvaliacaoAtendimento() throws Exception {
        int databaseSizeBeforeUpdate = avaliacaoAtendimentoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAvaliacaoAtendimentoMockMvc.perform(put("/api/avaliacao-atendimentos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(avaliacaoAtendimento)))
            .andExpect(status().isBadRequest());

        // Validate the AvaliacaoAtendimento in the database
        List<AvaliacaoAtendimento> avaliacaoAtendimentoList = avaliacaoAtendimentoRepository.findAll();
        assertThat(avaliacaoAtendimentoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAvaliacaoAtendimento() throws Exception {
        // Initialize the database
        avaliacaoAtendimentoRepository.saveAndFlush(avaliacaoAtendimento);

        int databaseSizeBeforeDelete = avaliacaoAtendimentoRepository.findAll().size();

        // Delete the avaliacaoAtendimento
        restAvaliacaoAtendimentoMockMvc.perform(delete("/api/avaliacao-atendimentos/{id}", avaliacaoAtendimento.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AvaliacaoAtendimento> avaliacaoAtendimentoList = avaliacaoAtendimentoRepository.findAll();
        assertThat(avaliacaoAtendimentoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
