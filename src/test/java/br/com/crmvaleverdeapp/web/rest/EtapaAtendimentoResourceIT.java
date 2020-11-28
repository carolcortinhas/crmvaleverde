package br.com.crmvaleverdeapp.web.rest;

import br.com.crmvaleverdeapp.CrmvaleverdeApp;
import br.com.crmvaleverdeapp.domain.EtapaAtendimento;
import br.com.crmvaleverdeapp.repository.EtapaAtendimentoRepository;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.com.crmvaleverdeapp.domain.enumeration.Situacao;
/**
 * Integration tests for the {@link EtapaAtendimentoResource} REST controller.
 */
@SpringBootTest(classes = CrmvaleverdeApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class EtapaAtendimentoResourceIT {

    private static final LocalDate DEFAULT_DATA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final Situacao DEFAULT_SITUACAO = Situacao.CONTATO;
    private static final Situacao UPDATED_SITUACAO = Situacao.COTACAO;

    @Autowired
    private EtapaAtendimentoRepository etapaAtendimentoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEtapaAtendimentoMockMvc;

    private EtapaAtendimento etapaAtendimento;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EtapaAtendimento createEntity(EntityManager em) {
        EtapaAtendimento etapaAtendimento = new EtapaAtendimento()
            .data(DEFAULT_DATA)
            .descricao(DEFAULT_DESCRICAO)
            .situacao(DEFAULT_SITUACAO);
        return etapaAtendimento;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EtapaAtendimento createUpdatedEntity(EntityManager em) {
        EtapaAtendimento etapaAtendimento = new EtapaAtendimento()
            .data(UPDATED_DATA)
            .descricao(UPDATED_DESCRICAO)
            .situacao(UPDATED_SITUACAO);
        return etapaAtendimento;
    }

    @BeforeEach
    public void initTest() {
        etapaAtendimento = createEntity(em);
    }

    @Test
    @Transactional
    public void createEtapaAtendimento() throws Exception {
        int databaseSizeBeforeCreate = etapaAtendimentoRepository.findAll().size();
        // Create the EtapaAtendimento
        restEtapaAtendimentoMockMvc.perform(post("/api/etapa-atendimentos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(etapaAtendimento)))
            .andExpect(status().isCreated());

        // Validate the EtapaAtendimento in the database
        List<EtapaAtendimento> etapaAtendimentoList = etapaAtendimentoRepository.findAll();
        assertThat(etapaAtendimentoList).hasSize(databaseSizeBeforeCreate + 1);
        EtapaAtendimento testEtapaAtendimento = etapaAtendimentoList.get(etapaAtendimentoList.size() - 1);
        assertThat(testEtapaAtendimento.getData()).isEqualTo(DEFAULT_DATA);
        assertThat(testEtapaAtendimento.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testEtapaAtendimento.getSituacao()).isEqualTo(DEFAULT_SITUACAO);
    }

    @Test
    @Transactional
    public void createEtapaAtendimentoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = etapaAtendimentoRepository.findAll().size();

        // Create the EtapaAtendimento with an existing ID
        etapaAtendimento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEtapaAtendimentoMockMvc.perform(post("/api/etapa-atendimentos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(etapaAtendimento)))
            .andExpect(status().isBadRequest());

        // Validate the EtapaAtendimento in the database
        List<EtapaAtendimento> etapaAtendimentoList = etapaAtendimentoRepository.findAll();
        assertThat(etapaAtendimentoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEtapaAtendimentos() throws Exception {
        // Initialize the database
        etapaAtendimentoRepository.saveAndFlush(etapaAtendimento);

        // Get all the etapaAtendimentoList
        restEtapaAtendimentoMockMvc.perform(get("/api/etapa-atendimentos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(etapaAtendimento.getId().intValue())))
            .andExpect(jsonPath("$.[*].data").value(hasItem(DEFAULT_DATA.toString())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)))
            .andExpect(jsonPath("$.[*].situacao").value(hasItem(DEFAULT_SITUACAO.toString())));
    }
    
    @Test
    @Transactional
    public void getEtapaAtendimento() throws Exception {
        // Initialize the database
        etapaAtendimentoRepository.saveAndFlush(etapaAtendimento);

        // Get the etapaAtendimento
        restEtapaAtendimentoMockMvc.perform(get("/api/etapa-atendimentos/{id}", etapaAtendimento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(etapaAtendimento.getId().intValue()))
            .andExpect(jsonPath("$.data").value(DEFAULT_DATA.toString()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO))
            .andExpect(jsonPath("$.situacao").value(DEFAULT_SITUACAO.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingEtapaAtendimento() throws Exception {
        // Get the etapaAtendimento
        restEtapaAtendimentoMockMvc.perform(get("/api/etapa-atendimentos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEtapaAtendimento() throws Exception {
        // Initialize the database
        etapaAtendimentoRepository.saveAndFlush(etapaAtendimento);

        int databaseSizeBeforeUpdate = etapaAtendimentoRepository.findAll().size();

        // Update the etapaAtendimento
        EtapaAtendimento updatedEtapaAtendimento = etapaAtendimentoRepository.findById(etapaAtendimento.getId()).get();
        // Disconnect from session so that the updates on updatedEtapaAtendimento are not directly saved in db
        em.detach(updatedEtapaAtendimento);
        updatedEtapaAtendimento
            .data(UPDATED_DATA)
            .descricao(UPDATED_DESCRICAO)
            .situacao(UPDATED_SITUACAO);

        restEtapaAtendimentoMockMvc.perform(put("/api/etapa-atendimentos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEtapaAtendimento)))
            .andExpect(status().isOk());

        // Validate the EtapaAtendimento in the database
        List<EtapaAtendimento> etapaAtendimentoList = etapaAtendimentoRepository.findAll();
        assertThat(etapaAtendimentoList).hasSize(databaseSizeBeforeUpdate);
        EtapaAtendimento testEtapaAtendimento = etapaAtendimentoList.get(etapaAtendimentoList.size() - 1);
        assertThat(testEtapaAtendimento.getData()).isEqualTo(UPDATED_DATA);
        assertThat(testEtapaAtendimento.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testEtapaAtendimento.getSituacao()).isEqualTo(UPDATED_SITUACAO);
    }

    @Test
    @Transactional
    public void updateNonExistingEtapaAtendimento() throws Exception {
        int databaseSizeBeforeUpdate = etapaAtendimentoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEtapaAtendimentoMockMvc.perform(put("/api/etapa-atendimentos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(etapaAtendimento)))
            .andExpect(status().isBadRequest());

        // Validate the EtapaAtendimento in the database
        List<EtapaAtendimento> etapaAtendimentoList = etapaAtendimentoRepository.findAll();
        assertThat(etapaAtendimentoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEtapaAtendimento() throws Exception {
        // Initialize the database
        etapaAtendimentoRepository.saveAndFlush(etapaAtendimento);

        int databaseSizeBeforeDelete = etapaAtendimentoRepository.findAll().size();

        // Delete the etapaAtendimento
        restEtapaAtendimentoMockMvc.perform(delete("/api/etapa-atendimentos/{id}", etapaAtendimento.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EtapaAtendimento> etapaAtendimentoList = etapaAtendimentoRepository.findAll();
        assertThat(etapaAtendimentoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
