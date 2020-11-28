package br.com.crmvaleverdeapp.web.rest;

import br.com.crmvaleverdeapp.CrmvaleverdeApp;
import br.com.crmvaleverdeapp.domain.Atendimento;
import br.com.crmvaleverdeapp.repository.AtendimentoRepository;

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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.com.crmvaleverdeapp.domain.enumeration.Tarefa;
/**
 * Integration tests for the {@link AtendimentoResource} REST controller.
 */
@SpringBootTest(classes = CrmvaleverdeApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class AtendimentoResourceIT {

    private static final Long DEFAULT_VALOR_TOTAL = 1L;
    private static final Long UPDATED_VALOR_TOTAL = 2L;

    private static final Instant DEFAULT_DATA_INICIO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_INICIO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DATA_FIM = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_FIM = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_PRIVACIDADE = "AAAAAAAAAA";
    private static final String UPDATED_PRIVACIDADE = "BBBBBBBBBB";

    private static final Tarefa DEFAULT_TAREFA = Tarefa.EMAIL;
    private static final Tarefa UPDATED_TAREFA = Tarefa.TELEFONE;

    @Autowired
    private AtendimentoRepository atendimentoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAtendimentoMockMvc;

    private Atendimento atendimento;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Atendimento createEntity(EntityManager em) {
        Atendimento atendimento = new Atendimento()
            .valorTotal(DEFAULT_VALOR_TOTAL)
            .dataInicio(DEFAULT_DATA_INICIO)
            .dataFim(DEFAULT_DATA_FIM)
            .privacidade(DEFAULT_PRIVACIDADE)
            .tarefa(DEFAULT_TAREFA);
        return atendimento;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Atendimento createUpdatedEntity(EntityManager em) {
        Atendimento atendimento = new Atendimento()
            .valorTotal(UPDATED_VALOR_TOTAL)
            .dataInicio(UPDATED_DATA_INICIO)
            .dataFim(UPDATED_DATA_FIM)
            .privacidade(UPDATED_PRIVACIDADE)
            .tarefa(UPDATED_TAREFA);
        return atendimento;
    }

    @BeforeEach
    public void initTest() {
        atendimento = createEntity(em);
    }

    @Test
    @Transactional
    public void createAtendimento() throws Exception {
        int databaseSizeBeforeCreate = atendimentoRepository.findAll().size();
        // Create the Atendimento
        restAtendimentoMockMvc.perform(post("/api/atendimentos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(atendimento)))
            .andExpect(status().isCreated());

        // Validate the Atendimento in the database
        List<Atendimento> atendimentoList = atendimentoRepository.findAll();
        assertThat(atendimentoList).hasSize(databaseSizeBeforeCreate + 1);
        Atendimento testAtendimento = atendimentoList.get(atendimentoList.size() - 1);
        assertThat(testAtendimento.getValorTotal()).isEqualTo(DEFAULT_VALOR_TOTAL);
        assertThat(testAtendimento.getDataInicio()).isEqualTo(DEFAULT_DATA_INICIO);
        assertThat(testAtendimento.getDataFim()).isEqualTo(DEFAULT_DATA_FIM);
        assertThat(testAtendimento.getPrivacidade()).isEqualTo(DEFAULT_PRIVACIDADE);
        assertThat(testAtendimento.getTarefa()).isEqualTo(DEFAULT_TAREFA);
    }

    @Test
    @Transactional
    public void createAtendimentoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = atendimentoRepository.findAll().size();

        // Create the Atendimento with an existing ID
        atendimento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAtendimentoMockMvc.perform(post("/api/atendimentos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(atendimento)))
            .andExpect(status().isBadRequest());

        // Validate the Atendimento in the database
        List<Atendimento> atendimentoList = atendimentoRepository.findAll();
        assertThat(atendimentoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAtendimentos() throws Exception {
        // Initialize the database
        atendimentoRepository.saveAndFlush(atendimento);

        // Get all the atendimentoList
        restAtendimentoMockMvc.perform(get("/api/atendimentos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(atendimento.getId().intValue())))
            .andExpect(jsonPath("$.[*].valorTotal").value(hasItem(DEFAULT_VALOR_TOTAL.intValue())))
            .andExpect(jsonPath("$.[*].dataInicio").value(hasItem(DEFAULT_DATA_INICIO.toString())))
            .andExpect(jsonPath("$.[*].dataFim").value(hasItem(DEFAULT_DATA_FIM.toString())))
            .andExpect(jsonPath("$.[*].privacidade").value(hasItem(DEFAULT_PRIVACIDADE)))
            .andExpect(jsonPath("$.[*].tarefa").value(hasItem(DEFAULT_TAREFA.toString())));
    }
    
    @Test
    @Transactional
    public void getAtendimento() throws Exception {
        // Initialize the database
        atendimentoRepository.saveAndFlush(atendimento);

        // Get the atendimento
        restAtendimentoMockMvc.perform(get("/api/atendimentos/{id}", atendimento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(atendimento.getId().intValue()))
            .andExpect(jsonPath("$.valorTotal").value(DEFAULT_VALOR_TOTAL.intValue()))
            .andExpect(jsonPath("$.dataInicio").value(DEFAULT_DATA_INICIO.toString()))
            .andExpect(jsonPath("$.dataFim").value(DEFAULT_DATA_FIM.toString()))
            .andExpect(jsonPath("$.privacidade").value(DEFAULT_PRIVACIDADE))
            .andExpect(jsonPath("$.tarefa").value(DEFAULT_TAREFA.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingAtendimento() throws Exception {
        // Get the atendimento
        restAtendimentoMockMvc.perform(get("/api/atendimentos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAtendimento() throws Exception {
        // Initialize the database
        atendimentoRepository.saveAndFlush(atendimento);

        int databaseSizeBeforeUpdate = atendimentoRepository.findAll().size();

        // Update the atendimento
        Atendimento updatedAtendimento = atendimentoRepository.findById(atendimento.getId()).get();
        // Disconnect from session so that the updates on updatedAtendimento are not directly saved in db
        em.detach(updatedAtendimento);
        updatedAtendimento
            .valorTotal(UPDATED_VALOR_TOTAL)
            .dataInicio(UPDATED_DATA_INICIO)
            .dataFim(UPDATED_DATA_FIM)
            .privacidade(UPDATED_PRIVACIDADE)
            .tarefa(UPDATED_TAREFA);

        restAtendimentoMockMvc.perform(put("/api/atendimentos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAtendimento)))
            .andExpect(status().isOk());

        // Validate the Atendimento in the database
        List<Atendimento> atendimentoList = atendimentoRepository.findAll();
        assertThat(atendimentoList).hasSize(databaseSizeBeforeUpdate);
        Atendimento testAtendimento = atendimentoList.get(atendimentoList.size() - 1);
        assertThat(testAtendimento.getValorTotal()).isEqualTo(UPDATED_VALOR_TOTAL);
        assertThat(testAtendimento.getDataInicio()).isEqualTo(UPDATED_DATA_INICIO);
        assertThat(testAtendimento.getDataFim()).isEqualTo(UPDATED_DATA_FIM);
        assertThat(testAtendimento.getPrivacidade()).isEqualTo(UPDATED_PRIVACIDADE);
        assertThat(testAtendimento.getTarefa()).isEqualTo(UPDATED_TAREFA);
    }

    @Test
    @Transactional
    public void updateNonExistingAtendimento() throws Exception {
        int databaseSizeBeforeUpdate = atendimentoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAtendimentoMockMvc.perform(put("/api/atendimentos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(atendimento)))
            .andExpect(status().isBadRequest());

        // Validate the Atendimento in the database
        List<Atendimento> atendimentoList = atendimentoRepository.findAll();
        assertThat(atendimentoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAtendimento() throws Exception {
        // Initialize the database
        atendimentoRepository.saveAndFlush(atendimento);

        int databaseSizeBeforeDelete = atendimentoRepository.findAll().size();

        // Delete the atendimento
        restAtendimentoMockMvc.perform(delete("/api/atendimentos/{id}", atendimento.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Atendimento> atendimentoList = atendimentoRepository.findAll();
        assertThat(atendimentoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
