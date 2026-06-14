import React, { useState, useEffect } from 'react';
import { UserProfile, MacroReport, Meal } from './types';
import MacroCalculator from './components/MacroCalculator';
import DietConstructor from './components/DietConstructor';
import ProgressAdjuster from './components/ProgressAdjuster';
import BonusesSection from './components/BonusesSection';
import PremiumPromo from './components/PremiumPromo';
import SocialProofAndMobileCTA from './components/SocialProofAndMobileCTA';
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
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 relative space-y-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30 shadow-2xs animate-pulse">
            <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400/50" />
            ¡OFERTA DE LANZAMIENTO ACTIVA HOY!
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7.5xl font-black text-white tracking-tight leading-none font-display">
            Baja de Peso Sin Dietas <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">Imposibles ni Horas</span> Contando Calorías
          </h1>

          <p className="text-md sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-semibold">
            La app que crea tus menús personalizados y calcula automáticamente tus calorías para que pierdas peso de forma simple, organizada y sostenible.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="#checkout-pricing-section"
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-black font-black text-sm uppercase tracking-wider px-8 py-4 rounded-2xl transition-all shadow-[0_0_30px_rgba(249,115,22,0.3)] flex items-center justify-center gap-1.5 transform hover:-translate-y-0.5 duration-200"
            >
              👉 Acceso Completo Por Solo 19 €
            </a>
            <button
              onClick={() => {
                const el = document.getElementById('tabs-navigation-anchor');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                setActiveTab('calculator');
              }}
              className="w-full sm:w-auto text-white bg-white/5 border border-white/10 hover:bg-white/10 font-bold text-xs p-4 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              Probar Generador de Dieta Gratis
            </button>
          </div>

          {/* HIGH-FIDELITY INTERACTIVE APP MOCKUP PREVIEW (Representing the requested image visual) */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-5 md:p-6 shadow-2xl relative overflow-hidden backdrop-blur-md max-w-3xl mx-auto text-left space-y-6">
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                <span className="text-[10px] text-white/40 uppercase font-bold font-mono tracking-widest ml-1.5">Macro Fácil v1.2 Premium</span>
              </div>
              <span className="bg-orange-500/20 text-orange-400 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border border-orange-500/30 flex items-center gap-1 animate-pulse">
                <Sparkles className="w-3 h-3 text-orange-400" /> VISTA PREVIA INTERACTIVA
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Card 1: Calculadora automática */}
              <div className="bg-[#0c0c14] p-4 rounded-2xl border border-white/5 space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-bold text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-md border border-orange-500/15 uppercase block w-fit font-mono">1. Calculadora de Calorías</span>
                  <p className="text-[11px] text-white/60 mt-2">Déficit calórico exacto sin estimaciones aleatorias, basado en tu actividad.</p>
                </div>
                <div className="py-2 text-center bg-white/5 rounded-xl border border-white/5">
                  <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200 font-mono">1,824<span className="text-xs text-white/60 ml-0.5">kcal</span></div>
                  <div className="text-[9px] text-white/40 font-bold uppercase mt-0.5">Déficit Diario Recomendado</div>
                </div>
              </div>

              {/* Card 2: Menús personalizados */}
              <div className="bg-[#0c0c14] p-4 rounded-2xl border border-white/5 space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-bold text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-md border border-orange-500/15 uppercase block w-fit font-mono">2. Planes de comidas</span>
                  <p className="text-[11px] text-white/60 mt-2">Platos rápidos organizados que eliminan la duda de qué comer cada día.</p>
                </div>
                <div className="space-y-1.5">
                  <div className="p-1 px-2.5 rounded-lg bg-white/5 border border-white/5 flex justify-between items-center text-[10px]">
                    <span className="font-bold text-white">🥣 Desayuno Avena</span>
                    <span className="text-orange-400 font-mono font-bold">320g</span>
                  </div>
                  <div className="p-1 px-2.5 rounded-lg bg-white/5 border border-white/5 flex justify-between items-center text-[10px]">
                    <span className="font-bold text-white">🥘 Wok Pollo y Broc</span>
                    <span className="text-orange-400 font-mono font-bold">410g</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Control de Progreso */}
              <div className="bg-[#0c0c14] p-4 rounded-2xl border border-white/5 space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-bold text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-md border border-orange-500/15 uppercase block w-fit font-mono">3. Ajuste de Progreso</span>
                  <p className="text-[11px] text-white/60 mt-2">Ajuste semanal automático de peso para prevenir mesetas en la pérdida de peso.</p>
                </div>
                <div className="p-2 py-1 bg-white/5 border border-white/5 rounded-xl space-y-1 text-[10px] font-mono">
                  <div className="flex justify-between"><span>Semana 1:</span> <span className="font-bold text-orange-400">-1.4 kg</span></div>
                  <div className="flex justify-between"><span>Semana 2:</span> <span className="font-bold text-orange-400">-0.9 kg</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* LO QUE VAS A DESBLOQUEAR SECTION */}
          <div className="pt-8 border-t border-white/10 max-w-3xl mx-auto space-y-5 text-left bg-white/2-0.5 p-6 rounded-3xl border border-white/5">
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight font-display text-center">
              Lo Que Vas a Desbloquear con el Sistema
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2 text-xs sm:text-sm text-white/80">
              <div className="flex items-start gap-2.5 bg-black/40 p-3 rounded-xl border border-white/5">
                <Check className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <span><strong>Menús personalizados</strong> adaptados a tus objetivos de pérdida de peso.</span>
              </div>
              <div className="flex items-start gap-2.5 bg-black/40 p-3 rounded-xl border border-white/5">
                <Check className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <span><strong>Calculadora automática</strong> de calorías para saber exactamente cuánto comer.</span>
              </div>
              <div className="flex items-start gap-2.5 bg-black/40 p-3 rounded-xl border border-white/5">
                <Check className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <span><strong>Control total</strong> de tu alimentación sin tener que usar hojas de cálculo ni apps complicadas.</span>
              </div>
              <div className="flex items-start gap-2.5 bg-black/40 p-3 rounded-xl border border-white/5">
                <Check className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <span><strong>Planificación diaria</strong> que elimina para siempre la duda de qué comer en cada momento.</span>
              </div>
              <div className="flex items-start gap-2.5 bg-black/40 p-3 rounded-xl border border-white/5 md:col-span-2">
                <Check className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <span><strong>Método totalmente simple</strong> para mantener el déficit calórico real sin llegar a sentir que estás a dieta estricta.</span>
              </div>
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

      {/* 5. EXPLICACIÓN DEL PRODUCTO & EJEMPLO PRÁCTICO */}
      <section className="py-16 px-4 max-w-4xl mx-auto space-y-12">
        {/* Explicación del Producto */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2 text-orange-400">
            <Sparkles className="w-5 h-5" />
            <span className="text-xs uppercase font-extrabold tracking-widest">Explicación del Producto</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
            Por Qué la Mayoría de las Personas No Logran Sus Objetivos
          </h3>
          <div className="text-xs sm:text-sm text-white/75 space-y-4 leading-relaxed font-medium">
            <p>
              Perder peso no suele fracasar por falta de motivación. Fracasa porque la mayoría de las personas no saben cuánto comer, qué comer o cómo organizarse. Al no tener un plan claro y medible, es habitual terminar comiendo de más o frustrándose al no ver resultados.
            </p>
            <p className="border-l-2 border-orange-500 pl-4 py-1 italic font-semibold text-white">
              "Menos dudas. Menos errores. Más resultados."
            </p>
            <p>
              Esta aplicación resuelve esta barrera de manera definitiva: calcula de manera científica tus necesidades personalizadas, genera menús fáciles de preparar y te da el control exacto de tu déficit calórico sin estrés ni complicaciones.
            </p>
          </div>
        </div>

        {/* Ejemplo Práctico split layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-red-400 bg-red-500/20 px-2.5 py-0.5 rounded-md border border-red-500/10 w-fit block font-mono">Antes de la App</span>
              <h4 className="text-sm font-extrabold text-white mt-2">Intentar perder 8 kilos improvisando</h4>
              <p className="text-xs text-white/60 leading-relaxed mt-2">
                Tratas de seguir pautas genéricas o dietas estrictas de internet. El lunes y martes comes de forma restrictiva, pero el miércoles por falta de tiempo y planificación terminas pidiendo comida rápida. Al cabo de un mes, el peso sigue inmóvil y la frustración aumenta enormemente.
              </p>
            </div>
            <div className="text-[10px] text-red-400/85 font-bold italic pt-2 border-t border-white/5">
              🛑 Alta probabilidad de frustración y abandono temprano.
            </div>
          </div>

          <div className="bg-emerald-500/15 border border-emerald-500/20 rounded-2xl p-6 space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded-md border border-emerald-500/10 w-fit block font-mono">Con la App Macro Fácil</span>
              <h4 className="text-sm font-extrabold text-white mt-2">Proceso organizado en 15 minutos</h4>
              <p className="text-xs text-white/80 leading-relaxed mt-2">
                Sabe de antemano qué comer cada día, tiene los ingredientes listos gracias a la lista inteligente de compras personalizada, y prepara sus menús favoritos de forma flexible ajustando los gramos en vivo.
              </p>
            </div>
            <div className="text-[10px] text-emerald-400 font-bold italic pt-2 border-t border-white/5 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Proceso simple, organizado y fácil de mantener a largo plazo.
            </div>
          </div>
        </div>

        {/* LO QUE VAS A APRENDER (MAPPED STEPS) */}
        <div className="pt-8 border-t border-white/10 max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest block">PASOS CLAVE DEL MÉTODO</span>
            <h4 className="text-2xl sm:text-3xl font-black text-white font-display">Lo Que Vas a Aprender</h4>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 border border-white/5 hover:border-white/10 rounded-2xl p-5 flex items-start gap-4 transition-all">
              <div className="w-8 h-8 rounded-full bg-orange-500/25 border border-orange-500/30 text-orange-400 font-black text-xs sm:text-sm flex items-center justify-center shrink-0">
                01
              </div>
              <div className="space-y-0.5">
                <strong className="text-xs sm:text-sm font-extrabold text-white block">Paso 01: Conocer Tus Necesidades Reales</strong>
                <p className="text-[11px] sm:text-xs text-white/70 leading-relaxed">
                  Descubre cuántas calorías necesita tu cuerpo según tu edad, peso, actividad física y objetivo. Sin estimaciones aleatorias. Sin adivinanzas.
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/5 hover:border-white/10 rounded-2xl p-5 flex items-start gap-4 transition-all">
              <div className="w-8 h-8 rounded-full bg-orange-500/25 border border-orange-500/30 text-orange-400 font-black text-xs sm:text-sm flex items-center justify-center shrink-0">
                02
              </div>
              <div className="space-y-0.5">
                <strong className="text-xs sm:text-sm font-extrabold text-white block">Paso 02: Seguir Menús Diseñados Para Tu Objetivo</strong>
                <p className="text-[11px] sm:text-xs text-white/70 leading-relaxed">
                  Recibe planes de alimentación organizados para facilitar cada día y mantener el control de tu progreso.
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/5 hover:border-white/10 rounded-2xl p-5 flex items-start gap-4 transition-all">
              <div className="w-8 h-8 rounded-full bg-orange-500/25 border border-orange-500/30 text-orange-400 font-black text-xs sm:text-sm flex items-center justify-center shrink-0">
                03
              </div>
              <div className="space-y-0.5">
                <strong className="text-xs sm:text-sm font-extrabold text-white block">Paso 03: Ajustar y Mejorar Tus Resultados</strong>
                <p className="text-[11px] sm:text-xs text-white/70 leading-relaxed">
                  Aprende a modificar tu alimentación según avances para seguir perdiendo peso de forma constante y sostenible.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* AUTOR / EQUIPO BOX */}
        <div className="pt-8 border-t border-white/10 max-w-3xl mx-auto">
          <div className="bg-white/5 border border-white/5 rounded-2xl p-6 text-center md:text-left flex flex-col md:flex-row items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-orange-500 to-amber-300 flex items-center justify-center font-black text-black text-lg shrink-0 shadow-lg">
              MF
            </div>
            <div className="space-y-1.5">
              <span className="text-[9px] font-bold text-orange-400 uppercase tracking-widest block">Sobre el Autor</span>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-semibold">
                Creado por un equipo apasionado por la nutrición, la tecnología y la mejora personal. Nuestra misión es simplificar la pérdida de peso para que cualquier persona pueda obtener resultados reales con herramientas prácticas y fáciles de usar.
              </p>
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
      <SocialProofAndMobileCTA />
    </div>
  );
}
