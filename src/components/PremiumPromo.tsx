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

  return (
    <div className="space-y-8" id="checkout-pricing-section">
      {/* Sales Pricing Card Box */}
      <div className="bg-white/5 border border-white/10 text-white rounded-3xl p-6 md:p-10 shadow-xl backdrop-blur-2xl relative overflow-hidden text-center max-w-3xl mx-auto">
        <div className="absolute right-0 top-0 translate-x-1/3 -translate-y-1/3 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl opacity-25"></div>
        <div className="absolute left-0 bottom-0 -translate-x-1/3 translate-y-1/3 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl opacity-15"></div>

        <div className="relative space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
            <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400 animate-pulse" />
            ¡OFERTA DISPONIBLE SÓLO HOY!
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-tight font-display">
              Consigue el Sistema <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">Macro Fácil Pro</span> completo
            </h3>
            <p className="text-sm text-white/70 max-w-lg mx-auto leading-relaxed">
              Descarga la <strong className="text-white">Plantilla de Notion Original</strong> auto-calculable, desbloquea las guías en PDF e importa tus macros directamente para controlarlo todo desde el móvil.
            </p>
          </div>

          {/* Value comparison */}
          <div className="grid grid-cols-3 max-w-md mx-auto bg-white/5 p-3 rounded-2xl border border-white/10 text-center text-xs text-white/50">
            <div>
              <span className="block text-[10px] uppercase font-bold text-white/40">Valor Plantilla</span>
              <span className="line-through text-red-400/80 font-bold font-mono">197€</span>
            </div>
            <div className="border-x border-white/10">
              <span className="block text-[10px] uppercase font-bold text-white/40">Valor Bonos</span>
              <span className="line-through text-red-400/80 font-bold font-mono">97€</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold text-orange-400">Precio Normal</span>
              <span className="font-extrabold text-white font-mono">27€</span>
            </div>
          </div>

          {/* Pricing tier main action */}
          <div className="space-y-3 pt-3">
            <div className="flex justify-center items-baseline gap-2">
              <span className="text-xs text-white/50 font-bold">HOY SOLO:</span>
              <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200 tracking-tight font-mono">19€</span>
              <span className="text-xs text-orange-300 font-semibold bg-orange-500/15 px-2 py-0.5 rounded-full border border-orange-500/20">Pago único, acceso de por vida</span>
            </div>
            <p className="text-[11px] text-orange-400/90 font-medium italic">
              Descuento especial por Lanzamiento de Primeros Clientes aplicado (-8€ extra).
            </p>
          </div>

          {/* Big CTA Button */}
          <div className="max-w-2xl mx-auto pt-2 space-y-4">
            <div className="flex flex-col sm:flex-row justify-center items-stretch gap-4">
              <a
                href="https://buy.stripe.com/7sY00k4th5Od0oseY7enS00"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-orange-500 hover:bg-orange-400 text-black font-black text-sm uppercase tracking-wider p-4 rounded-2xl shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group cursor-pointer duration-200 text-center"
              >
                👉 COMPRAR SISTEMA COMPLETO AHORA
                <ArrowRight className="w-5 h-5 text-black transition-transform group-hover:translate-x-1" />
              </a>
              <button
                onClick={() => {
                  setCheckoutPrice(19);
                  setShowCheckoutModal(true);
                }}
                className="px-6 py-4 bg-white/5 hover:bg-white/10 text-white/80 font-bold text-xs uppercase tracking-wider rounded-2xl border border-white/10 shadow-xs transition-all cursor-pointer text-center whitespace-nowrap"
              >
                Simular Flujo / Descarga de Demo
              </button>
            </div>
            <span className="text-[10px] text-white/40 block mt-2.5 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-orange-400" /> Garantía de Satisfacción 100% de 30 Días sin preguntas.
            </span>
          </div>
        </div>
      </div>

      {/* MODAL 1: CHECKOUT DIALOG */}
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
              <span className="text-xs font-bold text-white block">Licencia de Acceso de Por Vida + Plantilla Notion + 4 Bonos</span>
              <span className="text-xl font-black text-white block mt-0.5 font-mono">{checkoutPrice}€ <span className="text-xs font-semibold text-white/40">(IVA incl.)</span></span>
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
                <p className="text-[9px] text-white/40 mt-1">Aquí es donde recibirás tu clave y el enlace de descarga de Notion.</p>
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
                  href="https://buy.stripe.com/7sY00k4th5Od0oseY7enS00"
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
                  Continuar con Prueba Simulada ({checkoutPrice}€)
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
              <h4 className="text-xl font-extrabold text-white tracking-tight">¡Pago Simulado con Éxito!</h4>
              <p className="text-xs text-white/60">
                Gracias <strong className="text-white font-bold">{name}</strong>, el pedido se ha procesado. Aquí tienes tus accesos y tu reporte generado.
              </p>
            </div>

            {/* Simulated Notion Premium Link */}
            <div className="bg-white/5 text-white rounded-2xl p-4 space-y-3 border border-white/5">
              <span className="text-[9px] font-bold text-orange-400 uppercase tracking-widest block">ENLACE ORIGINAL DE PLANTILLA DE NOTION</span>
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
