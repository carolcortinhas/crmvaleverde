package br.com.crmvaleverdeapp.web.rest;

import br.com.crmvaleverdeapp.CrmvaleverdeApp;
import br.com.crmvaleverdeapp.domain.Oportunidade;
import br.com.crmvaleverdeapp.repository.OportunidadeRepository;

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

/**
 * Integration tests for the {@link OportunidadeResource} REST controller.
 */
@SpringBootTest(classes = CrmvaleverdeApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class OportunidadeResourceIT {

    private static final String DEFAULT_NOME_CLIENTE = "AAAAAAAAAA";
    private static final String UPDATED_NOME_CLIENTE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private OportunidadeRepository oportunidadeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOportunidadeMockMvc;

    private Oportunidade oportunidade;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Oportunidade createEntity(EntityManager em) {
        Oportunidade oportunidade = new Oportunidade()
            .nomeCliente(DEFAULT_NOME_CLIENTE)
            .descricao(DEFAULT_DESCRICAO)
            .data(DEFAULT_DATA);
        return oportunidade;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Oportunidade createUpdatedEntity(EntityManager em) {
        Oportunidade oportunidade = new Oportunidade()
            .nomeCliente(UPDATED_NOME_CLIENTE)
            .descricao(UPDATED_DESCRICAO)
            .data(UPDATED_DATA);
        return oportunidade;
    }

    @BeforeEach
    public void initTest() {
        oportunidade = createEntity(em);
    }

    @Test
    @Transactional
    public void createOportunidade() throws Exception {
        int databaseSizeBeforeCreate = oportunidadeRepository.findAll().size();
        // Create the Oportunidade
        restOportunidadeMockMvc.perform(post("/api/oportunidades").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(oportunidade)))
            .andExpect(status().isCreated());

        // Validate the Oportunidade in the database
        List<Oportunidade> oportunidadeList = oportunidadeRepository.findAll();
        assertThat(oportunidadeList).hasSize(databaseSizeBeforeCreate + 1);
        Oportunidade testOportunidade = oportunidadeList.get(oportunidadeList.size() - 1);
        assertThat(testOportunidade.getNomeCliente()).isEqualTo(DEFAULT_NOME_CLIENTE);
        assertThat(testOportunidade.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testOportunidade.getData()).isEqualTo(DEFAULT_DATA);
    }

    @Test
    @Transactional
    public void createOportunidadeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = oportunidadeRepository.findAll().size();

        // Create the Oportunidade with an existing ID
        oportunidade.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOportunidadeMockMvc.perform(post("/api/oportunidades").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(oportunidade)))
            .andExpect(status().isBadRequest());

        // Validate the Oportunidade in the database
        List<Oportunidade> oportunidadeList = oportunidadeRepository.findAll();
        assertThat(oportunidadeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllOportunidades() throws Exception {
        // Initialize the database
        oportunidadeRepository.saveAndFlush(oportunidade);

        // Get all the oportunidadeList
        restOportunidadeMockMvc.perform(get("/api/oportunidades?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(oportunidade.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomeCliente").value(hasItem(DEFAULT_NOME_CLIENTE)))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)))
            .andExpect(jsonPath("$.[*].data").value(hasItem(DEFAULT_DATA.toString())));
    }
    
    @Test
    @Transactional
    public void getOportunidade() throws Exception {
        // Initialize the database
        oportunidadeRepository.saveAndFlush(oportunidade);

        // Get the oportunidade
        restOportunidadeMockMvc.perform(get("/api/oportunidades/{id}", oportunidade.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(oportunidade.getId().intValue()))
            .andExpect(jsonPath("$.nomeCliente").value(DEFAULT_NOME_CLIENTE))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO))
            .andExpect(jsonPath("$.data").value(DEFAULT_DATA.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingOportunidade() throws Exception {
        // Get the oportunidade
        restOportunidadeMockMvc.perform(get("/api/oportunidades/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOportunidade() throws Exception {
        // Initialize the database
        oportunidadeRepository.saveAndFlush(oportunidade);

        int databaseSizeBeforeUpdate = oportunidadeRepository.findAll().size();

        // Update the oportunidade
        Oportunidade updatedOportunidade = oportunidadeRepository.findById(oportunidade.getId()).get();
        // Disconnect from session so that the updates on updatedOportunidade are not directly saved in db
        em.detach(updatedOportunidade);
        updatedOportunidade
            .nomeCliente(UPDATED_NOME_CLIENTE)
            .descricao(UPDATED_DESCRICAO)
            .data(UPDATED_DATA);

        restOportunidadeMockMvc.perform(put("/api/oportunidades").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedOportunidade)))
            .andExpect(status().isOk());

        // Validate the Oportunidade in the database
        List<Oportunidade> oportunidadeList = oportunidadeRepository.findAll();
        assertThat(oportunidadeList).hasSize(databaseSizeBeforeUpdate);
        Oportunidade testOportunidade = oportunidadeList.get(oportunidadeList.size() - 1);
        assertThat(testOportunidade.getNomeCliente()).isEqualTo(UPDATED_NOME_CLIENTE);
        assertThat(testOportunidade.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testOportunidade.getData()).isEqualTo(UPDATED_DATA);
    }

    @Test
    @Transactional
    public void updateNonExistingOportunidade() throws Exception {
        int databaseSizeBeforeUpdate = oportunidadeRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOportunidadeMockMvc.perform(put("/api/oportunidades").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(oportunidade)))
            .andExpect(status().isBadRequest());

        // Validate the Oportunidade in the database
        List<Oportunidade> oportunidadeList = oportunidadeRepository.findAll();
        assertThat(oportunidadeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOportunidade() throws Exception {
        // Initialize the database
        oportunidadeRepository.saveAndFlush(oportunidade);

        int databaseSizeBeforeDelete = oportunidadeRepository.findAll().size();

        // Delete the oportunidade
        restOportunidadeMockMvc.perform(delete("/api/oportunidades/{id}", oportunidade.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Oportunidade> oportunidadeList = oportunidadeRepository.findAll();
        assertThat(oportunidadeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
