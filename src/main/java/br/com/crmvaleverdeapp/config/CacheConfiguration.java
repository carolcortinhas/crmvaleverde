package br.com.crmvaleverdeapp.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.boot.info.BuildProperties;
import org.springframework.boot.info.GitProperties;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import io.github.jhipster.config.cache.PrefixedKeyGenerator;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {
    private GitProperties gitProperties;
    private BuildProperties buildProperties;
    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, br.com.crmvaleverdeapp.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, br.com.crmvaleverdeapp.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, br.com.crmvaleverdeapp.domain.User.class.getName());
            createCache(cm, br.com.crmvaleverdeapp.domain.Authority.class.getName());
            createCache(cm, br.com.crmvaleverdeapp.domain.User.class.getName() + ".authorities");
            createCache(cm, br.com.crmvaleverdeapp.domain.PersistentToken.class.getName());
            createCache(cm, br.com.crmvaleverdeapp.domain.User.class.getName() + ".persistentTokens");
            createCache(cm, br.com.crmvaleverdeapp.domain.Pessoa.class.getName());
            createCache(cm, br.com.crmvaleverdeapp.domain.Contato.class.getName());
            createCache(cm, br.com.crmvaleverdeapp.domain.Telefone.class.getName());
            createCache(cm, br.com.crmvaleverdeapp.domain.Email.class.getName());
            createCache(cm, br.com.crmvaleverdeapp.domain.Administrador.class.getName());
            createCache(cm, br.com.crmvaleverdeapp.domain.Consultor.class.getName());
            createCache(cm, br.com.crmvaleverdeapp.domain.Consultor.class.getName() + ".atendes");
            createCache(cm, br.com.crmvaleverdeapp.domain.Consultor.class.getName() + ".vendas");
            createCache(cm, br.com.crmvaleverdeapp.domain.Gerente.class.getName());
            createCache(cm, br.com.crmvaleverdeapp.domain.Funcionario.class.getName());
            createCache(cm, br.com.crmvaleverdeapp.domain.Funcionario.class.getName() + ".administradores");
            createCache(cm, br.com.crmvaleverdeapp.domain.Funcionario.class.getName() + ".vendedores");
            createCache(cm, br.com.crmvaleverdeapp.domain.Funcionario.class.getName() + ".gerentes");
            createCache(cm, br.com.crmvaleverdeapp.domain.Cliente.class.getName());
            createCache(cm, br.com.crmvaleverdeapp.domain.Cliente.class.getName() + ".atendimentos");
            createCache(cm, br.com.crmvaleverdeapp.domain.Cliente.class.getName() + ".consultoresVendas");
            createCache(cm, br.com.crmvaleverdeapp.domain.Cliente.class.getName() + ".avalias");
            createCache(cm, br.com.crmvaleverdeapp.domain.ClientePessoaFisica.class.getName());
            createCache(cm, br.com.crmvaleverdeapp.domain.ClientePessoaJuridica.class.getName());
            createCache(cm, br.com.crmvaleverdeapp.domain.RepresentantePJ.class.getName());
            createCache(cm, br.com.crmvaleverdeapp.domain.Endereco.class.getName());
            createCache(cm, br.com.crmvaleverdeapp.domain.Atendimento.class.getName());
            createCache(cm, br.com.crmvaleverdeapp.domain.Atendimento.class.getName() + ".oportunidadesVendas");
            createCache(cm, br.com.crmvaleverdeapp.domain.Atendimento.class.getName() + ".etapasAtendimentos");
            createCache(cm, br.com.crmvaleverdeapp.domain.Atendimento.class.getName() + ".propostas");
            createCache(cm, br.com.crmvaleverdeapp.domain.EtapaAtendimento.class.getName());
            createCache(cm, br.com.crmvaleverdeapp.domain.Avaliacao.class.getName());
            createCache(cm, br.com.crmvaleverdeapp.domain.AvaliacaoAtendimento.class.getName());
            createCache(cm, br.com.crmvaleverdeapp.domain.AvaliacaoProduto.class.getName());
            createCache(cm, br.com.crmvaleverdeapp.domain.Venda.class.getName());
            createCache(cm, br.com.crmvaleverdeapp.domain.Venda.class.getName() + ".produtosVenda1s");
            createCache(cm, br.com.crmvaleverdeapp.domain.Venda.class.getName() + ".produtosVenda3s");
            createCache(cm, br.com.crmvaleverdeapp.domain.ProdutoVenda.class.getName());
            createCache(cm, br.com.crmvaleverdeapp.domain.Produto.class.getName());
            createCache(cm, br.com.crmvaleverdeapp.domain.Produto.class.getName() + ".produtosVenda2s");
            createCache(cm, br.com.crmvaleverdeapp.domain.Proposta.class.getName());
            createCache(cm, br.com.crmvaleverdeapp.domain.Proposta.class.getName() + ".geraDocumentos");
            createCache(cm, br.com.crmvaleverdeapp.domain.Documento.class.getName());
            createCache(cm, br.com.crmvaleverdeapp.domain.Oportunidade.class.getName());
            createCache(cm, br.com.crmvaleverdeapp.domain.Oportunidade.class.getName() + ".vendasOportunidades");
            createCache(cm, br.com.crmvaleverdeapp.domain.OportunidadePerdida.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache == null) {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }

    @Autowired(required = false)
    public void setGitProperties(GitProperties gitProperties) {
        this.gitProperties = gitProperties;
    }

    @Autowired(required = false)
    public void setBuildProperties(BuildProperties buildProperties) {
        this.buildProperties = buildProperties;
    }

    @Bean
    public KeyGenerator keyGenerator() {
        return new PrefixedKeyGenerator(this.gitProperties, this.buildProperties);
    }
}
