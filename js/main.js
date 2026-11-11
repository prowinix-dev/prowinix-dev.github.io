'use strict';

// Portfolio de Gérard Wilfried BIHINA : langues, animations et interactions
const animationsReduites = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, parent = document) => parent.querySelector(s);
const $$ = (s, parent = document) => [...parent.querySelectorAll(s)];

// ==========================================================
// 1. LES LANGUES (français / anglais)
// ==========================================================
// Le français est dans index.html. Au chargement, on le garde de côté pour pouvoir y revenir.
const EN = window.TRADUCTIONS_EN;
const francais = { textes: new Map(), attributs: new Map() };
$$('[data-i18n]').forEach((el) => francais.textes.set(el, el.innerHTML));
$$('[data-i18n-attr]').forEach((el) => {
  const valeurs = {};
  el.dataset.i18nAttr.split(';').forEach((paire) => {
    const [attribut] = paire.split(':');
    valeurs[attribut] = el.getAttribute(attribut);
  });
  francais.attributs.set(el, valeurs);
});
const titreFr = document.title;
const meta = $('meta[name="description"]');
const descriptionFr = meta.content;

let langue = 'fr';
const texte = (cle) => window.TEXTES_SCRIPT[langue][cle];

function appliquerLangue(nouvelle) {
  langue = nouvelle;
  const anglais = langue === 'en';
  document.documentElement.lang = langue;
  document.title = anglais ? EN['document-titre'] : titreFr;
  meta.content = anglais ? EN['document-description'] : descriptionFr;

  // Textes (les traductions sont écrites dans traductions.js : pas de contenu venant de l'extérieur)
  francais.textes.forEach((html, el) => {
    const cle = el.dataset.i18n;
    el.innerHTML = anglais && EN[cle] !== undefined ? EN[cle] : html;
  });
  // Attributs (alt, aria-label…)
  francais.attributs.forEach((valeurs, el) => {
    el.dataset.i18nAttr.split(';').forEach((paire) => {
      const [attribut, cle] = paire.split(':');
      el.setAttribute(attribut, anglais && EN[cle] !== undefined ? EN[cle] : valeurs[attribut]);
    });
  });
  // Galerie de NOVAIA : texte alternatif de la capture affichée
  const active = $('.vignette.active');
  if (active) $('#capture-principale').alt = active.dataset[anglais ? 'altEn' : 'altFr'];
  // Message WhatsApp prérempli
  const whatsapp = $('.contact-whatsapp');
  whatsapp.href = `https://wa.me/237687453764?text=${encodeURIComponent(whatsapp.dataset[anglais ? 'waEn' : 'waFr'])}`;
  // Bouton de langue : la langue active est mise en avant
  $('.langue').classList.toggle('en', anglais);
  // Les métiers qui s'écrivent tout seuls
  machine.changerRoles(JSON.parse($('.role-tape').dataset[anglais ? 'rolesEn' : 'rolesFr']));

  try {
    localStorage.setItem('langue', langue);
  } catch {}
}

// Langue de départ : ?lang=en dans l'adresse, sinon le dernier choix, sinon le français
// (l'anglais seulement si le navigateur est réglé en anglais)
function langueDeDepart() {
  const demandee = new URLSearchParams(location.search).get('lang');
  if (demandee === 'fr' || demandee === 'en') return demandee;
  try {
    const memorisee = localStorage.getItem('langue');
    if (memorisee === 'fr' || memorisee === 'en') return memorisee;
  } catch {}
  return (navigator.language || 'fr').toLowerCase().startsWith('en') ? 'en' : 'fr';
}

$('.langue').addEventListener('click', () => appliquerLangue(langue === 'fr' ? 'en' : 'fr'));

// ==========================================================
// 2. LES MÉTIERS QUI S'ÉCRIVENT TOUT SEULS
// ==========================================================
const machine = (() => {
  const zone = $('.role-tape');
  let roles = [];
  let indexRole = 0;
  let indexLettre = 0;
  let efface = false;
  let minuteur = null;

  function taper() {
    const role = roles[indexRole];
    indexLettre += efface ? -1 : 1;
    zone.textContent = role.slice(0, indexLettre);
    let pause = efface ? 35 : 70;
    if (!efface && indexLettre >= role.length) {
      efface = true;
      pause = 1900;
    } else if (efface && indexLettre <= 0) {
      efface = false;
      indexRole = (indexRole + 1) % roles.length;
      pause = 300;
    }
    minuteur = setTimeout(taper, pause);
  }

  return {
    changerRoles(nouveaux) {
      roles = nouveaux;
      clearTimeout(minuteur);
      indexRole = 0;
      if (animationsReduites) {
        zone.textContent = roles[0];
        return;
      }
      indexLettre = 0;
      efface = false;
      taper();
    },
  };
})();

// ==========================================================
// 3. NAVIGATION
// ==========================================================
const entete = $('.entete');
const progression = $('.progression');
function auDefilement() {
  const haut = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progression.style.width = `${max > 0 ? (haut / max) * 100 : 0}%`;
  entete.classList.toggle('defile', haut > 20);
}
window.addEventListener('scroll', auDefilement, { passive: true });
auDefilement();

