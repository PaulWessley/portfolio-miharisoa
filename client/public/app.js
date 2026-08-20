/* Native SPA controller: HTML + CSS + JavaScript only. */
(function (window, document, $) {
  'use strict';

  const imageMap = {
    sentiment: '/manus-storage/sentiment-analysis-visual_2ff0d8f1.png',
    mailflow: '/manus-storage/email-automation-visual_6e7059c6.png',
    'weekly-report': '/manus-storage/email-automation-visual_6e7059c6.png'
  };

  const fallbackServices = [
    { id: 'sentiment', index: '01', label: 'Écoute & signaux', title: 'Analyse des sentiments', summary: 'Transformez les commentaires, réponses et messages en signaux clairs : satisfaction, irritants, sujets émergents et priorités à traiter.', challenge: 'Les retours clients s’accumulent dans des formulaires, avis et conversations. Les signaux importants se perdent dans le volume.', solution: 'Un flux Google Apps Script structure les réponses, enrichit vos données dans Google Sheets et produit une lecture simple des tonalités et thèmes récurrents.', benefits: ['Repérer les irritants qui reviennent', 'Suivre l’évolution du ressenti', 'Partager une synthèse actionnable'], stack: ['Google Forms', 'Google Sheets', 'Apps Script', 'Looker Studio'], accent: 'lime', visual: imageMap.sentiment, caseStudy: { eyebrow: 'Démonstration 01', title: 'Du verbatim à une lecture priorisée', description: 'Une démonstration de tableau de bord qui regroupe les tonalités et aide une équipe à identifier les sujets à traiter en premier.', metrics: ['Tonalité dominante', 'Thèmes récurrents', 'Évolution hebdomadaire'] } },
    { id: 'mailflow', index: '02', label: 'Tri & routine', title: 'Classification des emails', summary: 'Classez, priorisez et historisez les emails reçus afin que chaque demande soit visible, orientée et traitée sans copier-coller.', challenge: 'Les messages urgents, prospects, demandes support et pièces administratives arrivent dans une boîte de réception difficile à piloter.', solution: 'Google Apps Script analyse les règles métier, applique les libellés Gmail, alimente un suivi Google Sheets et signale les cas qui demandent une intervention.', benefits: ['Réduire le tri manuel', 'Rendre les priorités visibles', 'Créer un historique exploitable'], stack: ['Gmail', 'Apps Script', 'Google Sheets', 'Google Drive'], accent: 'coral', visual: imageMap.mailflow, caseStudy: { eyebrow: 'Démonstration 02', title: 'Une boîte Gmail qui devient un flux de travail', description: 'Une démonstration de routage, d’étiquetage et de suivi qui donne à l’équipe une lecture immédiate de ce qui mérite une réponse.', metrics: ['Volume classé', 'Priorités détectées', 'Délai de traitement'] } },
    { id: 'weekly-report', index: '03', label: 'Synthèse & décision', title: 'Compte rendu hebdomadaire', summary: 'Rassemblez les données clés de votre semaine dans une synthèse claire, livrée automatiquement aux personnes qui doivent décider.', challenge: 'La préparation des bilans est chronophage, dispersée entre emails, feuilles de calcul et documents partagés.', solution: 'Un scénario Apps Script collecte les indicateurs utiles, compose une synthèse dans Google Docs ou Gmail et planifie son envoi à la fréquence choisie.', benefits: ['Éviter les relances de données', 'Standardiser les points de suivi', 'Concentrer l’équipe sur les décisions'], stack: ['Google Sheets', 'Gmail', 'Google Docs', 'Apps Script'], accent: 'blue', visual: imageMap.mailflow, caseStudy: { eyebrow: 'Démonstration 02B', title: 'Le lundi commence avec une synthèse utile', description: 'Une démonstration de rapport hebdomadaire qui transforme les données de suivi en une note de pilotage prête à lire.', metrics: ['Indicateurs consolidés', 'Actions à suivre', 'Rapports programmés'] } }
  ];

  const process = [
    ['01', 'Cadrer', 'Nous partons des irritants, des sources de données et de la décision à faciliter.'],
    ['02', 'Cartographier', 'Les flux Gmail, Sheets, Forms et Drive sont reliés dans une logique simple.'],
    ['03', 'Automatiser', 'Google Apps Script exécute les règles, les contrôles et les déclencheurs utiles.'],
    ['04', 'Restituer', 'Les résultats deviennent un tableau de bord ou une synthèse immédiatement lisible.'],
    ['05', 'Ajuster', 'Les règles évoluent avec vos usages et les indicateurs réellement suivis.']
  ];

  function esc(value) {
    return String(value || '').replace(/[&<>"']/g, function (char) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[char]; });
  }

  function renderShell() {
    $('#app').html(`
      <header class="site-header">
        <div class="site-nav shell">
          <a href="#top" class="brand" data-scroll aria-label="Retour en haut"><img src="/manus-storage/data-mark-logo_ac80003f.png" alt="" /><span>data<span>/</span>insights</span></a>
          <nav class="desktop-nav"><a href="#services" data-scroll>Services</a><a href="#demos" data-scroll>Démonstrations</a><a href="#method" data-scroll>Méthode</a><a href="#contact" data-scroll class="nav-cta">Parler de votre flux</a></nav>
          <button class="menu-button" type="button" aria-label="Ouvrir le menu" aria-expanded="false"><span></span><span></span></button>
        </div>
        <nav class="mobile-nav" aria-hidden="true"><a href="#services" data-scroll>Services</a><a href="#demos" data-scroll>Démonstrations</a><a href="#method" data-scroll>Méthode</a><a href="#contact" data-scroll>Parler de votre flux</a></nav>
      </header>
      <main id="top">
        <section class="hero shell"><div class="hero-copy reveal"><div class="eyebrow"><i></i>Data Insights Analyst · Google Workspace</div><h1>Vos données<br />savent déjà <em>où agir.</em></h1><p>J’organise les signaux qui passent par Gmail, Sheets et vos outils Google pour créer des décisions plus nettes et des routines qui s’exécutent d’elles-mêmes.</p><div class="hero-actions"><a href="#services" data-scroll class="button button-primary">Explorer les services <b>↘</b></a><a href="#demos" data-scroll class="button button-secondary">Voir les démonstrations <b>↗</b></a></div><div class="hero-meta"><span>◉ Insights décisionnels</span><span>{ } Automatisations Apps Script</span></div></div><div class="hero-art reveal delay-2"><img src="/manus-storage/portfolio-hero-data-collage_f45c49f6.png" alt="Collage éditorial de signaux, emails et données analytiques" /><div class="art-note art-note-top"><small>Signal détecté</small><strong>Passer du constat à l’action</strong></div><div class="art-note art-note-bottom"><small>Chaque semaine</small><strong>Les faits importants, sans la chasse aux fichiers.</strong></div></div></section>
        <section class="stack-band"><div class="shell stack-grid"><div><b>Gmail</b><small>Le flux entrant devient lisible</small></div><div><b>Google Sheets</b><small>Les données restent exploitables</small></div><div><b>Apps Script</b><small>Les tâches se déclenchent</small></div><div><b>Looker Studio</b><small>La décision est visible</small></div></div></section>
        <section id="services" class="section shell"><div class="section-intro"><div><div class="eyebrow">Les services</div><h2>Trois façons de rendre vos opérations plus intelligentes.</h2></div><p>Chaque intervention articule l’analyse et l’automatisation : faire apparaître le bon signal, installer la bonne règle, puis laisser l’équipe se concentrer sur ce qui demande réellement son attention.</p></div><div id="services-grid" class="services-grid"><div class="loading-state">Chargement des services…</div></div></section>
        <section id="demos" class="demo-section"><div class="shell"><div class="section-intro"><div><div class="eyebrow">Preuves à remplacer par vos captures</div><h2>Deux cadres de démonstration, prêts pour vos véritables écrans.</h2></div><p>Les contenus restent volontairement identifiés comme des démonstrations. Vos deux captures viendront remplacer les illustrations de contexte.</p></div><div class="demo-grid demo-grid-top"><div class="screen-frame"><div class="screen-bar"><i></i><i></i><i></i><span>Capture 01 · sentiment_dashboard</span></div><div class="screen-image"><img src="/manus-storage/sentiment-analysis-visual_2ff0d8f1.png" alt="Emplacement de la capture de l’analyse des sentiments" /><div class="capture-label"><small>Votre capture 01</small><strong>Analyse des sentiments</strong></div></div></div><div class="demo-copy paper-card"><div class="eyebrow">Démonstration 01</div><h3>Du verbatim à une lecture priorisée.</h3><p>Mettre en relation le volume, la tonalité et les thèmes pour distinguer la tendance qui évolue du message isolé.</p><ul class="metric-list"><li>Tonalité dominante <i></i></li><li>Thèmes récurrents <i></i></li><li>Évolution hebdomadaire <i></i></li></ul></div></div><div class="demo-grid demo-grid-bottom"><div class="demo-copy paper-card"><div class="eyebrow">Démonstration 02</div><h3>De Gmail au point hebdomadaire.</h3><p>Une même vue peut montrer ce qui a été classé, les exceptions prioritaires et les éléments remontés dans le compte rendu de la semaine.</p><div class="tag-list"><span>Prospects</span><span>Support</span><span>Synthèse</span></div></div><div class="screen-frame light-frame"><div class="screen-bar"><i></i><i></i><i></i><span>Capture 02 · Gmail + weekly_summary</span></div><div class="screen-image"><img src="/manus-storage/email-automation-visual_6e7059c6.png" alt="Emplacement de la capture de classification des emails et du compte rendu hebdomadaire" /><div class="capture-label light-label"><small>Votre capture 02</small><strong>Classification & compte rendu</strong></div></div></div></div></div></section>
        <section id="method" class="section shell method-section"><div class="method-copy"><div class="eyebrow">Une méthode sans détour</div><h2>D’abord clarifier.<br />Ensuite automatiser.</h2><p>La technologie sert une routine de travail nette. Le périmètre, les règles et les bons indicateurs sont définis avant toute ligne de script.</p></div><ol class="process-list" id="process-list"></ol></section>
        <section class="metrics-band"><div class="shell metrics-grid"><div><div class="eyebrow dark-eyebrow">Ce que l’on mesure ensemble</div><h2>Moins de tâches invisibles. Plus de décisions traçables.</h2></div><p>Les gains ne sont jamais inventés : ils s’observent avec vos propres indicateurs — volume traité, taux de classification, temps économisé, délai de réponse, thèmes remontés et rapports envoyés.</p></div></section>
        <section id="contact" class="contact-section"><div class="shell contact-grid"><div class="contact-copy"><div class="eyebrow light-eyebrow">La première question est simple</div><h2>Quel signal voudriez-vous ne plus jamais manquer ?</h2><p>Parlons de votre boîte Gmail, de vos données de suivi ou de votre routine de reporting. Nous pourrons identifier le premier flux à clarifier.</p><div class="contact-points"><span>✓ Votre formulaire est prêt à être connecté à votre adresse professionnelle.</span><span>✓ Réponse attendue : selon vos modalités de contact.</span></div></div><form id="contact-form" class="contact-form"><div class="form-row"><label>Nom<input required name="name" placeholder="Votre nom" /></label><label>Email<input required type="email" name="email" placeholder="vous@entreprise.com" /></label></div><label class="message-field">Quel flux souhaitez-vous améliorer ?<textarea required name="message" rows="5" placeholder="Ex. Nous voulons mieux prioriser les demandes reçues sur Gmail…"></textarea></label><button class="button button-primary" type="submit">Demander un audit de flux <b>↗</b></button><p class="form-success" hidden>✓ Message enregistré dans cette démonstration — connectez le formulaire à votre canal de réception.</p></form></div></section>
      </main>
      <footer><div class="shell footer-inner"><span>© 2026 · Data Insights Analyst</span><span>Google Workspace · Google Apps Script · Automatisations sur mesure</span></div></footer>
      <div id="service-modal" class="modal" aria-hidden="true"><div class="modal-backdrop" data-close-modal></div><div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button class="modal-close" type="button" data-close-modal aria-label="Fermer">×</button><div id="modal-content"></div></div></div>
    `);
  }

  function renderServices(services) {
    $('#services-grid').html(services.map(function (service, index) {
      const accent = service.accent || (index === 1 ? 'coral' : index === 2 ? 'blue' : 'lime');
      return `<article class="service-card ${index === 1 ? 'service-offset' : ''}" data-service-id="${esc(service.id)}"><div class="service-image"><img src="${esc(service.visual || imageMap[service.id])}" alt="" /><span class="service-badge badge-${accent}">${esc(service.index)} · ${esc(service.label)}</span><i class="signal-dot dot-${accent}"></i></div><div class="service-line line-${accent}"></div><h3>${esc(service.title)}</h3><p>${esc(service.summary)}</p><div class="source-label">Source workspace</div><div class="stack-list">${(service.stack || []).slice(0, 3).map(function (item) { return `<span>${esc(item)}</span>`; }).join('')}</div><button type="button" class="service-link" data-open-service="${esc(service.id)}">Voir le cas d’usage <b>↗</b></button></article>`;
    }).join(''));
  }

  function renderProcess() {
    $('#process-list').html(process.map(function (item, index) { return `<li><span class="process-number">${item[0]}</span><div><strong>${item[1]}${index === 3 ? '<i class="signal-dot dot-lime"></i>' : ''}</strong><p>${item[2]}</p></div><b>›</b></li>`; }).join(''));
  }

  function openModal(service) {
    $('#modal-content').html(`<div class="eyebrow">${esc(service.caseStudy.eyebrow)}</div><h2 id="modal-title">${esc(service.caseStudy.title)}</h2><p class="modal-lead">${esc(service.caseStudy.description)}</p><div class="modal-columns"><div><small>Le problème</small><p>${esc(service.challenge)}</p></div><div><small>Le flux proposé</small><p>${esc(service.solution)}</p></div></div><div class="modal-metrics"><small>Ce que l’on suit</small><div>${(service.caseStudy.metrics || []).map(function (metric) { return `<span>${esc(metric)}</span>`; }).join('')}</div></div><div class="modal-stack">${(service.stack || []).map(function (item) { return `<span>${esc(item)}</span>`; }).join('')}</div>`);
    $('#service-modal').addClass('is-open').attr('aria-hidden', 'false');
    $('body').addClass('modal-open');
  }

  function closeModal() { $('#service-modal').removeClass('is-open').attr('aria-hidden', 'true'); $('body').removeClass('modal-open'); }

  function bindInteractions(services) {
    $(document).on('click', 'a[data-scroll]', function (event) { const target = $(this).attr('href'); if (target && target.charAt(0) === '#') { event.preventDefault(); $(target).get(0).scrollIntoView({ behavior: 'smooth', block: 'start' }); $('.mobile-nav').removeClass('is-open').attr('aria-hidden', 'true'); $('.menu-button').attr('aria-expanded', 'false'); } });
    $(document).on('click', '.menu-button', function () { const open = $('.mobile-nav').toggleClass('is-open').hasClass('is-open'); $(this).attr('aria-expanded', String(open)); $('.mobile-nav').attr('aria-hidden', String(!open)); });
    $(document).on('click', '[data-open-service]', function () { const service = services.find(function (item) { return item.id === $(this).data('open-service'); }); if (service) openModal(service); });
    $(document).on('click', '[data-close-modal]', closeModal);
    $(document).on('keydown', function (event) { if (event.key === 'Escape') closeModal(); });
    $('#contact-form').on('submit', function (event) { event.preventDefault(); $('.form-success').prop('hidden', false); this.reset(); });
  }

  $(function () {
    renderShell();
    renderProcess();
    bindInteractions(fallbackServices);
    if (window.axios) {
      window.axios.get('/data/services.json').then(function (response) { renderServices(response.data); bindInteractions(response.data); }).catch(function () { renderServices(fallbackServices); });
    } else {
      renderServices(fallbackServices);
    }
  });
})(window, document, window.jQuery);
