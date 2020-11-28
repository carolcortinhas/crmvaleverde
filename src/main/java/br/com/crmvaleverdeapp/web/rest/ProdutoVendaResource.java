package br.com.crmvaleverdeapp.web.rest;

import br.com.crmvaleverdeapp.domain.ProdutoVenda;
import br.com.crmvaleverdeapp.repository.ProdutoVendaRepository;
import br.com.crmvaleverdeapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link br.com.crmvaleverdeapp.domain.ProdutoVenda}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProdutoVendaResource {

    private final Logger log = LoggerFactory.getLogger(ProdutoVendaResource.class);

    private static final String ENTITY_NAME = "produtoVenda";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProdutoVendaRepository produtoVendaRepository;

    public ProdutoVendaResource(ProdutoVendaRepository produtoVendaRepository) {
        this.produtoVendaRepository = produtoVendaRepository;
    }

    /**
     * {@code POST  /produto-vendas} : Create a new produtoVenda.
     *
     * @param produtoVenda the produtoVenda to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new produtoVenda, or with status {@code 400 (Bad Request)} if the produtoVenda has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/produto-vendas")
    public ResponseEntity<ProdutoVenda> createProdutoVenda(@RequestBody ProdutoVenda produtoVenda) throws URISyntaxException {
        log.debug("REST request to save ProdutoVenda : {}", produtoVenda);
        if (produtoVenda.getId() != null) {
            throw new BadRequestAlertException("A new produtoVenda cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProdutoVenda result = produtoVendaRepository.save(produtoVenda);
        return ResponseEntity.created(new URI("/api/produto-vendas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /produto-vendas} : Updates an existing produtoVenda.
     *
     * @param produtoVenda the produtoVenda to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated produtoVenda,
     * or with status {@code 400 (Bad Request)} if the produtoVenda is not valid,
     * or with status {@code 500 (Internal Server Error)} if the produtoVenda couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/produto-vendas")
    public ResponseEntity<ProdutoVenda> updateProdutoVenda(@RequestBody ProdutoVenda produtoVenda) throws URISyntaxException {
        log.debug("REST request to update ProdutoVenda : {}", produtoVenda);
        if (produtoVenda.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProdutoVenda result = produtoVendaRepository.save(produtoVenda);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, produtoVenda.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /produto-vendas} : get all the produtoVendas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of produtoVendas in body.
     */
    @GetMapping("/produto-vendas")
    public List<ProdutoVenda> getAllProdutoVendas() {
        log.debug("REST request to get all ProdutoVendas");
        return produtoVendaRepository.findAll();
    }

    /**
     * {@code GET  /produto-vendas/:id} : get the "id" produtoVenda.
     *
     * @param id the id of the produtoVenda to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the produtoVenda, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/produto-vendas/{id}")
    public ResponseEntity<ProdutoVenda> getProdutoVenda(@PathVariable Long id) {
        log.debug("REST request to get ProdutoVenda : {}", id);
        Optional<ProdutoVenda> produtoVenda = produtoVendaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(produtoVenda);
    }

    /**
     * {@code DELETE  /produto-vendas/:id} : delete the "id" produtoVenda.
     *
     * @param id the id of the produtoVenda to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/produto-vendas/{id}")
    public ResponseEntity<Void> deleteProdutoVenda(@PathVariable Long id) {
        log.debug("REST request to delete ProdutoVenda : {}", id);
        produtoVendaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
