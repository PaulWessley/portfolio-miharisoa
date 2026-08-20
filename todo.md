# Migration SPA native — Checklist

- [x] Remplacer le point d’entrée React par un document HTML natif.
- [x] Reproduire la direction visuelle et les couleurs existantes en CSS/Tailwind CDN.
- [x] Conserver les images générées et les deux zones de captures.
- [x] Charger les services depuis `data/services.json` avec Axios 1.18.x CDN.
- [x] Utiliser jQuery 3.7.1 CDN pour les interactions DOM et la navigation fluide.
- [x] Implémenter la navigation SPA, la modale de service, le menu mobile et le formulaire.
- [x] Vérifier qu’aucun framework React, Vue ou Angular n’est utilisé dans la nouvelle page.
- [x] Tester le chargement JSON, la construction et les affichages desktop/mobile.
- [x] Enregistrer le résultat dans un checkpoint final.

## Contraintes

- Ne pas modifier les images, les couleurs, les textes métier ni les URLs `/manus-storage/` existantes.
- Ne pas toucher au serveur, à la configuration métier ou aux autres fonctionnalités du projet.
- Utiliser uniquement HTML, CSS et JavaScript natifs côté interface, avec les trois CDN demandés.

## Direction visuelle

Signaux utiles : design éditorial Swiss, fond ivoire, cobalt analytique, lime pour les actions validées, corail pour les exceptions, DM Serif Display et Manrope, motifs de rubans de données et cartes papier.

## Validation

- [x] La page native charge `data/services.json` et affiche les trois services.
- [x] La construction frontend Vite réussit avec `pnpm exec vite build`.
- [x] La page est lisible à 1280 px et 375 px.
- [x] La modale et le menu mobile sont implémentés avec navigation clavier et touche Échap.
- [x] Les fichiers livrés utilisent seulement HTML, CSS et JavaScript natifs côté interface.

## Notes

Cette migration reste limitée à l’interface. Les anciens fichiers React du projet restent inchangés pour respecter la contrainte « ne touche à rien d’autre » ; le point d’entrée livré ne les importe pas.
