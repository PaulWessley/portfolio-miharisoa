/* Style reminder: Signaux utiles — mise en page éditoriale asymétrique, ivoire, cobalt et éléments de données physiques. */
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Braces,
  Check,
  ChevronRight,
  CircleDot,
  FileText,
  Mail,
  Menu,
  MessageSquareText,
  Sparkles,
  X,
} from "lucide-react";

type Service = {
  id: string;
  index: string;
  label: string;
  title: string;
  shortTitle: string;
  summary: string;
  challenge: string;
  solution: string;
  benefits: string[];
  stack: string[];
  accent: "lime" | "coral" | "blue";
  visual: string;
  screenshotSlot: string;
  caseStudy: { eyebrow: string; title: string; description: string; metrics: string[] };
};

declare global {
  interface JQueryLite {
    off: (eventName: string) => JQueryLite;
    on: (eventName: string, handler: (event: Event) => void) => JQueryLite;
  }
  interface Window {
    axios?: { get: <T>(url: string) => Promise<{ data: T }> };
    jQuery?: (selector: string) => JQueryLite;
  }
}

const accentClasses: Record<Service["accent"], { badge: string; line: string; dot: string; button: string }> = {
  lime: { badge: "bg-[#D3F28A] text-[#20460F]", line: "bg-[#B7E658]", dot: "bg-[#B7E658]", button: "hover:bg-[#D3F28A]" },
  coral: { badge: "bg-[#FFD0BE] text-[#843218]", line: "bg-[#F3845F]", dot: "bg-[#F3845F]", button: "hover:bg-[#FFD0BE]" },
  blue: { badge: "bg-[#CCD7FF] text-[#1A2D92]", line: "bg-[#2446E8]", dot: "bg-[#2446E8]", button: "hover:bg-[#CCD7FF]" },
};

const process = [
  ["01", "Cadrer", "Nous partons des irritants, des sources de données et de la décision à faciliter."],
  ["02", "Cartographier", "Les flux Gmail, Sheets, Forms et Drive sont reliés dans une logique simple."],
  ["03", "Automatiser", "Google Apps Script exécute les règles, les contrôles et les déclencheurs utiles."],
  ["04", "Restituer", "Les résultats deviennent un tableau de bord ou une synthèse immédiatement lisible."],
  ["05", "Ajuster", "Les règles évoluent avec vos usages et les indicateurs réellement suivis."],
];

