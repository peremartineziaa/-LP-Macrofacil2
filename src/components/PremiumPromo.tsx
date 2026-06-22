import React, { useState } from 'react';
import { UserProfile, MacroReport, Meal } from '../types';
import { Check, CreditCard, ArrowRight, Sparkles, Download, Copy, ExternalLink, Flame, ShieldCheck, Heart } from 'lucide-react';

interface PremiumPromoProps {
  userProfile: UserProfile;
  calculatedReport: MacroReport;
  currentDietMeals: Meal[];
}

export default function PremiumPromo({ userProfile, calculatedReport, currentDietMeals }: PremiumPromoProps) {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [checkoutPrice, setCheckoutPrice] = useState(19); // 19€ initial discount
  const [copiedKey, setCopiedKey] = useState(false);
  const [showUpsellPopup, setShowUpsellPopup] = useState(false);
  const [isClubVipInCheckout, setIsClubVipInCheckout] = useState(false);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Por favor rellena todos los campos.');
      return;
    }
    setShowCheckoutModal(false);
    setShowSuccessModal(true);
  };

  const getDietTextRepresentation = (): string => {
    let t = `=== MI DIETA PERSONALIZADA - MACRO FÁCIL ===\n\n`;
    t += `DATOS FÍSICOS:\n`;
    t += `- Género: ${userProfile.gender === 'male' ? 'Hombre' : 'Mujer'}\n`;
    t += `- Peso: ${userProfile.weight} kg | Altura: ${userProfile.height} cm | Edad: ${userProfile.age} años\n`;
    t += `- Objetivo: ${userProfile.goal === 'lose' ? 'Perder Grasa' : userProfile.goal === 'gain' ? 'Ganar Músculo' : 'Mantener Peso'}\n\n`;
    
    t += `REPORTE DE CALORÍAS Y MACROS:\n`;
    t += `- Calorías Diarias: ${calculatedReport.targetCalories} kcal\n`;
    t += `- Proteínas: ${calculatedReport.proteinGrams}g (${calculatedReport.proteinCals} kcal)\n`;
    t += `- Carbohidratos: ${calculatedReport.carbGrams}g (${calculatedReport.carbCals} kcal)\n`;
    t += `- Grasas Sanas: ${calculatedReport.fatGrams}g (${calculatedReport.fatCals} kcal)\n\n`;

    t += `MENÚ DIARIO CONSTRUIDO:\n`;
    let empty = true;
    currentDietMeals.forEach(meal => {
      if (meal.items.length > 0) {
        empty = false;
        t += `\n[+] ${meal.name.toUpperCase()}:\n`;
        meal.items.forEach(item => {
          const grams = item.weightGrams;
          const factor = grams / 100;
          const cal = Math.round(item.food.calories * factor);
          t += `  - ${item.food.name} (${grams}g) -> ${cal} kcal (P: ${(item.food.protein * factor).toFixed(1)}g | C: ${(item.food.carbs * factor).toFixed(1)}g | G: ${(item.food.fat * factor).toFixed(1)}g)\n`;
        });
      }
    });

    if (empty) {
      t += `(No has añadido alimentos al Constructor de Dietasún. ¡Utiliza el Constructor interactivo en la pestaña de arriba para exportar alimentos de verdad!)\n`;
    }

    t += `\nGenerado con Macro Fácil Pro - 2026`;
    return t;
  };

  const downloadDietFile = () => {
    const text = getDietTextRepresentation();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Dieta_Personalizada_MacroFacil.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const copyDietToClipboard = () => {
    const text = getDietTextRepresentation();
    navigator.clipboard.writeText(text);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleBuyBasicClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Intercept with upsell popup
    setShowUpsellPopup(true);
  };

  const handleBuyClubVipClick = (e: React.MouseEvent) => {
    // Directly go to Club VIP checkout (no upsell needed since they bought the higher plan)
    setIsClubVipInCheckout(true);
    setCheckoutPrice(29);
    setShowCheckoutModal(true);
  };

  return (
    <div className="space-y-8" id="checkout-pricing-section">
      {/* Sales Header for Pricing Section */}
      <div className="text-center space-y-3 max-w-2xl mx-auto pt-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
          <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400 animate-pulse" />
          PLANES Y TARIFAS EXCLUSIVAS
        </span>
        <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight font-display">
          Elige el Plan Perfecto Para Tu Progreso
        </h3>
        <p className="text-sm text-white/60 leading-relaxed">
          Toma el control definitivo de tu alimentación. Empieza hoy mismo tu transformación con nuestro sistema guiado y simplificado.
        </p>
      </div>

      {/* Dual Plans Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-stretch">
        
        {/* PLAN 1: PLAN BÁSICO (SISTEMA COMPLETO) */}
        <div className="bg-[#0e0e16]/80 border border-white/10 text-white rounded-3xl p-6 md:p-8 shadow-xl backdrop-blur-2xl relative overflow-hidden flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-white/50 bg-white/5 px-2.5 py-1 rounded-full border border-white/5 inline-block">Plan Acceso de Por Vida</span>
            <div className="space-y-1">
              <h4 className="text-xl sm:text-2xl font-black text-white font-display">Plan Básico / Sistema Completo</h4>
              <p className="text-xs text-white/60">Ideal para quienes quieren empezar de forma autónoma con un único pago.</p>
            </div>

            {/* Price section */}
            <div className="pt-2 border-t border-white/5 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-white font-mono">19€</span>
              <span className="text-xs text-white/40 line-through font-mono">149€</span>
              <span className="text-[10px] text-emerald-400 font-bold uppercase bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Pago único</span>
            </div>

            {/* List of features */}
            <div className="space-y-3 pt-2">
              <span className="text-[10px] uppercase tracking-wider font-bold text-white/40 block">¿Qué Incluye este Plan?</span>
              <div className="space-y-2 text-xs text-white/80">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>Acceso completo de por vida a la app interactiva</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>Creador interactivo de raciones y menús</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>Generador automático inteligente de calorías</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>Los 3 Bonos Exclusivos Incluidos gratis</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>Soporte de actualizaciones permanente</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 space-y-3 w-full">
            <a
              href="https://buy.stripe.com/7sY00k4th5Od0oseY7enS00"
              onClick={handleBuyBasicClick}
              className="w-full bg-white/10 hover:bg-white/20 text-white font-black text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5 duration-250 text-center cursor-pointer border border-white/10 shadow-md"
            >
              🚀 CONSEGUIR PLAN BÁSICO — 19€
            </a>
            <p className="text-[10px] text-white/40 text-center">Garantía de Satisfacción de 7 días adaptada sin preguntas.</p>
          </div>
        </div>

        {/* PLAN 2: CLUB VIP MACROFÁCIL (SUBSCIPCIÓN PREMIUM) */}
        <div className="bg-[#12121f]/90 border-2 border-orange-500/50 text-white rounded-3xl p-6 md:p-8 shadow-[0_4px_30px_rgba(249,115,22,0.2)] backdrop-blur-2xl relative overflow-hidden flex flex-col justify-between space-y-6">
          <div className="absolute top-0 right-0 bg-gradient-to-l from-orange-500 to-amber-500 text-black font-black text-[10px] uppercase py-1 px-4 rounded-bl-xl tracking-wider font-mono">
            🔥 MÁS RECOMENDADO
          </div>
          <div className="absolute right-0 top-0 translate-x-1/3 -translate-y-1/3 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/25 inline-block">Membresía Completa de Acompañamiento</span>
            <div className="space-y-1">
              <h4 className="text-xl sm:text-2xl font-black text-white font-display flex items-center gap-1.5">
                Club VIP MacroFácil
                <Sparkles className="w-5 h-5 text-orange-400 fill-orange-400/20" />
              </h4>
              <p className="text-xs text-white/70">Acompañamiento premium continuo y dinámicas semanales para el éxito.</p>
            </div>

            {/* Price section */}
            <div className="pt-2 border-t border-white/10 flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200 font-mono">29€</span>
              <span className="text-xs text-white/40 line-through font-mono">249€</span>
              <span className="text-[10px] text-orange-400 font-bold uppercase bg-orange-500/15 px-2.5 py-0.5 rounded-full border border-orange-500/20">Al mes</span>
            </div>

            {/* List of features */}
            <div className="space-y-3 pt-2">
              <span className="text-[10px] uppercase tracking-wider font-bold text-orange-300 block">¿Qué Incluye el Club VIP?</span>
              <div className="space-y-2 text-xs text-white/90">
                <div className="flex items-start gap-2 text-orange-300 font-bold">
                  <Check className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>Incluye TODO lo del Plan Básico</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>🔄 Nuevos menús añadidos cada mes</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>📉 Ajuste mensual de macros según tu progreso</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>💬 Grupo privado exclusivo de Telegram</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>📖 Recetario totalmente nuevo cada mes</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>🏆 Retos mensuales ("Reto -3 kg", "Reto vientre plano")</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>🎥 Consultoría grupal en directo 1 vez al mes</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>📝 Seguimiento semanal estructurado mediante formulario</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>🏅 Ranking y recompensas para aumentar adherencia</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 space-y-3 w-full">
            <a
              href="https://buy.stripe.com/3cIaEYaRF5Odgnq6rBenS03"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsClubVipInCheckout(true)}
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-black font-black text-xs uppercase tracking-wider py-3.5 px-4 rounded-xl shadow-[0_4px_25px_rgba(249,115,22,0.3)] transition-all flex items-center justify-center gap-1.5 duration-250 text-center cursor-pointer transform hover:-translate-y-0.5"
            >
              🔥 CONSEGUIR CLUB VIP — 29€/MES
              <ArrowRight className="w-4 h-4 text-black" />
            </a>
            <button
              onClick={handleBuyClubVipClick}
              className="w-full text-[10px] text-white/50 hover:text-white uppercase tracking-wider font-extrabold text-center block pt-1 hover:underline cursor-pointer"
            >
              Probar Demo del Club VIP (Simulado)
            </button>
          </div>
        </div>

      </div>

      {/* HIGHLIGHT COMPASSIONATE QUOTE */}
      <div className="max-w-3xl mx-auto pt-4 bg-white/5 border border-white/5 rounded-3xl p-6 relative overflow-hidden">
        <div className="relative text-center max-w-xl mx-auto space-y-1.5">
          <p className="text-xs text-white/60 leading-relaxed italic font-medium">
            "La diferencia entre perder peso de forma definitiva o seguir intentándolo improvisando durante años suele estar en tener un método de acompañamiento y herramientas organizadas que no compliquen tu vida diaria. Elige la alternativa que mejor se adapte a tus metas."
          </p>
        </div>
      </div>

      {/* POP-UP EXTRAORDINATIVE UPSELL MODAL */}
      {showUpsellPopup && (
        <div className="fixed inset-0 bg-[#06060c]/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#12121e] rounded-3xl max-w-lg w-full border-2 border-orange-500/60 p-6 md:p-8 space-y-6 text-white shadow-[0_0_50px_rgba(249,115,22,0.3)] relative animate-scale-in">
            {/* Absolute close icon to proceed with basic */}
            <button
              onClick={() => {
                setShowUpsellPopup(false);
                // Go to basic checkout
                setIsClubVipInCheckout(false);
                setCheckoutPrice(19);
                setShowCheckoutModal(true);
              }}
              className="absolute top-4 right-4 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 p-1.5 rounded-full transition-colors text-xs"
            >
              ✕
            </button>

            <div className="space-y-4 text-center">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-orange-500 text-black uppercase tracking-wider">
                🎁 ¡OFERTA EXCLUSIVA DE UPSELL!
              </span>
              <h4 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200 tracking-tight font-display">
                ¿Quieres Resultados Continuos?
              </h4>
              <p className="text-xs text-white/80 leading-relaxed max-w-md mx-auto">
                No te limites a un plan estático de un mes. Por solo una pequeña diferencia, optimiza tu alimentación de por vida uniéndote al selecto <strong className="text-white">Club VIP MacroFácil</strong>.
              </p>
            </div>

            {/* Why upgrade benefits */}
            <div className="bg-black/40 border border-white/5 rounded-2xl p-4 md:p-5 space-y-3">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-orange-400 block pb-1 border-b border-white/5">Lo que obtienes al unirte al Club VIP hoy:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-white/85">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>Nuevos menús todos los meses</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>Acompañamiento por Telegram</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>Consultoría grupal en vivo</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>Ajuste mensual de macros</span>
                </div>
                <div className="flex items-center gap-2 sm:col-span-2 text-orange-300 font-extrabold">
                  <Check className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>Retos mensuales y recompensas</span>
                </div>
              </div>
            </div>

            {/* Pricing difference callout */}
            <div className="text-center bg-orange-500/10 border border-orange-500/25 p-3 rounded-xl flex items-center justify-between px-5 font-mono text-xs">
              <div className="text-left">
                <span className="text-[9px] text-white/40 block uppercase">Plan Básico</span>
                <span className="font-bold text-white">19€ Único</span>
              </div>
              <div className="text-orange-400 font-extrabold text-lg flex items-center">
                👉 +10€/mes
              </div>
              <div className="text-right">
                <span className="text-[9px] text-orange-400 block uppercase font-bold">Club VIP</span>
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-150">29€ al mes</span>
              </div>
            </div>

            {/* Actions block */}
            <div className="space-y-3.5 text-center pt-2">
              <a
                href="https://buy.stripe.com/3cIaEYaRF5Odgnq6rBenS03"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  setShowUpsellPopup(false);
                }}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-black font-black text-sm uppercase tracking-wider py-4 px-6 rounded-xl shadow-[0_5px_30px_rgba(249,115,22,0.4)] transition-all flex items-center justify-center gap-1.5 duration-200 transform hover:-translate-y-0.5"
              >
                🔥 SÍ, DESEO EL CLUB VIP POR SOLO 29€/MES
                <ArrowRight className="w-4 h-4 text-black" />
              </a>

              <div className="flex flex-col sm:flex-row justify-center gap-4 text-xs font-semibold">
                <button
                  onClick={() => {
                    setShowUpsellPopup(false);
                    // Open simulation in Club VIP mode
                    setIsClubVipInCheckout(true);
                    setCheckoutPrice(29);
                    setShowCheckoutModal(true);
                  }}
                  className="text-orange-400 hover:text-orange-300 underline"
                >
                  Probar Demo del Club VIP
                </button>
                <button
                  onClick={() => {
                    setShowUpsellPopup(false);
                    // Procede to basic checkout directly
                    setIsClubVipInCheckout(false);
                    // Use standard checkout link
                    window.open('https://buy.stripe.com/7sY00k4th5Od0oseY7enS00', '_blank');
                  }}
                  className="text-white/40 hover:text-white/70 text-xs transition-all underline"
                >
                  No, gracias. Prefiero el Plan Básico y continuar por 19€
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: CHECKOUT DIALOG (SIMULATION DE CARTE) */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-[#0a0a0f]/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#0d0d14] rounded-3xl max-w-md w-full border border-white/10 p-6 md:p-8 space-y-5 text-white shadow-2xl relative animate-scale-in">
            <div className="flex justify-between items-center pb-2 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-orange-500/15 text-orange-400">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-white">Pasarela Segura</h4>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">128-Bit Encryption</p>
                </div>
              </div>
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="text-white/40 hover:text-white text-sm font-semibold p-1 cursor-pointer"
              >
                Cerrar
              </button>
            </div>

            <div className="space-y-1 text-center bg-white/5 p-3 rounded-2xl border border-white/5">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">Resumen del pedido</span>
              <span className="text-xs font-bold text-white block">
                {isClubVipInCheckout ? "Membresía Mensual Club VIP MacroFácil" : "Licencia Acceso Completo Plan Básico"}
              </span>
              <span className="text-xl font-black text-white block mt-0.5 font-mono">{checkoutPrice}€ <span className="text-xs font-semibold text-white/40">{isClubVipInCheckout ? "/mes" : ""} (IVA incl.)</span></span>
            </div>

            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Tu nombre completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-orange-500 text-xs p-3 rounded-xl outline-hidden focus:ring-1 focus:ring-orange-500 text-white font-semibold transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-white/50 mb-1">Correo Electrónico de Envío</label>
                <input
                  type="email"
                  required
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 focus:border-orange-500 text-xs p-3 rounded-xl outline-hidden focus:ring-1 focus:ring-orange-500 text-white font-semibold transition-all"
                />
                <p className="text-[9px] text-white/40 mt-1">Aquí recibirás los accesos privados del plan seleccionado.</p>
              </div>

              {/* Secure simulated payment cards */}
              <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 flex items-center justify-between gap-1">
                <span className="text-[11px] font-bold text-white/80 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-orange-400" /> Tarjeta Bancaria de Simulación
                </span>
                <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Test Activo
                </span>
              </div>

              <div className="space-y-2.5">
                <a
                  href={isClubVipInCheckout ? "https://buy.stripe.com/3cIaEYaRF5Odgnq6rBenS03" : "https://buy.stripe.com/7sY00k4th5Od0oseY7enS00"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowCheckoutModal(false)}
                  className="w-full bg-orange-500 hover:bg-orange-400 text-black font-black text-sm uppercase tracking-wider p-3.5 rounded-xl transition-all cursor-pointer block text-center"
                >
                  💳 Pagar de Verdad (Stripe Checkout)
                </a>

                <button
                  type="submit"
                  className="w-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white border border-white/10 text-xs p-2 rounded-xl transition-all cursor-pointer block text-center"
                >
                  Continuar con Prueba Simulada ({checkoutPrice}€{isClubVipInCheckout ? "/mes" : ""})
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: SUCCESS DIALOG WITH RAW TEXT EXPORT */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-[#0a0a0f]/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#0d0d14] rounded-3xl max-w-lg w-full border border-white/10 p-6 md:p-8 space-y-5 text-white shadow-2xl relative max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-500/20 text-orange-400 mx-auto animate-bounce">
                <Sparkles className="w-6 h-6 animate-spin" />
              </div>
              <h4 className="text-xl font-extrabold text-white tracking-tight">¡Bienvenido a la Experiencia VIP!</h4>
              <p className="text-xs text-white/60">
                Gracias <strong className="text-white font-bold">{name}</strong>, tu suscripción al {isClubVipInCheckout ? "Club VIP" : "Plan Básico"} se ha procesado. Aquí tienes tus accesos y reporte generado.
              </p>
            </div>

            {/* Private Telegram / Notion Access based on plan */}
            <div className="bg-white/5 text-white rounded-2xl p-4 space-y-3 border border-white/5">
              <span className="text-[9px] font-bold text-orange-400 uppercase tracking-widest block">CREDENCIALES Y RECURSOS EXCLUSIVOS</span>
              
              {isClubVipInCheckout && (
                <div className="p-2 px-3 bg-orange-500/10 border border-orange-500/20 rounded-xl space-y-1 mb-2">
                  <span className="text-[10px] font-bold text-orange-300 block">💬 ACCESO TELEGRAM VIP:</span>
                  <p className="text-xs text-white/80">Canal exclusivo de retos y soporte diario en vivo.</p>
                  <a 
                    href="https://telegram.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-orange-400 font-bold hover:underline mt-1"
                  >
                    Unirse al Canal de Telegram <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <div>
                  <span className="text-xs font-bold block text-white font-display">Plantilla "Macro Fácil v1.2" Premium</span>
                  <span className="text-[10px] text-white/40 block mt-0.5">Clave de Activación personal: <code className="text-orange-300 font-bold text-[11px] bg-white/5 px-1 py-0.5 rounded-md font-mono">MF-PRO-2026-X89</code></span>
                </div>
                <a
                  href="https://notion.so"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-500 hover:bg-orange-400 text-black font-black text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-1 text-center shrink-0 justify-center cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Enlace de Notion
                </a>
              </div>
            </div>

            {/* EXPORT YOUR CUSTOM DIETA VALUE PROP */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-white/40 uppercase tracking-wider block">Tu Dieta Generada en vivo:</span>
                <div className="flex gap-1.5">
                  <button
                    onClick={copyDietToClipboard}
                    className="text-[11px] bg-white/10 border hover:bg-white/20 border-white/10 text-white font-bold p-1 px-2.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    {copiedKey ? '¡Copiado!' : 'Copiar'}
                  </button>
                  <button
                    onClick={downloadDietFile}
                    className="text-[11px] bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 text-orange-400 font-bold p-1 px-2.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                    Descargar .TXT
                  </button>
                </div>
              </div>

              {/* Box of the diet text */}
              <pre className="bg-[#0a0a0f] text-white/80 text-[10px] sm:text-[11px] p-3 rounded-2xl border border-white/5 font-mono overflow-auto max-h-[180px] leading-relaxed">
                {getDietTextRepresentation()}
              </pre>
            </div>

            {/* Instruction for importing to Notion */}
            <div className="bg-white/5 rounded-2xl border border-white/5 p-4 text-xs">
              <span className="font-bold text-orange-400 block pb-1 border-b border-white/5 mb-1.5">¿Cómo duplicar la plantilla de Notion?</span>
              <ol className="list-decimal list-inside text-white/70 space-y-1">
                <li>Haz clic en el botón verde "Enlace de Notion" superior.</li>
                <li>En la esquina superior derecha de la página de Notion, haz clic en <strong className="font-semibold text-white">"Duplicar"</strong>.</li>
                <li>Se creará una copia editable 100% interactiva en tu cuenta personal gratis de Notion.</li>
                <li>Inserta los gramos calculados aquí para llevar el control diario.</li>
              </ol>
            </div>

            <button
              onClick={() => {
                setShowSuccessModal(false);
                setName('');
                setEmail('');
              }}
              className="w-full bg-white/10 hover:bg-white/15 text-white border border-white/10 font-black text-xs uppercase tracking-wider p-3 rounded-xl transition-all cursor-pointer text-center"
            >
              Cerrar y Volver al Constructor de Dietas
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
