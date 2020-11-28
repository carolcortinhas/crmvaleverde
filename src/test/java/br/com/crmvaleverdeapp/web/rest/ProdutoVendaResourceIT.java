package br.com.crmvaleverdeapp.web.rest;

import br.com.crmvaleverdeapp.CrmvaleverdeApp;
import br.com.crmvaleverdeapp.domain.ProdutoVenda;
import br.com.crmvaleverdeapp.repository.ProdutoVendaRepository;

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
 * Integration tests for the {@link ProdutoVendaResource} REST controller.
 */
@SpringBootTest(classes = CrmvaleverdeApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ProdutoVendaResourceIT {

    private static final Integer DEFAULT_QUANTIDADE = 1;
    private static final Integer UPDATED_QUANTIDADE = 2;

    @Autowired
    private ProdutoVendaRepository produtoVendaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProdutoVendaMockMvc;

    private ProdutoVenda produtoVenda;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProdutoVenda createEntity(EntityManager em) {
        ProdutoVenda produtoVenda = new ProdutoVenda()
            .quantidade(DEFAULT_QUANTIDADE);
        return produtoVenda;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProdutoVenda createUpdatedEntity(EntityManager em) {
        ProdutoVenda produtoVenda = new ProdutoVenda()
            .quantidade(UPDATED_QUANTIDADE);
        return produtoVenda;
    }

    @BeforeEach
    public void initTest() {
        produtoVenda = createEntity(em);
    }

    @Test
    @Transactional
    public void createProdutoVenda() throws Exception {
        int databaseSizeBeforeCreate = produtoVendaRepository.findAll().size();
        // Create the ProdutoVenda
        restProdutoVendaMockMvc.perform(post("/api/produto-vendas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(produtoVenda)))
            .andExpect(status().isCreated());

        // Validate the ProdutoVenda in the database
        List<ProdutoVenda> produtoVendaList = produtoVendaRepository.findAll();
        assertThat(produtoVendaList).hasSize(databaseSizeBeforeCreate + 1);
        ProdutoVenda testProdutoVenda = produtoVendaList.get(produtoVendaList.size() - 1);
        assertThat(testProdutoVenda.getQuantidade()).isEqualTo(DEFAULT_QUANTIDADE);
    }

    @Test
    @Transactional
    public void createProdutoVendaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = produtoVendaRepository.findAll().size();

        // Create the ProdutoVenda with an existing ID
        produtoVenda.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProdutoVendaMockMvc.perform(post("/api/produto-vendas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(produtoVenda)))
            .andExpect(status().isBadRequest());

        // Validate the ProdutoVenda in the database
        List<ProdutoVenda> produtoVendaList = produtoVendaRepository.findAll();
        assertThat(produtoVendaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProdutoVendas() throws Exception {
        // Initialize the database
        produtoVendaRepository.saveAndFlush(produtoVenda);

        // Get all the produtoVendaList
        restProdutoVendaMockMvc.perform(get("/api/produto-vendas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(produtoVenda.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantidade").value(hasItem(DEFAULT_QUANTIDADE)));
    }
    
    @Test
    @Transactional
    public void getProdutoVenda() throws Exception {
        // Initialize the database
        produtoVendaRepository.saveAndFlush(produtoVenda);

        // Get the produtoVenda
        restProdutoVendaMockMvc.perform(get("/api/produto-vendas/{id}", produtoVenda.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(produtoVenda.getId().intValue()))
            .andExpect(jsonPath("$.quantidade").value(DEFAULT_QUANTIDADE));
    }
    @Test
    @Transactional
    public void getNonExistingProdutoVenda() throws Exception {
        // Get the produtoVenda
        restProdutoVendaMockMvc.perform(get("/api/produto-vendas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProdutoVenda() throws Exception {
        // Initialize the database
        produtoVendaRepository.saveAndFlush(produtoVenda);

        int databaseSizeBeforeUpdate = produtoVendaRepository.findAll().size();

        // Update the produtoVenda
        ProdutoVenda updatedProdutoVenda = produtoVendaRepository.findById(produtoVenda.getId()).get();
        // Disconnect from session so that the updates on updatedProdutoVenda are not directly saved in db
        em.detach(updatedProdutoVenda);
        updatedProdutoVenda
            .quantidade(UPDATED_QUANTIDADE);

        restProdutoVendaMockMvc.perform(put("/api/produto-vendas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProdutoVenda)))
            .andExpect(status().isOk());

        // Validate the ProdutoVenda in the database
        List<ProdutoVenda> produtoVendaList = produtoVendaRepository.findAll();
        assertThat(produtoVendaList).hasSize(databaseSizeBeforeUpdate);
        ProdutoVenda testProdutoVenda = produtoVendaList.get(produtoVendaList.size() - 1);
        assertThat(testProdutoVenda.getQuantidade()).isEqualTo(UPDATED_QUANTIDADE);
    }

    @Test
    @Transactional
    public void updateNonExistingProdutoVenda() throws Exception {
        int databaseSizeBeforeUpdate = produtoVendaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProdutoVendaMockMvc.perform(put("/api/produto-vendas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(produtoVenda)))
            .andExpect(status().isBadRequest());

        // Validate the ProdutoVenda in the database
        List<ProdutoVenda> produtoVendaList = produtoVendaRepository.findAll();
        assertThat(produtoVendaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProdutoVenda() throws Exception {
        // Initialize the database
        produtoVendaRepository.saveAndFlush(produtoVenda);

        int databaseSizeBeforeDelete = produtoVendaRepository.findAll().size();

        // Delete the produtoVenda
        restProdutoVendaMockMvc.perform(delete("/api/produto-vendas/{id}", produtoVenda.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProdutoVenda> produtoVendaList = produtoVendaRepository.findAll();
        assertThat(produtoVendaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
