import React, { useState } from 'react';
import { UserProfile, MacroReport } from '../types';
import { HelpCircle, Sparkles, TrendingDown, RefreshCw, ChevronRight, AlertTriangle, Play, ThumbsUp } from 'lucide-react';

interface ProgressAdjusterProps {
  currentProfile: UserProfile;
  currentMacros: MacroReport;
}

type StagnationScenario = 'fat_stalled' | 'hungry_deficit' | 'muscle_stalled' | 'strength_low';

export default function ProgressAdjuster({ currentProfile, currentMacros }: ProgressAdjusterProps) {
  const [scenario, setScenario] = useState<StagnationScenario>('fat_stalled');
  const [currentWeight, setCurrentWeight] = useState<number>(currentProfile.weight);
  const [weeksStalled, setWeeksStalled] = useState<number>(2);

  const getAdjustmentRecommendation = () => {
    switch (scenario) {
      case 'fat_stalled':
        const carbReduction = 35; // grams
        const kcalReduction = 140;
        return {
          title: 'Ajuste por Estancamiento en Pérdida de Grasa (Déficit)',
          desc: 'Tu cuerpo se ha adaptado a las calorías de inicio (termogénesis adaptativa). Es normal tras 3-4 semanas de progreso constante.',
          action: `Recortar ${kcalReduction} kcal diarias procedentes exclusivamente de los Carbohidratos.`,
          calculations: [
            { label: 'Nuevas calorías recomendadas', value: `${currentMacros.targetCalories - kcalReduction} kcal` },
            { label: 'Nuevos carbohidratos recom.', value: `${currentMacros.carbGrams - carbReduction}g` },
            { label: 'Proteína (Se mantiene alta)', value: `${currentMacros.proteinGrams}g` },
            { label: 'Grasas (Se mantienen estables)', value: `${currentMacros.fatGrams}g` },
          ],
          steps: [
            'No recortes proteína. Es vital para blindar tu músculo.',
            'Aumenta tu NEAT (pasos diarios) antes de recortar más comida. Sube tu meta a 10,000 pasos/día.',
            'Aplica este ajuste por 2 semanas y vuelve a verificar la báscula.'
          ]
        };
      case 'hungry_deficit':
        return {
          title: 'Soporte para Saciedad Extrema en Déficit',
          desc: 'Los niveles de grelina (hormona del hambre) están altos. Necesitamos aumentar volumen alimenticio sin añadir exceso calórico.',
          action: 'Reajustar la densidad calórica de tus fuentes nutricionales.',
          calculations: [
            { label: 'Calorías diarias objetivo', value: `${currentMacros.targetCalories} kcal` },
            { label: 'Fibra diaria recomendada', value: 'Mínimo 35g' },
            { label: 'Gramos de vegetales diários', value: '400g - 600g' },
            { label: 'Agua recomendada', value: '3 a 3.5 Litros' },
          ],
          steps: [
            'Sustituye el arroz blanco por patata cocida o boniato (doble de volumen por las mismas calorías).',
            'Sustituye los carbohidratos refinados por verduras de hoja verde infinitas.',
            'Consume 1 vaso de agua grande 15 minutos antes de cada comida.'
          ]
        };
      case 'muscle_stalled':
        const carbAddition = 40; // grams
        const kcalAddition = 160;
        return {
          title: 'Ajuste para Estancamiento en Volumen (Ganar Músculo)',
          desc: 'Tu metabolismo se ha acelerado debido al exceso de calorías y el entrenamiento. Necesitamos más gasolina energética.',
          action: `Añadir +${kcalAddition} kcal diarias enfocadas en Carbohidratos complejos.`,
          calculations: [
            { label: 'Nuevas calorías de volumen', value: `${currentMacros.targetCalories + kcalAddition} kcal` },
            { label: 'Nuevos carbohidratos recom.', value: `${currentMacros.carbGrams + carbAddition}g` },
            { label: 'Proteína recomendada', value: `${currentMacros.proteinGrams}g` },
            { label: 'Grasas recomendadas', value: `${currentMacros.fatGrams}g` },
          ],
          steps: [
            'Añade una porción de fruta o crema de cacahuete extra antes de entrenar.',
            'Alinea tus entrenamientos con la sobrecarga progresiva (aumenta un repetición o un kilo cada sesión).',
            'Monitorea que tu ganancia de peso no supere los 1.5kg por mes.'
          ]
        };
      case 'strength_low':
        return {
          title: 'Estrategia para Escasez de Fuerza y Recuperación',
          desc: 'Tus depósitos de glucógeno muscular están deprimidos. Esto frena el estímulo muscular adecuado.',
          action: 'Implementar un Re-feed estratégico de carbohidratos controlado.',
          calculations: [
            { label: 'Días de Re-feed recomendados', value: '1 o 2 días por semana' },
            { label: 'Aumento de calorías en esos días', value: `+300 kcal (deliberando carbohidratos)` },
            { label: 'Grasas en días de re-feed', value: 'Reducir al mínimo posible' },
          ],
          steps: [
            'Elige un día de entrenamiento pesado (ej. Piernas o Espalda) como tu día de refeed.',
            'Introduce arroz, avena o pasta integrales abundantes para reponer glucógeno.',
            'Vuelve a tus macros habituales al día siguiente.'
          ]
        };
    }
  };

  const rec = getAdjustmentRecommendation();

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
      <div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-50 text-violet-700 mb-2">
          <RefreshCw className="w-3.5 h-3.5 text-violet-650" />
          Sistema de Ajuste y Progreso Inteligente
        </span>
        <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">¿Qué Hacer Cuando Tu Peso Cambie o se Estanque?</h3>
        <p className="text-xs text-gray-500 mt-0.5">
          El cuerpo se adapta. No necesitas rehacer todo de cero, solo calibrar tus niveles nutricionales con lógica metabólica.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Interactive selectors (5 cols) */}
        <div className="lg:col-span-5 space-y-5 bg-gray-50 p-5 rounded-2xl border border-gray-100">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2.5">¿Cuál es tu situación actual?</label>
            <div className="space-y-2">
              <button
                onClick={() => setScenario('fat_stalled')}
                className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex justify-between items-center ${
                  scenario === 'fat_stalled' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white hover:bg-gray-100 border-gray-200 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${scenario === 'fat_stalled' ? 'bg-emerald-400' : 'bg-gray-400'}`}></span>
                  <span className="font-bold">Llevo 2+ semanas estancado en peso (Perder Grasa)</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setScenario('hungry_deficit')}
                className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex justify-between items-center ${
                  scenario === 'hungry_deficit' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white hover:bg-gray-100 border-gray-200 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${scenario === 'hungry_deficit' ? 'bg-emerald-400' : 'bg-gray-400'}`}></span>
                  <span className="font-bold">Tento excesiva hambre y falta de saciedad</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setScenario('muscle_stalled')}
                className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex justify-between items-center ${
                  scenario === 'muscle_stalled' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white hover:bg-gray-100 border-gray-200 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${scenario === 'muscle_stalled' ? 'bg-emerald-400' : 'bg-gray-400'}`}></span>
                  <span className="font-bold">No gano peso ni volumen (Ganar Músculo)</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setScenario('strength_low')}
                className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex justify-between items-center ${
                  scenario === 'strength_low' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white hover:bg-gray-100 border-gray-200 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${scenario === 'strength_low' ? 'bg-emerald-400' : 'bg-gray-400'}`}></span>
                  <span className="font-bold">He perdido fuerza y energía entrenando</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Weight tracker slider */}
          <div className="pt-4 border-t border-gray-200 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-gray-500 uppercase">¿Cuánto te has estancado?</span>
              <span className="text-xs font-black text-slate-800 bg-white border px-2 py-0.5 rounded-md">{weeksStalled} semanas</span>
            </div>
            <input
              type="range"
              min="1"
              max="6"
              value={weeksStalled}
              onChange={(e) => setWeeksStalled(parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-250 rounded-lg cursor-pointer accent-violet-650"
            />
            {weeksStalled < 2 ? (
              <p className="text-[10px] text-amber-600 font-medium flex items-center gap-1 bg-amber-50 p-2 rounded-lg border border-amber-100">
                <AlertTriangle className="w-3.5 h-3.5" /> El peso fluctúa a diario por retención. 1 sola semana no es estancamiento real.
              </p>
            ) : (
              <p className="text-[10px] text-emerald-700 font-medium flex items-center gap-1 bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                <ThumbsUp className="w-3.5 h-3.5" /> Estancamiento verificado. Recomendado ajustar macros ahora.
              </p>
            )}
          </div>
        </div>

        {/* Right Actionable Output report (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 text-white p-6 md:p-8 rounded-2xl border border-slate-800 space-y-5 relative overflow-hidden">
          {/* subtle decoration */}
          <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 w-32 h-32 rounded-full bg-violet-600 opacity-20 blur-xl"></div>

          <div>
            <span className="text-[9px] font-bold text-violet-400 uppercase tracking-widest block mb-1">RECOMENDACIÓN TÉCNICA</span>
            <h4 className="text-base font-extrabold text-white tracking-tight">{rec.title}</h4>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">{rec.desc}</p>
          </div>

          <div className="bg-slate-850 p-4 rounded-xl border border-slate-800/80">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block mb-1">ACCIÓN RECOMENDADA</span>
            <p className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <Play className="w-4 h-4 fill-emerald-400 text-emerald-400 shrink-0" />
              {rec.action}
            </p>
          </div>

          {/* New Macro metrics table simulation */}
          <div className="space-y-2">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">PREVISIÓN DE MACROS AJUSTADOS:</span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {rec.calculations.map((calc, i) => (
                <div key={i} className="bg-slate-800/60 border border-slate-850 p-2.5 rounded-lg text-center">
                  <span className="text-[10px] text-gray-400 block truncate">{calc.label}</span>
                  <span className="text-xs font-extrabold text-white">{calc.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Roadmap list */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">PRÓXIMOS PASOS CLAVE:</span>
            <ul className="space-y-1.5 list-disc list-inside text-xs text-gray-300">
              {rec.steps.map((step, idx) => (
                <li key={idx} className="leading-relaxed">
                  <span className="font-semibold text-white">{idx + 1}.</span> {step}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