// Menu sur téléphone
const burger = $('.burger');
const menu = $('#menu');
function fermerMenu() {
  menu.classList.remove('ouvert');
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-label', texte('menu-ouvrir'));
}
burger.addEventListener('click', () => {
  const ouvert = menu.classList.toggle('ouvert');
  burger.setAttribute('aria-expanded', String(ouvert));
  burger.setAttribute('aria-label', texte(ouvert ? 'menu-fermer' : 'menu-ouvrir'));
});
$$('#menu a').forEach((a) => a.addEventListener('click', fermerMenu));
document.addEventListener('keydown', (e) => e.key === 'Escape' && fermerMenu());

// Lien du menu actif selon la section visible
const liensMenu = $$('.menu a[href^="#"]:not(.bouton)');
const observateurSections = new IntersectionObserver(
  (entrees) => {
    entrees.forEach((entree) => {
      if (!entree.isIntersecting) return;
      liensMenu.forEach((l) => l.classList.toggle('actif', l.getAttribute('href') === `#${entree.target.id}`));
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);
$$('main section[id]').forEach((s) => observateurSections.observe(s));

// ==========================================================
// 4. ANIMATIONS
// ==========================================================
// Apparition des éléments au défilement (en cascade)
const observateurRevele = new IntersectionObserver(
  (entrees) => {
    entrees.forEach((entree) => {
      if (!entree.isIntersecting) return;
      entree.target.classList.add('vu');
      observateurRevele.unobserve(entree.target);
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
$$('.revele').forEach((el) => {
  const freres = $$(':scope > .revele', el.parentElement);
  el.style.setProperty('--delai', `${Math.min(freres.indexOf(el), 6) * 0.08}s`);
  observateurRevele.observe(el);
});

// Compteurs animés
const observateurCompteurs = new IntersectionObserver(
  (entrees) => {
    entrees.forEach((entree) => {
      if (!entree.isIntersecting) return;
      const el = entree.target;
      const cible = Number(el.dataset.compte);
      const suffixe = el.dataset.suffixe || '';
      const format = new Intl.NumberFormat(langue === 'en' ? 'en-US' : 'fr-FR');
      const duree = animationsReduites ? 0 : 1600;
      const debut = performance.now();
      (function avancer(maintenant) {
        const t = duree ? Math.min((maintenant - debut) / duree, 1) : 1;
        const adouci = 1 - Math.pow(1 - t, 3);
        el.textContent = format.format(Math.round(cible * adouci)) + (t === 1 ? suffixe : '');
        if (t < 1) requestAnimationFrame(avancer);
      })(debut);
      observateurCompteurs.unobserve(el);
    });
  },
  { threshold: 0.5 }
);
$$('[data-compte]').forEach((el) => observateurCompteurs.observe(el));

// Halo qui suit la souris + cartes qui s'inclinent (ordinateur seulement)
if (window.matchMedia('(pointer: fine)').matches && !animationsReduites) {
  const halo = $('.halo-souris');
  window.addEventListener('pointermove', (e) => {
    halo.style.left = `${e.clientX}px`;
    halo.style.top = `${e.clientY}px`;
  }, { passive: true });

  $$('.inclinable').forEach((carte) => {
    carte.addEventListener('pointermove', (e) => {
      const r = carte.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      carte.style.transform = `perspective(800px) rotateX(${(0.5 - y) * 8}deg) rotateY(${(x - 0.5) * 8}deg) translateY(-4px)`;
      carte.style.setProperty('--x', `${x * 100}%`);
      carte.style.setProperty('--y', `${y * 100}%`);
    });
    carte.addEventListener('pointerleave', () => (carte.style.transform = ''));
  });
}

// ==========================================================
// 5. IMAGES : GALERIE NOVAIA ET AGRANDISSEMENT
// ==========================================================
const capture = $('#capture-principale');
const vignettes = $$('.vignette');
vignettes.forEach((vignette) => {
  vignette.addEventListener('click', () => {
    if (vignette.classList.contains('active')) return;
    vignettes.forEach((v) => {
      v.classList.toggle('active', v === vignette);
      v.setAttribute('aria-selected', String(v === vignette));
    });
    capture.classList.add('change');
    setTimeout(() => {
      capture.onload = () => capture.classList.remove('change');
      capture.src = vignette.dataset.src;
      capture.alt = vignette.dataset[langue === 'en' ? 'altEn' : 'altFr'];
    }, 200);
  });
});

const visionneuse = $('.visionneuse');
function agrandir(image) {
  const grande = $('img', visionneuse);
  grande.src = image.currentSrc || image.src;
  grande.alt = image.alt;
  visionneuse.showModal();
}
$('.ecran-image').addEventListener('click', () => agrandir(capture));
$$('[data-zoom]').forEach((bouton) => bouton.addEventListener('click', () => agrandir($('img', bouton))));
$('.visionneuse-fermer').addEventListener('click', () => visionneuse.close());
visionneuse.addEventListener('click', (e) => e.target === visionneuse && visionneuse.close());

// ==========================================================
// 6. CONTACT
// ==========================================================
const toast = $('.toast');
function montrerToast(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(montrerToast.minuteur);
  montrerToast.minuteur = setTimeout(() => toast.classList.remove('visible'), 2200);
}
$$('.copier').forEach((bouton) => {
  bouton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(bouton.dataset.copie);
      montrerToast(texte('copie-ok'));
    } catch {
      montrerToast(bouton.dataset.copie);
    }
  });
});

$('#annee').textContent = new Date().getFullYear();

// ---------- Démarrage ----------
appliquerLangue(langueDeDepart());
document.documentElement.classList.add('pret');
