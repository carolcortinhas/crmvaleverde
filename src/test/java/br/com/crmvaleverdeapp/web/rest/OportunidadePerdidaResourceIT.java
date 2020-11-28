package br.com.crmvaleverdeapp.web.rest;

import br.com.crmvaleverdeapp.CrmvaleverdeApp;
import br.com.crmvaleverdeapp.domain.OportunidadePerdida;
import br.com.crmvaleverdeapp.repository.OportunidadePerdidaRepository;

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
 * Integration tests for the {@link OportunidadePerdidaResource} REST controller.
 */
@SpringBootTest(classes = CrmvaleverdeApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class OportunidadePerdidaResourceIT {

    private static final String DEFAULT_DESCRICAO_PERDA = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO_PERDA = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private OportunidadePerdidaRepository oportunidadePerdidaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOportunidadePerdidaMockMvc;

    private OportunidadePerdida oportunidadePerdida;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OportunidadePerdida createEntity(EntityManager em) {
        OportunidadePerdida oportunidadePerdida = new OportunidadePerdida()
            .descricaoPerda(DEFAULT_DESCRICAO_PERDA)
            .date(DEFAULT_DATE);
        return oportunidadePerdida;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OportunidadePerdida createUpdatedEntity(EntityManager em) {
        OportunidadePerdida oportunidadePerdida = new OportunidadePerdida()
            .descricaoPerda(UPDATED_DESCRICAO_PERDA)
            .date(UPDATED_DATE);
        return oportunidadePerdida;
    }

    @BeforeEach
    public void initTest() {
        oportunidadePerdida = createEntity(em);
    }

    @Test
    @Transactional
    public void createOportunidadePerdida() throws Exception {
        int databaseSizeBeforeCreate = oportunidadePerdidaRepository.findAll().size();
        // Create the OportunidadePerdida
        restOportunidadePerdidaMockMvc.perform(post("/api/oportunidade-perdidas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(oportunidadePerdida)))
            .andExpect(status().isCreated());

        // Validate the OportunidadePerdida in the database
        List<OportunidadePerdida> oportunidadePerdidaList = oportunidadePerdidaRepository.findAll();
        assertThat(oportunidadePerdidaList).hasSize(databaseSizeBeforeCreate + 1);
        OportunidadePerdida testOportunidadePerdida = oportunidadePerdidaList.get(oportunidadePerdidaList.size() - 1);
        assertThat(testOportunidadePerdida.getDescricaoPerda()).isEqualTo(DEFAULT_DESCRICAO_PERDA);
        assertThat(testOportunidadePerdida.getDate()).isEqualTo(DEFAULT_DATE);
    }

    @Test
    @Transactional
    public void createOportunidadePerdidaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = oportunidadePerdidaRepository.findAll().size();

        // Create the OportunidadePerdida with an existing ID
        oportunidadePerdida.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOportunidadePerdidaMockMvc.perform(post("/api/oportunidade-perdidas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(oportunidadePerdida)))
            .andExpect(status().isBadRequest());

        // Validate the OportunidadePerdida in the database
        List<OportunidadePerdida> oportunidadePerdidaList = oportunidadePerdidaRepository.findAll();
        assertThat(oportunidadePerdidaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllOportunidadePerdidas() throws Exception {
        // Initialize the database
        oportunidadePerdidaRepository.saveAndFlush(oportunidadePerdida);

        // Get all the oportunidadePerdidaList
        restOportunidadePerdidaMockMvc.perform(get("/api/oportunidade-perdidas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(oportunidadePerdida.getId().intValue())))
            .andExpect(jsonPath("$.[*].descricaoPerda").value(hasItem(DEFAULT_DESCRICAO_PERDA)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getOportunidadePerdida() throws Exception {
        // Initialize the database
        oportunidadePerdidaRepository.saveAndFlush(oportunidadePerdida);

        // Get the oportunidadePerdida
        restOportunidadePerdidaMockMvc.perform(get("/api/oportunidade-perdidas/{id}", oportunidadePerdida.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(oportunidadePerdida.getId().intValue()))
            .andExpect(jsonPath("$.descricaoPerda").value(DEFAULT_DESCRICAO_PERDA))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingOportunidadePerdida() throws Exception {
        // Get the oportunidadePerdida
        restOportunidadePerdidaMockMvc.perform(get("/api/oportunidade-perdidas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOportunidadePerdida() throws Exception {
        // Initialize the database
        oportunidadePerdidaRepository.saveAndFlush(oportunidadePerdida);

        int databaseSizeBeforeUpdate = oportunidadePerdidaRepository.findAll().size();

        // Update the oportunidadePerdida
        OportunidadePerdida updatedOportunidadePerdida = oportunidadePerdidaRepository.findById(oportunidadePerdida.getId()).get();
        // Disconnect from session so that the updates on updatedOportunidadePerdida are not directly saved in db
        em.detach(updatedOportunidadePerdida);
        updatedOportunidadePerdida
            .descricaoPerda(UPDATED_DESCRICAO_PERDA)
            .date(UPDATED_DATE);

        restOportunidadePerdidaMockMvc.perform(put("/api/oportunidade-perdidas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedOportunidadePerdida)))
            .andExpect(status().isOk());

        // Validate the OportunidadePerdida in the database
        List<OportunidadePerdida> oportunidadePerdidaList = oportunidadePerdidaRepository.findAll();
        assertThat(oportunidadePerdidaList).hasSize(databaseSizeBeforeUpdate);
        OportunidadePerdida testOportunidadePerdida = oportunidadePerdidaList.get(oportunidadePerdidaList.size() - 1);
        assertThat(testOportunidadePerdida.getDescricaoPerda()).isEqualTo(UPDATED_DESCRICAO_PERDA);
        assertThat(testOportunidadePerdida.getDate()).isEqualTo(UPDATED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingOportunidadePerdida() throws Exception {
        int databaseSizeBeforeUpdate = oportunidadePerdidaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOportunidadePerdidaMockMvc.perform(put("/api/oportunidade-perdidas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(oportunidadePerdida)))
            .andExpect(status().isBadRequest());

        // Validate the OportunidadePerdida in the database
        List<OportunidadePerdida> oportunidadePerdidaList = oportunidadePerdidaRepository.findAll();
        assertThat(oportunidadePerdidaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOportunidadePerdida() throws Exception {
        // Initialize the database
        oportunidadePerdidaRepository.saveAndFlush(oportunidadePerdida);

        int databaseSizeBeforeDelete = oportunidadePerdidaRepository.findAll().size();

        // Delete the oportunidadePerdida
        restOportunidadePerdidaMockMvc.perform(delete("/api/oportunidade-perdidas/{id}", oportunidadePerdida.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<OportunidadePerdida> oportunidadePerdidaList = oportunidadePerdidaRepository.findAll();
        assertThat(oportunidadePerdidaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