const fallbackServices: Service[] = [
  { id: "sentiment", index: "01", label: "Écoute & signaux", title: "Analyse des sentiments", shortTitle: "Lire ce que vos clients ressentent.", summary: "Transformez les commentaires, réponses et messages en signaux clairs : satisfaction, irritants, sujets émergents et priorités à traiter.", challenge: "Les retours clients s’accumulent dans des formulaires, avis et conversations. Les signaux importants se perdent dans le volume.", solution: "Un flux Google Apps Script structure les réponses, enrichit vos données dans Google Sheets et produit une lecture simple des tonalités et thèmes récurrents.", benefits: ["Repérer les irritants qui reviennent", "Suivre l’évolution du ressenti", "Partager une synthèse actionnable"], stack: ["Google Forms", "Google Sheets", "Apps Script", "Looker Studio"], accent: "lime", visual: "/manus-storage/sentiment-analysis-visual_2ff0d8f1.png", screenshotSlot: "Ajoutez ici votre capture 01", caseStudy: { eyebrow: "Démonstration 01", title: "Du verbatim à une lecture priorisée", description: "Une démonstration de tableau de bord qui regroupe les tonalités et aide une équipe à identifier les sujets à traiter en premier.", metrics: ["Tonalité dominante", "Thèmes récurrents", "Évolution hebdomadaire"] } },
  { id: "mailflow", index: "02", label: "Tri & routine", title: "Classification des emails", shortTitle: "Faire circuler chaque demande au bon endroit.", summary: "Classez, priorisez et historisez les emails reçus afin que chaque demande soit visible, orientée et traitée sans copier-coller.", challenge: "Les messages urgents, prospects, demandes support et pièces administratives arrivent dans une boîte de réception difficile à piloter.", solution: "Google Apps Script analyse les règles métier, applique les libellés Gmail, alimente un suivi Google Sheets et signale les cas qui demandent une intervention.", benefits: ["Réduire le tri manuel", "Rendre les priorités visibles", "Créer un historique exploitable"], stack: ["Gmail", "Apps Script", "Google Sheets", "Google Drive"], accent: "coral", visual: "/manus-storage/email-automation-visual_6e7059c6.png", screenshotSlot: "Ajoutez ici votre capture 02", caseStudy: { eyebrow: "Démonstration 02", title: "Une boîte Gmail qui devient un flux de travail", description: "Une démonstration de routage, d’étiquetage et de suivi qui donne à l’équipe une lecture immédiate de ce qui mérite une réponse.", metrics: ["Volume classé", "Priorités détectées", "Délai de traitement"] } },
  { id: "weekly-report", index: "03", label: "Synthèse & décision", title: "Compte rendu hebdomadaire", shortTitle: "Recevoir les bons points, sans refaire le travail.", summary: "Rassemblez les données clés de votre semaine dans une synthèse claire, livrée automatiquement aux personnes qui doivent décider.", challenge: "La préparation des bilans est chronophage, dispersée entre emails, feuilles de calcul et documents partagés.", solution: "Un scénario Apps Script collecte les indicateurs utiles, compose une synthèse dans Google Docs ou Gmail et planifie son envoi à la fréquence choisie.", benefits: ["Éviter les relances de données", "Standardiser les points de suivi", "Concentrer l’équipe sur les décisions"], stack: ["Google Sheets", "Gmail", "Google Docs", "Apps Script"], accent: "blue", visual: "/manus-storage/email-automation-visual_6e7059c6.png", screenshotSlot: "La capture 02 présente aussi la synthèse hebdomadaire", caseStudy: { eyebrow: "Démonstration 02B", title: "Le lundi commence avec une synthèse utile", description: "Une démonstration de rapport hebdomadaire qui transforme les données de suivi en une note de pilotage prête à lire.", metrics: ["Indicateurs consolidés", "Actions à suivre", "Rapports programmés"] } },
];

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [messageSent, setMessageSent] = useState(false);

  useEffect(() => {
    const loadServices = async () => {
      try {
        if (!window.axios) throw new Error("Axios CDN indisponible");
        const response = await window.axios.get<Service[]>("/data/services.json");
        setServices(response.data);
      } catch {
        setServices(fallbackServices);
      } finally {
        setLoading(false);
      }
    };
    void loadServices();
  }, []);

  useEffect(() => {
    const $ = window.jQuery;
    if (!$) return;
    const handleScroll = (event: Event) => {
      event.preventDefault();
      const target = (event.currentTarget as HTMLAnchorElement).getAttribute("href");
      if (!target?.startsWith("#")) return;
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    };
    $("a[data-scroll]").off("click.portfolio").on("click.portfolio", handleScroll);
    return () => { $("a[data-scroll]").off("click.portfolio"); };
  }, []);

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessageSent(true);
    event.currentTarget.reset();
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#FFFDF6] text-[#142346]">
      <header className="sticky top-0 z-40 border-b border-[#142346]/10 bg-[#FFFDF6]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-5 lg:px-9">
          <a href="#top" data-scroll className="flex items-center gap-3" aria-label="Retour en haut">
            <img className="h-10 w-10 rounded-xl object-cover shadow-sm" src="/manus-storage/data-mark-logo_ac80003f.png" alt="" />
            <span className="brand-wordmark text-sm font-extrabold text-[#142346]">data<span className="text-[#2446E8]">/</span>insights</span>
          </a>
          <nav className="hidden items-center gap-7 text-xs font-bold text-[#385070] md:flex">
            <a data-scroll href="#services" className="transition hover:text-[#2446E8]">Services</a>
            <a data-scroll href="#demos" className="transition hover:text-[#2446E8]">Démonstrations</a>
            <a data-scroll href="#method" className="transition hover:text-[#2446E8]">Méthode</a>
            <a data-scroll href="#contact" className="rounded-full bg-[#142346] px-4 py-2.5 text-white transition hover:bg-[#2446E8] active:scale-[.97]">Parler de votre flux</a>
          </nav>
          <button className="rounded-full border border-[#142346]/15 p-2 text-[#142346] md:hidden" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Ouvrir le menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="border-t border-[#142346]/10 bg-[#FFFDF6] px-5 py-5 md:hidden">
            <div className="flex flex-col gap-4 text-sm font-bold">
              <a data-scroll href="#services">Services</a>
              <a data-scroll href="#demos">Démonstrations</a>
              <a data-scroll href="#method">Méthode</a>
              <a data-scroll href="#contact" className="text-[#2446E8]">Parler de votre flux</a>
            </div>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-16 lg:grid-cols-[0.92fr_1.08fr] lg:px-9 lg:pb-28 lg:pt-24">
          <div className="relative z-10 flex flex-col justify-center">
            <div className="rise-in mb-7 flex items-center gap-3">
              <span className="h-px w-9 bg-[#2446E8]" />
              <p className="eyebrow">Data Insights Analyst · Google Workspace</p>
            </div>
            <h1 className="rise-in rise-delay-1 max-w-xl font-display text-5xl leading-[0.94] tracking-[-0.045em] text-[#142346] sm:text-6xl lg:text-7xl">
              Vos données savent déjà <em className="text-[#2446E8]">où agir.</em>
            </h1>
            <p className="rise-in rise-delay-2 mt-7 max-w-lg text-base leading-7 text-[#526783] sm:text-lg">
              J’organise les signaux qui passent par Gmail, Sheets et vos outils Google pour créer des décisions plus nettes et des routines qui s’exécutent d’elles-mêmes.
            </p>
            <div className="rise-in rise-delay-3 mt-9 flex flex-wrap gap-3">
              <a data-scroll href="#services" className="group inline-flex items-center gap-3 rounded-full bg-[#2446E8] px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-[#2446E8]/20 transition hover:-translate-y-0.5 active:scale-[.97]">Explorer les services <ArrowDownRight size={17} className="transition group-hover:translate-y-0.5" /></a>
              <a data-scroll href="#demos" className="inline-flex items-center gap-2 rounded-full border border-[#142346]/15 bg-white/70 px-5 py-3.5 text-sm font-extrabold text-[#142346] transition hover:border-[#2446E8] hover:text-[#2446E8] active:scale-[.97]">Voir les démonstrations <ArrowUpRight size={16} /></a>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-[#142346]/10 pt-6 text-xs font-bold text-[#526783]">
              <span className="flex items-center gap-2"><CircleDot size={14} className="text-[#2446E8]" /> Insights décisionnels</span>
              <span className="flex items-center gap-2"><Braces size={14} className="text-[#2446E8]" /> Automatisations Apps Script</span>
            </div>
          </div>
          <div className="rise-in rise-delay-2 relative min-h-[440px] overflow-hidden rounded-[2rem] border border-white/70 bg-[#DDE4FF] paper-card lg:min-h-[600px]">
            <img src="/manus-storage/portfolio-hero-data-collage_f45c49f6.png" alt="Collage éditorial représentant des flux de données, des emails et des signaux analytiques" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 noise-overlay opacity-[0.08] mix-blend-multiply" />
            <div className="absolute left-5 top-5 rounded-2xl border border-white/80 bg-[#FFFDF6]/90 px-4 py-3 shadow-lg backdrop-blur-sm sm:left-8 sm:top-8">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#2446E8]">Signal détecté</p>
              <p className="mt-1 text-sm font-extrabold text-[#142346]">Passer du constat à l’action</p>
            </div>
            <div className="absolute bottom-5 right-5 max-w-52 rounded-2xl bg-[#142346] px-4 py-4 text-white shadow-xl sm:bottom-8 sm:right-8">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#B7E658]">Chaque semaine</p>
              <p className="mt-1 text-sm font-semibold leading-5">Les faits importants, sans la chasse aux fichiers.</p>
            </div>
          </div>
        </section>

        <section className="border-y border-[#142346]/10 bg-[#142346] text-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 lg:grid-cols-4 lg:px-9">
            {[['Gmail', 'Le flux entrant devient lisible'], ['Google Sheets', 'Les données restent exploitables'], ['Apps Script', 'Les tâches se déclenchent'], ['Looker Studio', 'La décision est visible']].map(([name, text]) => (
              <div key={name} className="border-r border-white/10 px-4 py-7 last:border-r-0 sm:px-7">
                <p className="font-display text-2xl italic text-[#D3F28A]">{name}</p>
                <p className="mt-1 text-xs leading-5 text-white/60">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-5 py-24 lg:px-9 lg:py-32">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="eyebrow">Les services</p>
              <h2 className="mt-4 max-w-sm font-display text-4xl leading-[0.98] tracking-[-0.035em] text-[#142346] sm:text-5xl">Trois façons de rendre vos opérations plus intelligentes.</h2>
            </div>
            <p className="max-w-2xl self-end text-base leading-7 text-[#526783]">Chaque intervention articule l’analyse et l’automatisation : faire apparaître le bon signal, installer la bonne règle, puis laisser l’équipe se concentrer sur ce qui demande réellement son attention.</p>
          </div>

          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {loading && <p className="col-span-full py-8 text-sm font-semibold text-[#526783]">Chargement des services…</p>}
            {!loading && services.length === 0 && <p className="col-span-full rounded-2xl bg-[#FFF4ED] p-6 text-sm text-[#843218]">Les données des services ne sont pas disponibles pour le moment.</p>}
            {services.map((service, index) => {
              const accent = accentClasses[service.accent];
              return (
            <article key={service.id} className={`group relative flex min-h-[550px] flex-col overflow-hidden rounded-[1.6rem] border border-[#142346]/10 bg-white p-6 paper-card transition duration-200 hover:-translate-y-1 ${index === 1 ? 'lg:translate-y-8' : ''}`}>
                  <div className="relative h-40 overflow-hidden rounded-2xl bg-[#F0F3FF]">
                    <img src={service.visual} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] ${accent.badge}`}>{service.index} · {service.label}</span>
                    <span className={`signal-point absolute right-4 top-4 h-3 w-3 rounded-full ${accent.dot}`} />
                  </div>
                  <div className={`mt-5 h-1 w-11 rounded-full ${accent.line}`} />
                  <h3 className="mt-4 font-display text-3xl leading-[0.98] tracking-[-0.03em] text-[#142346]">{service.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#526783]">{service.summary}</p>
                  <div className="mt-5 border-t border-[#142346]/10 pt-4"><p className="text-[9px] font-extrabold uppercase tracking-[0.17em] text-[#2446E8]">Source workspace</p><div className="mt-2 flex flex-wrap gap-1.5">{service.stack.slice(0, 3).map((item) => <span key={item} className="rounded-full bg-[#EEF2FF] px-2.5 py-1 text-[10px] font-extrabold text-[#385070]">{item}</span>)}</div></div>
                  <button type="button" onClick={() => setActiveService(service)} className={`mt-auto inline-flex items-center justify-between border-t border-[#142346]/10 pt-5 text-left text-sm font-extrabold text-[#142346] transition ${accent.button}`}>
                    Voir le cas d’usage <ArrowUpRight size={17} />
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <section id="demos" className="relative bg-[#EEF2FF] py-24 lg:py-32">
          <div className="absolute left-0 top-10 h-24 w-24 rounded-r-full bg-[#B7E658] opacity-70" />
          <div className="relative mx-auto max-w-7xl px-5 lg:px-9">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="eyebrow">Preuves à remplacer par vos captures</p>
                <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[0.98] tracking-[-0.035em] text-[#142346] sm:text-5xl">Deux cadres de démonstration, prêts pour vos véritables écrans.</h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-[#526783]">Les contenus restent volontairement identifiés comme des démonstrations. Vos deux captures viendront remplacer les illustrations de contexte.</p>
            </div>
            <div className="mt-12 grid gap-8 lg:grid-cols-[1.18fr_0.82fr]">
              <article className="overflow-hidden rounded-[1.75rem] bg-[#142346] p-3 shadow-2xl shadow-[#142346]/20">
                <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-3">
                  <i className="h-2 w-2 rounded-full bg-[#F3845F]" /><i className="h-2 w-2 rounded-full bg-[#F3D56B]" /><i className="h-2 w-2 rounded-full bg-[#B7E658]" />
                  <span className="ml-3 text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">Capture 01 · sentiment_dashboard</span>
                </div>
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-[#DDE4FF]">
                  <img src="/manus-storage/sentiment-analysis-visual_2ff0d8f1.png" alt="Emplacement de la capture de l’analyse des sentiments" className="h-full w-full object-cover opacity-95" />
                  <div className="absolute inset-0 grid place-items-center bg-[#142346]/25 p-6 text-center">
                    <div className="rounded-2xl border border-white/30 bg-[#142346]/75 px-5 py-4 text-white backdrop-blur-md"><p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#D3F28A]">Votre capture 01</p><p className="mt-2 text-sm font-bold">Analyse des sentiments</p></div>
                  </div>
                </div>
              </article>
              <article className="rounded-[1.75rem] border border-[#142346]/10 bg-[#FFFDF6] p-7 paper-card">
                <p className="eyebrow">Démonstration 01</p>
                <h3 className="mt-4 font-display text-4xl leading-none tracking-[-0.035em] text-[#142346]">Du verbatim à une lecture priorisée.</h3>
                <p className="mt-5 text-sm leading-6 text-[#526783]">Mettre en relation le volume, la tonalité et les thèmes pour distinguer la tendance qui évolue du message isolé.</p>
                <div className="mt-8 space-y-3">
                  {['Tonalité dominante', 'Thèmes récurrents', 'Évolution hebdomadaire'].map((metric) => <div key={metric} className="flex items-center justify-between border-b border-[#142346]/10 pb-3 text-sm font-bold text-[#142346]"><span>{metric}</span><span className="h-2.5 w-2.5 rounded-full bg-[#B7E658]" /></div>)}
                </div>
              </article>
            </div>
            <div className="mt-8 grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
              <article className="order-2 rounded-[1.75rem] border border-[#142346]/10 bg-[#FFFDF6] p-7 paper-card lg:order-1">
                <p className="eyebrow">Démonstration 02</p>
                <h3 className="mt-4 font-display text-4xl leading-none tracking-[-0.035em] text-[#142346]">De Gmail au point hebdomadaire.</h3>
                <p className="mt-5 text-sm leading-6 text-[#526783]">Une même vue peut montrer ce qui a été classé, les exceptions prioritaires et les éléments remontés dans le compte rendu de la semaine.</p>
                <div className="mt-8 flex flex-wrap gap-2"><span className="rounded-full bg-[#FFD0BE] px-3 py-1.5 text-xs font-extrabold text-[#843218]">Prospects</span><span className="rounded-full bg-[#D3F28A] px-3 py-1.5 text-xs font-extrabold text-[#20460F]">Support</span><span className="rounded-full bg-[#CCD7FF] px-3 py-1.5 text-xs font-extrabold text-[#1A2D92]">Synthèse</span></div>
              </article>
              <article className="order-1 overflow-hidden rounded-[1.75rem] bg-white p-3 paper-card lg:order-2">
                <div className="flex items-center gap-1.5 border-b border-[#142346]/10 px-3 py-3"><i className="h-2 w-2 rounded-full bg-[#F3845F]" /><i className="h-2 w-2 rounded-full bg-[#F3D56B]" /><i className="h-2 w-2 rounded-full bg-[#B7E658]" /><span className="ml-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#526783]">Capture 02 · Gmail + weekly_summary</span></div>
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-[#FFF1EB]">
                  <img src="/manus-storage/email-automation-visual_6e7059c6.png" alt="Emplacement de la capture de classification des emails et du compte rendu hebdomadaire" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 grid place-items-center bg-[#142346]/20 p-6 text-center"><div className="rounded-2xl border border-white/35 bg-white/90 px-5 py-4 text-[#142346] shadow-lg"><p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#2446E8]">Votre capture 02</p><p className="mt-2 text-sm font-bold">Classification & compte rendu</p></div></div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="method" className="mx-auto max-w-7xl px-5 py-24 lg:px-9 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="eyebrow data-ribbon">Une méthode sans détour</p>
              <h2 className="mt-4 font-display text-4xl leading-[0.98] tracking-[-0.035em] text-[#142346] sm:text-5xl">D’abord clarifier. Ensuite automatiser.</h2>
              <p className="mt-6 max-w-sm text-sm leading-6 text-[#526783]">La technologie sert une routine de travail nette. Le périmètre, les règles et les bons indicateurs sont définis avant toute ligne de script.</p>
            </div>
            <ol className="border-t border-[#142346]/15">
              {process.map(([number, title, description], index) => <li key={number} className="group grid grid-cols-[54px_1fr_auto] gap-4 border-b border-[#142346]/15 py-5 sm:grid-cols-[76px_1fr_auto] sm:py-6"><span className="font-display text-2xl italic text-[#2446E8]">{number}</span><div><h3 className="flex items-center gap-2 text-base font-extrabold text-[#142346]">{title}{index === 3 && <span className="signal-point h-2 w-2 rounded-full bg-[#B7E658]" />}</h3><p className="mt-1 max-w-lg text-sm leading-6 text-[#526783]">{description}</p></div><ChevronRight className="mt-1 text-[#B7E658] transition group-hover:translate-x-1" /></li>)}
            </ol>
          </div>
        </section>

        <section className="bg-[#D3F28A] px-5 py-16 lg:px-9 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div><p className="eyebrow text-[#20460F]">Ce que l’on mesure ensemble</p><h2 className="mt-3 max-w-3xl font-display text-4xl leading-[0.98] tracking-[-0.035em] text-[#142346] sm:text-5xl">Moins de tâches invisibles. Plus de décisions traçables.</h2></div>
            <div className="max-w-lg border-l border-[#20460F]/30 pl-5 text-sm leading-6 text-[#20460F]">Les gains ne sont jamais inventés : ils s’observent avec vos propres indicateurs — volume traité, taux de classification, temps économisé, délai de réponse, thèmes remontés et rapports envoyés.</div>
          </div>
        </section>

        <section id="contact" className="relative bg-[#142346] px-5 py-24 text-white lg:px-9 lg:py-32">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-bl-full bg-[#2446E8] opacity-90" />
          <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div><p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#D3F28A]">La première question est simple</p><h2 className="mt-4 max-w-lg font-display text-5xl leading-[0.95] tracking-[-0.04em]">Quel signal voudriez-vous ne plus jamais manquer ?</h2><p className="mt-7 max-w-md text-sm leading-6 text-white/65">Parlons de votre boîte Gmail, de vos données de suivi ou de votre routine de reporting. Nous pourrons identifier le premier flux à clarifier.</p><div className="mt-9 space-y-3 text-sm font-bold"><p className="flex items-center gap-3"><Mail size={16} className="text-[#D3F28A]" /> Votre formulaire est prêt à être connecté à votre adresse professionnelle.</p><p className="flex items-center gap-3"><MessageSquareText size={16} className="text-[#D3F28A]" /> Réponse attendue : selon vos modalités de contact.</p></div></div>
            <form onSubmit={submitContact} className="rounded-[1.75rem] bg-white p-6 text-[#142346] shadow-2xl shadow-black/15 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2"><label className="text-xs font-extrabold">Nom<input required name="name" className="mt-2 w-full border-b border-[#142346]/20 bg-transparent px-0 py-3 text-sm outline-none transition focus:border-[#2446E8]" placeholder="Votre nom" /></label><label className="text-xs font-extrabold">Email<input required type="email" name="email" className="mt-2 w-full border-b border-[#142346]/20 bg-transparent px-0 py-3 text-sm outline-none transition focus:border-[#2446E8]" placeholder="vous@entreprise.com" /></label></div><label className="mt-6 block text-xs font-extrabold">Quel flux souhaitez-vous améliorer ?<textarea required name="message" rows={5} className="mt-2 w-full resize-none border-b border-[#142346]/20 bg-transparent px-0 py-3 text-sm outline-none transition focus:border-[#2446E8]" placeholder="Ex. Nous voulons mieux prioriser les demandes reçues sur Gmail…" /></label><button className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#2446E8] px-5 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#142346] active:scale-[.97]" type="submit">Demander un audit de flux <ArrowUpRight size={17} /></button>{messageSent && <p className="mt-4 flex items-center gap-2 text-sm font-bold text-[#20460F]"><Check size={16} /> Message enregistré dans cette démonstration — connectez le formulaire à votre canal de réception.</p>}</form>
          </div>
        </section>
      </main>

      <footer className="bg-[#142346] px-5 pb-8 text-white/50 lg:px-9"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 border-t border-white/10 pt-6 text-[11px] font-semibold sm:flex-row"><p>© 2026 · Data Insights Analyst</p><p>Google Workspace · Google Apps Script · Automatisations sur mesure</p></div></footer>

      {activeService && <div className="fixed inset-0 z-50 grid place-items-center bg-[#142346]/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={`Cas d’usage ${activeService.title}`}><div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[1.75rem] bg-[#FFFDF6] p-6 shadow-2xl sm:p-9"><button type="button" onClick={() => setActiveService(null)} aria-label="Fermer" className="absolute right-5 top-5 rounded-full border border-[#142346]/10 p-2 transition hover:bg-[#EEF2FF]"><X size={18} /></button><p className="eyebrow">{activeService.caseStudy.eyebrow}</p><h2 className="mt-4 max-w-xl font-display text-4xl leading-[0.98] tracking-[-0.035em] text-[#142346]">{activeService.caseStudy.title}</h2><p className="mt-5 max-w-2xl text-sm leading-6 text-[#526783]">{activeService.caseStudy.description}</p><div className="mt-7 grid gap-4 rounded-2xl bg-[#EEF2FF] p-5 sm:grid-cols-2"><div><p className="text-[10px] font-extrabold uppercase tracking-[0.17em] text-[#2446E8]">Le problème</p><p className="mt-2 text-sm leading-6 text-[#385070]">{activeService.challenge}</p></div><div><p className="text-[10px] font-extrabold uppercase tracking-[0.17em] text-[#2446E8]">Le flux proposé</p><p className="mt-2 text-sm leading-6 text-[#385070]">{activeService.solution}</p></div></div><div className="mt-7"><p className="text-[10px] font-extrabold uppercase tracking-[0.17em] text-[#2446E8]">Ce que l’on suit</p><div className="mt-3 flex flex-wrap gap-2">{activeService.caseStudy.metrics.map((metric) => <span key={metric} className="rounded-full border border-[#142346]/10 bg-white px-3 py-2 text-xs font-bold text-[#385070]">{metric}</span>)}</div></div><div className="mt-8 flex flex-wrap gap-2">{activeService.stack.map((item) => <span key={item} className="rounded-full bg-[#142346] px-3 py-2 text-xs font-bold text-white">{item}</span>)}</div></div></div>}
    </div>
  );
}
