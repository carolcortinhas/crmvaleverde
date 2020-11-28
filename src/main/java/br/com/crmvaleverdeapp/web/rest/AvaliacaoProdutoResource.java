package br.com.crmvaleverdeapp.web.rest;

import br.com.crmvaleverdeapp.domain.AvaliacaoProduto;
import br.com.crmvaleverdeapp.repository.AvaliacaoProdutoRepository;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing {@link br.com.crmvaleverdeapp.domain.AvaliacaoProduto}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AvaliacaoProdutoResource {

    private final Logger log = LoggerFactory.getLogger(AvaliacaoProdutoResource.class);

    private static final String ENTITY_NAME = "avaliacaoProduto";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AvaliacaoProdutoRepository avaliacaoProdutoRepository;

    public AvaliacaoProdutoResource(AvaliacaoProdutoRepository avaliacaoProdutoRepository) {
        this.avaliacaoProdutoRepository = avaliacaoProdutoRepository;
    }

    /**
     * {@code POST  /avaliacao-produtos} : Create a new avaliacaoProduto.
     *
     * @param avaliacaoProduto the avaliacaoProduto to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new avaliacaoProduto, or with status {@code 400 (Bad Request)} if the avaliacaoProduto has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/avaliacao-produtos")
    public ResponseEntity<AvaliacaoProduto> createAvaliacaoProduto(@RequestBody AvaliacaoProduto avaliacaoProduto) throws URISyntaxException {
        log.debug("REST request to save AvaliacaoProduto : {}", avaliacaoProduto);
        if (avaliacaoProduto.getId() != null) {
            throw new BadRequestAlertException("A new avaliacaoProduto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AvaliacaoProduto result = avaliacaoProdutoRepository.save(avaliacaoProduto);
        return ResponseEntity.created(new URI("/api/avaliacao-produtos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /avaliacao-produtos} : Updates an existing avaliacaoProduto.
     *
     * @param avaliacaoProduto the avaliacaoProduto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated avaliacaoProduto,
     * or with status {@code 400 (Bad Request)} if the avaliacaoProduto is not valid,
     * or with status {@code 500 (Internal Server Error)} if the avaliacaoProduto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/avaliacao-produtos")
    public ResponseEntity<AvaliacaoProduto> updateAvaliacaoProduto(@RequestBody AvaliacaoProduto avaliacaoProduto) throws URISyntaxException {
        log.debug("REST request to update AvaliacaoProduto : {}", avaliacaoProduto);
        if (avaliacaoProduto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AvaliacaoProduto result = avaliacaoProdutoRepository.save(avaliacaoProduto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, avaliacaoProduto.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /avaliacao-produtos} : get all the avaliacaoProdutos.
     *
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of avaliacaoProdutos in body.
     */
    @GetMapping("/avaliacao-produtos")
    public List<AvaliacaoProduto> getAllAvaliacaoProdutos(@RequestParam(required = false) String filter) {
        if ("avaliacao-is-null".equals(filter)) {
            log.debug("REST request to get all AvaliacaoProdutos where avaliacao is null");
            return StreamSupport
                .stream(avaliacaoProdutoRepository.findAll().spliterator(), false)
                .filter(avaliacaoProduto -> avaliacaoProduto.getAvaliacao() == null)
                .collect(Collectors.toList());
        }
        log.debug("REST request to get all AvaliacaoProdutos");
        return avaliacaoProdutoRepository.findAll();
    }

    /**
     * {@code GET  /avaliacao-produtos/:id} : get the "id" avaliacaoProduto.
     *
     * @param id the id of the avaliacaoProduto to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the avaliacaoProduto, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/avaliacao-produtos/{id}")
    public ResponseEntity<AvaliacaoProduto> getAvaliacaoProduto(@PathVariable Long id) {
        log.debug("REST request to get AvaliacaoProduto : {}", id);
        Optional<AvaliacaoProduto> avaliacaoProduto = avaliacaoProdutoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(avaliacaoProduto);
    }

    /**
     * {@code DELETE  /avaliacao-produtos/:id} : delete the "id" avaliacaoProduto.
     *
     * @param id the id of the avaliacaoProduto to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/avaliacao-produtos/{id}")
    public ResponseEntity<Void> deleteAvaliacaoProduto(@PathVariable Long id) {
        log.debug("REST request to delete AvaliacaoProduto : {}", id);
        avaliacaoProdutoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
