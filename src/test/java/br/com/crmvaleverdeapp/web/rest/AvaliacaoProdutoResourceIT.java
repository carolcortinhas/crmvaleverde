package br.com.crmvaleverdeapp.web.rest;

import br.com.crmvaleverdeapp.CrmvaleverdeApp;
import br.com.crmvaleverdeapp.domain.AvaliacaoProduto;
import br.com.crmvaleverdeapp.repository.AvaliacaoProdutoRepository;

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
 * Integration tests for the {@link AvaliacaoProdutoResource} REST controller.
 */
@SpringBootTest(classes = CrmvaleverdeApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class AvaliacaoProdutoResourceIT {

    @Autowired
    private AvaliacaoProdutoRepository avaliacaoProdutoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAvaliacaoProdutoMockMvc;

    private AvaliacaoProduto avaliacaoProduto;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AvaliacaoProduto createEntity(EntityManager em) {
        AvaliacaoProduto avaliacaoProduto = new AvaliacaoProduto();
        return avaliacaoProduto;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AvaliacaoProduto createUpdatedEntity(EntityManager em) {
        AvaliacaoProduto avaliacaoProduto = new AvaliacaoProduto();
        return avaliacaoProduto;
    }

    @BeforeEach
    public void initTest() {
        avaliacaoProduto = createEntity(em);
    }

    @Test
    @Transactional
    public void createAvaliacaoProduto() throws Exception {
        int databaseSizeBeforeCreate = avaliacaoProdutoRepository.findAll().size();
        // Create the AvaliacaoProduto
        restAvaliacaoProdutoMockMvc.perform(post("/api/avaliacao-produtos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(avaliacaoProduto)))
            .andExpect(status().isCreated());

        // Validate the AvaliacaoProduto in the database
        List<AvaliacaoProduto> avaliacaoProdutoList = avaliacaoProdutoRepository.findAll();
        assertThat(avaliacaoProdutoList).hasSize(databaseSizeBeforeCreate + 1);
        AvaliacaoProduto testAvaliacaoProduto = avaliacaoProdutoList.get(avaliacaoProdutoList.size() - 1);
    }

    @Test
    @Transactional
    public void createAvaliacaoProdutoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = avaliacaoProdutoRepository.findAll().size();

        // Create the AvaliacaoProduto with an existing ID
        avaliacaoProduto.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAvaliacaoProdutoMockMvc.perform(post("/api/avaliacao-produtos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(avaliacaoProduto)))
            .andExpect(status().isBadRequest());

        // Validate the AvaliacaoProduto in the database
        List<AvaliacaoProduto> avaliacaoProdutoList = avaliacaoProdutoRepository.findAll();
        assertThat(avaliacaoProdutoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAvaliacaoProdutos() throws Exception {
        // Initialize the database
        avaliacaoProdutoRepository.saveAndFlush(avaliacaoProduto);

        // Get all the avaliacaoProdutoList
        restAvaliacaoProdutoMockMvc.perform(get("/api/avaliacao-produtos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(avaliacaoProduto.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getAvaliacaoProduto() throws Exception {
        // Initialize the database
        avaliacaoProdutoRepository.saveAndFlush(avaliacaoProduto);

        // Get the avaliacaoProduto
        restAvaliacaoProdutoMockMvc.perform(get("/api/avaliacao-produtos/{id}", avaliacaoProduto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(avaliacaoProduto.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingAvaliacaoProduto() throws Exception {
        // Get the avaliacaoProduto
        restAvaliacaoProdutoMockMvc.perform(get("/api/avaliacao-produtos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAvaliacaoProduto() throws Exception {
        // Initialize the database
        avaliacaoProdutoRepository.saveAndFlush(avaliacaoProduto);

        int databaseSizeBeforeUpdate = avaliacaoProdutoRepository.findAll().size();

        // Update the avaliacaoProduto
        AvaliacaoProduto updatedAvaliacaoProduto = avaliacaoProdutoRepository.findById(avaliacaoProduto.getId()).get();
        // Disconnect from session so that the updates on updatedAvaliacaoProduto are not directly saved in db
        em.detach(updatedAvaliacaoProduto);

        restAvaliacaoProdutoMockMvc.perform(put("/api/avaliacao-produtos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAvaliacaoProduto)))
            .andExpect(status().isOk());

        // Validate the AvaliacaoProduto in the database
        List<AvaliacaoProduto> avaliacaoProdutoList = avaliacaoProdutoRepository.findAll();
        assertThat(avaliacaoProdutoList).hasSize(databaseSizeBeforeUpdate);
        AvaliacaoProduto testAvaliacaoProduto = avaliacaoProdutoList.get(avaliacaoProdutoList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingAvaliacaoProduto() throws Exception {
        int databaseSizeBeforeUpdate = avaliacaoProdutoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAvaliacaoProdutoMockMvc.perform(put("/api/avaliacao-produtos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(avaliacaoProduto)))
            .andExpect(status().isBadRequest());

        // Validate the AvaliacaoProduto in the database
        List<AvaliacaoProduto> avaliacaoProdutoList = avaliacaoProdutoRepository.findAll();
        assertThat(avaliacaoProdutoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAvaliacaoProduto() throws Exception {
        // Initialize the database
        avaliacaoProdutoRepository.saveAndFlush(avaliacaoProduto);

        int databaseSizeBeforeDelete = avaliacaoProdutoRepository.findAll().size();

        // Delete the avaliacaoProduto
        restAvaliacaoProdutoMockMvc.perform(delete("/api/avaliacao-produtos/{id}", avaliacaoProduto.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AvaliacaoProduto> avaliacaoProdutoList = avaliacaoProdutoRepository.findAll();
        assertThat(avaliacaoProdutoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
