import React, { useState, useEffect } from 'react';
import { UserProfile, MacroReport, Meal } from './types';
import MacroCalculator from './components/MacroCalculator';
import DietConstructor from './components/DietConstructor';
import ProgressAdjuster from './components/ProgressAdjuster';
import BonusesSection from './components/BonusesSection';
import PremiumPromo from './components/PremiumPromo';
import {
  Flame, Check, Star, Calculator, Utensils, RefreshCw, Bookmark, Award, HelpCircle,
  ChevronDown, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Heart, Clock
} from 'lucide-react';

const DEFAULT_MEALS: Meal[] = [
  { id: 'desayuno', name: 'Desayuno', items: [] },
  { id: 'almuerzo', name: 'Almuerzo / Comida Principal', items: [] },
  { id: 'merienda', name: 'Merienda / Snack', items: [] },
  { id: 'cena', name: 'Cena / Última Comida', items: [] },
];
export default function App() {
  // Global calculation states
  const [userProfile, setUserProfile] = useState<UserProfile>({
    gender: 'male',
    age: 28,
    weight: 78,
    height: 176,
    activity: 'moderate',
    goal: 'lose',
  });

  const [macroReport, setMacroReport] = useState<MacroReport>({
    bmr: 1705,
    tdee: 2642,
    targetCalories: 2142,
    proteinGrams: 172,
    carbGrams: 184,
    fatGrams: 66,
    proteinCals: 688,
    carbCals: 736,
    fatCals: 594,
  });

  // Keep track of meals from localStorage for export preview
  const [currentDietMeals, setCurrentDietMeals] = useState<Meal[]>(DEFAULT_MEALS);

  // Tab state
  const [activeTab, setActiveTab] = useState<'calculator' | 'constructor' | 'adjuster' | 'bonuses'>('calculator');

  // FAQ state
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({
    0: true, // open first by default
  });

  const toggleFaq = (index: number) => {
    setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const handleProfileCalculated = (report: MacroReport, profile: UserProfile) => {
    setMacroReport(report);
    setUserProfile(profile);
  };

  // Poll localStorage occasionally to show live counts in premium export preview
  useEffect(() => {
    const fetchLocalMeals = () => {
      const saved = localStorage.getItem('macro_facil_meals');
      if (saved) {
        try {
          setCurrentDietMeals(JSON.parse(saved));
        } catch (e) { /* ignore */ }
      }
    };
    fetchLocalMeals();
    // Add custom window listener for tab switches or mutations
    window.addEventListener('storage', fetchLocalMeals);
    return () => window.removeEventListener('storage', fetchLocalMeals);
  }, [activeTab]);

  const faqs = [
    {
      q: '¿Necesito conocimientos previos de nutrición?',
      a: 'No, en absoluto. Toda la parte compleja (metabolismo basal, factor de actividad, división de macros e índice glicémico) ya está programada en el motor inteligente. Solo necesitas mover los deslizadores de tus datos reales, elegir tu objetivo, y rellenar las porciones de comida diaria.'
    },
    {
      q: '¿Cuánto tiempo necesito para construir mi planificación?',
      a: 'La mayoría de los usuarios tarda menos de 15 minutos. El constructor te permite buscar ingredientes, ajustar raciones en ráfaga e incluso copiar menús listos prediseñados adaptados a tu objetivo diario en un solo clic.'
    },
    {
      q: '¿Funciona de verdad tanto para perder grasa como para ganar músculo?',
      a: 'Sí. El motor de cálculo se adapta dinámicamente: si eliges perder grasa aplica un déficit saludable con aporte proteico óptimo para blindar masa magra; si eliges ganar músculo, aplica un superávit progresivo controlado.'
    },
    {
      q: '¿Necesito instalar software o aplicaciones de pago adicionales?',
      a: 'No. El sistema de cálculo y constructor funciona al 100% de manera gratuita en este navegador. Optativamente, si deseas guardar el panel permanente en tu móvil, puedes desbloquear la Plantilla Notion que se integra a tu cuenta gratuita.'
    },
    {
      q: '¿Recibiré futures mejoras y actualizaciones?',
      a: 'Sí, ¡al 150%! Todas las actualizaciones de fórmulas de metabolismo, nuevos ingredientes en la biblioteca y guías de bonos adicionales están incluidas de por vida para los miembros actuales de Macro Fácil.'
    }
  ];

  return (
    <div className="bg-[#0a0a0f] text-white font-sans min-h-screen selection:bg-orange-500/20 selection:text-orange-355 leading-relaxed relative overflow-hidden">
      
      {/* Absolute floating glow blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" id="decorative-bg-blur"></div>

      {/* 1. COMPACT TOP HEADER */}
      <header className="border-b border-white/10 sticky top-0 z-45 backdrop-blur-xl bg-[#0a0a0f]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center font-black text-black text-base shadow-md">
              M
            </div>
            <span className="font-extrabold text-white tracking-tighter text-lg font-display">
              MACRO<span className="text-orange-400">FÁCIL</span>
            </span>
          </div>

          {/* Quick tabs indicators */}
          <nav className="hidden md:flex items-center gap-1.5">
            <button
              onClick={() => { setActiveTab('calculator'); }}
              className={`px-3 py-1.5 text-xs font-extrabold rounded-lg transition-all ${
                activeTab === 'calculator' ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              Calculadora
            </button>
            <button
              onClick={() => { setActiveTab('constructor'); }}
              className={`px-3 py-1.5 text-xs font-extrabold rounded-lg transition-all ${
                activeTab === 'constructor' ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              Constructor
            </button>
            <button
              onClick={() => { setActiveTab('adjuster'); }}
              className={`px-3 py-1.5 text-xs font-extrabold rounded-lg transition-all ${
                activeTab === 'adjuster' ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              Progreso
            </button>
            <button
              onClick={() => { setActiveTab('bonuses'); }}
              className={`px-3 py-1.5 text-xs font-extrabold rounded-lg transition-all ${
                activeTab === 'bonuses' ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              Bonos Incluidos
            </button>
          </nav>

          {/* Header Action Button */}
          <div>
            <a
              href="#checkout-pricing-section"
              className="bg-orange-500 hover:bg-orange-600 text-black font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)] flex items-center gap-1.5"
            >
              Obtener Plantilla
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* 2. PERSUASIVE VISUAL HERO BANNER */}
      <section className="relative overflow-hidden pt-12 pb-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 relative space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30 shadow-2xs">
            <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400/50" />
            Menos de 15 minutos • Sin cálculos complicados ni fórmulas imposibles
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tight leading-none font-display">
            Construye tu dieta <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">personalizada.</span>
          </h1>

          <p className="text-md sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
            Sin nutricionista, sin fórmulas imposibles y sin copiar dietas de internet. El sistema inteligente que convierte calorías en comidas reales.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                const el = document.getElementById('tabs-navigation-anchor');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                setActiveTab('calculator');
              }}
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-black font-black text-sm uppercase tracking-wider px-8 py-4 rounded-2xl transition-all shadow-[0_0_30px_rgba(249,115,22,0.3)] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              👉 QUIERO MI DIETA AHORA
            </button>
            <a
              href="#checkout-pricing-section"
              className="w-full sm:w-auto text-white/60 hover:text-white font-bold text-xs p-3 transition-all flex items-center justify-center gap-1"
            >
              <Clock className="w-4 h-4 text-orange-400" /> Lanzamiento Oferta: Pay-What-You-Want 19€
            </a>
          </div>

          {/* Social Proof items */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/10 max-w-3xl mx-auto text-left text-xs text-white/60">
            <div className="flex items-start gap-2 bg-white/5 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
              <Check className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
              <span><strong>01. Introduces datos</strong>: Tus objetivos y nivel de actividad real.</span>
            </div>
            <div className="flex items-start gap-2 bg-white/5 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
              <Check className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
              <span><strong>02. Sistema calcula</strong>: Macros exactos automáticamente sin errores.</span>
            </div>
            <div className="flex items-start gap-2 bg-white/5 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
              <Check className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
              <span><strong>03. Creas tu plan</strong>: Eliges comidas de la biblioteca integrada.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE INTERACTIVE WORKSPACE TABS (Anchored) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="tabs-navigation-anchor">
        {/* Visual category tabs selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-1.5 rounded-2xl flex flex-wrap sm:flex-nowrap gap-1 w-full max-w-2xl">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-3.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'calculator'
                  ? 'bg-orange-500 text-black shadow-md border border-orange-400'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Calculator className="w-4 h-4" />
              1. Calculadora de Macros
            </button>

            <button
              id="diet-constructor-tab-btn"
              onClick={() => setActiveTab('constructor')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-3.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'constructor'
                  ? 'bg-orange-500 text-black shadow-md border border-orange-400'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Utensils className="w-4 h-4" />
              2. Constructor de Dietas
            </button>

            <button
              onClick={() => setActiveTab('adjuster')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-3.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'adjuster'
                  ? 'bg-orange-500 text-black shadow-md border border-orange-400'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <RefreshCw className="w-4 h-4" />
              3. Ajustador de Progreso
            </button>

            <button
              onClick={() => setActiveTab('bonuses')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-3.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'bonuses'
                  ? 'bg-orange-500 text-black shadow-md border border-orange-400'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Award className="w-4 h-4" />
              4. Bonos Incluidos
            </button>
          </div>
        </div>

        {/* ACTIVE TAB RENDER ENGINE */}
        <div className="transition-all duration-300">
          {activeTab === 'calculator' && (
            <MacroCalculator
              initialProfile={userProfile}
              onCalculate={handleProfileCalculated}
            />
          )}

          {activeTab === 'constructor' && (
            <DietConstructor
              targetMacros={macroReport}
              userProfile={userProfile}
            />
          )}

          {activeTab === 'adjuster' && (
            <ProgressAdjuster
              currentProfile={userProfile}
              currentMacros={macroReport}
            />
          )}

          {activeTab === 'bonuses' && (
            <BonusesSection />
          )}
        </div>
      </section>

      {/* 4. PREMIUM OFFER PROMOTION WITH LIVE DIET LINK */}
      <section className="bg-white/2-0.5 py-16 px-4 border-y border-white/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h4 className="text-3xl font-black tracking-tight text-white font-display">¡Llévate Tu Dieta Integrada Con Notion!</h4>
            <p className="text-xs text-white/50 mt-1">Conecta tus números de hoy con el panel original para llevar un seguimiento diario infalible.</p>
          </div>

          <PremiumPromo
            userProfile={userProfile}
            calculatedReport={macroReport}
            currentDietMeals={currentDietMeals}
          />
        </div>
      </section>

      {/* 5. COPIED COPY SECTIONS: EL PROBLEMA Y LA SOLUCIÓN */}
      <section className="py-16 px-4 max-w-4xl mx-auto space-y-12">
        <div className="space-y-4 text-center">
          <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight font-display">¿Por qué fallan la mayoría de los planes de comida?</h3>
          <p className="text-sm text-white/60 max-w-xl mx-auto leading-relaxed">No por falta de voluntad, sino por copiar tablas genéricas sin bases biológicas reales.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-red-500/15 p-6 rounded-2xl border border-red-550/20 space-y-2">
            <span className="font-extrabold text-xs text-red-200 bg-red-500/20 px-2 py-0.5 rounded-full inline-block">El Error Común</span>
            <h4 className="font-bold text-sm text-red-100">Seguir planes copiados de internet o influencers</h4>
            <p className="text-xs text-red-100/70 leading-relaxed">No están calculados para tu estatura, peso, composición muscular ni factor de actividad diaria actual, arruinando tu progreso hormonal.</p>
          </div>

          <div className="bg-orange-500/15 p-6 rounded-2xl border border-orange-550/20 space-y-2">
            <span className="font-extrabold text-xs text-orange-200 bg-orange-500/20 px-2 py-0.5 rounded-full inline-block">La Solución Macro Fácil</span>
            <h4 className="font-bold text-sm text-orange-100">Fórmulas Biológicas de Nutrición Personal</h4>
            <p className="text-xs text-orange-100/70 leading-relaxed">Un cálculo matemático automatizado del 100% que ajustas al milímetro con platos y productos reales que te gustan de verdad.</p>
          </div>
        </div>

        {/* Structured bullet list (WHAT YOU'RE GETTING) */}
        <div className="pt-8 border-t border-white/10 max-w-3xl mx-auto space-y-6">
          <div className="text-center">
            <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest block">¿QUÉ ES LO QUE CONSEGUIRÁS?</span>
            <h4 className="text-2xl font-black text-white mt-1 font-display">Tu Guía de Avance Total con Macro Fácil</h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-white/70">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block text-white">Saber exactamente cuántas calorías necesitas</strong>
                Sin adivinar, sin números de otras personas y sin aplicaciones imposibles.
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block text-white">Macros detallados por gramos</strong>
                Adaptado totalmente para quemar grasa, mantener peso u optimizar desarrollo muscular.
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block text-white">Convertir números en alimentos de verdad</strong>
                Porque los números no se comen. Ofrecemos una biblioteca completa para organizarlo.
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold block text-white">Dietas sostenibles</strong>
                Sin menús absurdos, sin pasar hambre y sin vivir pesando comida cada minuto.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ ACCORDION DISPLAY */}
      <section className="bg-white/2-0.5 py-16 px-4 border-t border-white/10">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/30">
              <HelpCircle className="w-3.5 h-3.5 text-orange-400" />
              Resuelve tus Dudas
            </span>
            <h3 className="text-3xl font-black text-white tracking-tight font-display">Preguntas Frecuentes</h3>
            <p className="text-xs text-white/55">¿Tienes dudas antes de empezar? Aquí tienes respuestas claras de inmediato.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = !!faqOpen[idx];
              return (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md transition-all shadow-md">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left p-4 md:p-5 font-bold text-xs sm:text-sm text-white flex justify-between items-center bg-transparent transition-colors hover:bg-white/5"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-white/40 transition-transform duration-200 ${isOpen ? 'rotate-180 text-orange-400' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="p-4 md:p-5 pt-0 bg-transparent border-t border-white/5 text-[11px] sm:text-xs text-white/70 leading-relaxed font-semibold">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. HUMBLE FOOTER */}
      <footer className="bg-black/80 text-white/50 py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-6 rounded-md bg-orange-500 flex items-center justify-center font-black text-black text-xs">
              M
            </div>
            <span className="font-extrabold text-sm text-white tracking-tight">MACRO FÁCIL</span>
          </div>
          <p className="text-white/40 text-xs max-w-sm mx-auto leading-relaxed">
            La plantilla de Notion que te permite construir una dieta personalizada en menos de 15 minutos de forma científica y automatizada.
          </p>
          <div className="pt-6 border-t border-white/5 text-[10px] text-white/30 space-y-1">
            <p>© 2026 Macro Fácil. Todos los derechos reservados.</p>
            <p>Diseño científico basado en directrices alimentarias oficiales de OMS e IDR de proteínas.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
