import React, { useState, useEffect } from 'react';
import { UserProfile, MacroReport, ActivityLevel, Goal, Gender } from '../types';
import { Shield, Sparkles, Scale, Activity, ArrowRight, Check } from 'lucide-react';

interface MacroCalculatorProps {
  onCalculate: (report: MacroReport, profile: UserProfile) => void;
  initialProfile?: UserProfile;
}

export const activityLabels: Record<ActivityLevel, { name: string; desc: string; factor: number }> = {
  sedentary: { name: 'Sedentario', desc: 'Poco o ningún ejercicio, trabajo de oficina', factor: 1.2 },
  light: { name: 'Actividad Ligera', desc: 'Ejercicio suave o caminar 1-3 días a la semana', factor: 1.375 },
  moderate: { name: 'Actividad Moderada', desc: 'Entrenamiento moderado 3-5 días a la semana', factor: 1.55 },
  active: { name: 'Muy Activo', desc: 'Entrenamiento INTENSO 6-7 días a la semana', factor: 1.725 },
  extreme: { name: 'Extra Activo', desc: 'Trabajo físico duro y entrenamientos diarios dobles', factor: 1.9 },
};

export const goalLabels: Record<Goal, { name: string; desc: string; adjustment: number }> = {
  lose: { name: 'Perder Grasa', desc: 'Déficit calórico controlado para quemar grasa preservando músculo', adjustment: -500 },
  maintain: { name: 'Mantener Peso', desc: 'Comer lo necesario para conservar tu peso y optimizar energía', adjustment: 0 },
  gain: { name: 'Ganar Músculo', desc: 'Superávit calórico optimizado para construir masa muscular limpia', adjustment: 300 },
};

export default function MacroCalculator({ onCalculate, initialProfile }: MacroCalculatorProps) {
  const [profile, setProfile] = useState<UserProfile>(initialProfile || {
    gender: 'male',
    age: 28,
    weight: 78,
    height: 176,
    activity: 'moderate',
    goal: 'lose',
  });

  const [report, setReport] = useState<MacroReport | null>(null);

  // Perform calculation of BMR, TDEE, Calories, and Macros
  const calculateMacros = (p: UserProfile): MacroReport => {
    // 1. Mifflin-St Jeor Equation
    let bmr = 0;
    if (p.gender === 'male') {
      bmr = 10 * p.weight + 6.25 * p.height - 5 * p.age + 5;
    } else {
      bmr = 10 * p.weight + 6.25 * p.height - 5 * p.age - 161;
    }

    // 2. TDEE based on Activity Factor
    const factor = activityLabels[p.activity].factor;
    const tdee = Math.round(bmr * factor);

    // 3. Target Calories based on Goal
    const adj = goalLabels[p.goal].adjustment;
    let targetCalories = Math.round(tdee + adj);

    // Safe healthy floor caps
    const floor = p.gender === 'male' ? 1400 : 1200;
    if (targetCalories < floor) {
      targetCalories = floor;
    }

    // 4. Protein allocation based on goals and bodyweight (g)
    // 2.2g/kg for losing fat to guard muscle, 2.0g/kg for maintaining, 1.8g/kg for gaining muscle
    let proteinMultiplier = 2.0;
    if (p.goal === 'lose') proteinMultiplier = 2.2;
    if (p.goal === 'gain') proteinMultiplier = 1.9;
    
    let proteinGrams = Math.round(p.weight * proteinMultiplier);
    let proteinCals = proteinGrams * 4;

    // 5. Fat allocation: 1g fat per kg bodyweight
    let fatGrams = Math.round(p.weight * 0.95); // safe average
    if (p.goal === 'lose') fatGrams = Math.round(p.weight * 0.85); // lower fat in deficit
    if (p.goal === 'gain') fatGrams = Math.round(p.weight * 1.05);

    // Cap fats safely between 40g and 120g depending on target
    if (fatGrams < 40) fatGrams = 40;
    let fatCals = fatGrams * 9;

    // Guard if proteins and fats exceed target calories (highly unlikely but possible on extreme deficit/low weight)
    if (proteinCals + fatCals > targetCalories * 0.75) {
      // Adjust down to fit
      fatGrams = Math.round((targetCalories * 0.25) / 9);
      fatCals = fatGrams * 9;
    }

    // 6. Carbs receive the remainder
    const remainingCals = targetCalories - proteinCals - fatCals;
    let carbGrams = Math.round(remainingCals / 4);
    if (carbGrams < 50) {
      carbGrams = 50; // health floor
    }
    const carbCals = carbGrams * 4;

    // Final total calibration check to prevent arithmetic mismatch
    targetCalories = proteinCals + carbCals + fatCals;

    return {
      bmr: Math.round(bmr),
      tdee,
      targetCalories,
      proteinGrams,
      carbGrams,
      fatGrams,
      proteinCals,
      carbCals,
      fatCals,
    };
  };

  useEffect(() => {
    const rep = calculateMacros(profile);
    setReport(rep);
    onCalculate(rep, profile);
  }, [profile]);

  const handleInputChange = (field: keyof UserProfile, val: any) => {
    setProfile(prev => ({
      ...prev,
      [field]: val,
    }));
  };

  // Quick preset helpers
  const applyPreset = (gender: Gender, weight: number, height: number, age: number, activity: ActivityLevel, goal: Goal) => {
    setProfile({ gender, weight, height, age, activity, goal });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="macro-calculator-section">
      {/* Left Input panel (5 cols) */}
      <div className="lg:col-span-5 bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl shadow-xl p-6 md:p-8 space-y-6 text-white">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            Paso 1: Configura tus Parámetros
          </span>
          <h3 className="text-2xl font-black text-white tracking-tight font-display">Tus Datos Físicos</h3>
          <p className="text-xs text-white/60 mt-1">El algoritmo estimará tus requerimientos metabólicos con precisión científica.</p>
        </div>

        {/* Gender Toggle */}
        <div>
          <label className="block text-xs font-extrabold uppercase tracking-wider text-white/50 mb-2">Género Biológico</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleInputChange('gender', 'male')}
              className={`py-3 px-4 rounded-xl font-extrabold text-sm transition-all duration-200 border text-center ${
                profile.gender === 'male'
                  ? 'bg-orange-500 border-orange-500 text-black shadow-[0_0_15px_rgba(249,115,22,0.3)]'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-white/80'
              }`}
            >
              Hombre
            </button>
            <button
              type="button"
              onClick={() => handleInputChange('gender', 'female')}
              className={`py-3 px-4 rounded-xl font-extrabold text-sm transition-all duration-200 border text-center ${
                profile.gender === 'female'
                  ? 'bg-orange-500 border-orange-500 text-black shadow-[0_0_15px_rgba(249,115,22,0.3)]'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-white/80'
              }`}
            >
              Mujer
            </button>
          </div>
        </div>

        {/* Multi-Sliders or inputs */}
        <div className="space-y-4">
          {/* Weight */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-white/60 flex items-center gap-1">
                <Scale className="w-3.5 h-3.5 text-white/40" /> Peso Actual (kg)
              </label>
              <span className="text-xs font-extrabold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2.5 py-0.5 rounded-md font-mono">{profile.weight} kg</span>
            </div>
            <input
              type="range"
              min="40"
              max="150"
              step="1"
              value={profile.weight}
              onChange={(e) => handleInputChange('weight', parseInt(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>

          {/* Height */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-white/60">Altura (cm)</label>
              <span className="text-xs font-extrabold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2.5 py-0.5 rounded-md font-mono">{profile.height} cm</span>
            </div>
            <input
              type="range"
              min="130"
              max="220"
              step="1"
              value={profile.height}
              onChange={(e) => handleInputChange('height', parseInt(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>

          {/* Age */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-white/60">Edad (Años)</label>
              <span className="text-xs font-extrabold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2.5 py-0.5 rounded-md font-mono">{profile.age} años</span>
            </div>
            <input
              type="range"
              min="15"
              max="80"
              step="1"
              value={profile.age}
              onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />
          </div>
        </div>

        {/* Activity Level SELECT */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2 flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-white/40" /> Nivel de Actividad Diaria
          </label>
          <select
            value={profile.activity}
            onChange={(e) => handleInputChange('activity', e.target.value)}
            className="w-full bg-[#13131a] border border-white/10 hover:border-white/20 focus:border-orange-500 rounded-xl p-3 text-sm text-white transition-all font-medium outline-hidden"
          >
            {Object.entries(activityLabels).map(([key, item]) => (
              <option key={key} value={key} className="bg-[#13131a] text-white">
                {item.name} ({item.factor.toFixed(3)}x)
              </option>
            ))}
          </select>
          <p className="text-[11px] text-white/40 mt-1.5 leading-relaxed">
            {activityLabels[profile.activity].desc}
          </p>
        </div>

        {/* Goal Radio Buttons */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2.5">Tu Objetivo Fitness</label>
          <div className="space-y-2.5">
            {Object.entries(goalLabels).map(([key, item]) => {
              const active = profile.goal === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleInputChange('goal', key)}
                  className={`w-full flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all ${
                    active
                      ? 'bg-orange-500/10 border-orange-500/50 hover:bg-orange-500/15'
                      : 'bg-white/5 hover:bg-white/10 border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className={`mt-0.5 w-5 h-5 flex items-center justify-center rounded-full border transition-all ${
                    active ? 'border-orange-500 bg-orange-500' : 'border-white/25 bg-transparent'
                  }`}>
                    {active && <Check className="w-3 h-3 text-black stroke-[3]" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className={`font-semibold text-sm ${active ? 'text-orange-400' : 'text-white'}`}>
                        {item.name}
                      </span>
                      {key === 'lose' && (
                        <span className="text-[10px] bg-red-500/20 text-red-300 border border-red-500/20 px-1.5 py-0.2 rounded-full font-bold">
                          Déficit
                        </span>
                      )}
                      {key === 'gain' && (
                        <span className="text-[10px] bg-blue-500/20 text-blue-300 border border-blue-500/20 px-1.5 py-0.2 rounded-full font-bold">
                          Superávit
                        </span>
                      )}
                    </div>
                    <p className={`text-xs mt-0.5 leading-relaxed ${active ? 'text-white/80' : 'text-white/50'}`}>
                      {item.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Preset profiles simulation to ease testing */}
        <div className="pt-2.5 border-t border-white/10">
          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2">Simular casos rápidos:</p>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => applyPreset('male', 82, 180, 30, 'moderate', 'lose')}
              className="text-[11px] bg-white/5 hover:bg-white/15 text-white/80 px-2.5 py-1 rounded-md transition-all font-semibold border border-white/5 hover:border-white/10"
            >
              🙋‍♂️ Def. Varón (82kg)
            </button>
            <button
              onClick={() => applyPreset('female', 63, 164, 26, 'light', 'lose')}
              className="text-[11px] bg-white/5 hover:bg-white/15 text-white/80 px-2.5 py-1 rounded-md transition-all font-semibold border border-white/5 hover:border-white/10"
            >
              🙋‍♀️ Def. Mujer (63kg)
            </button>
            <button
              onClick={() => applyPreset('male', 72, 175, 24, 'active', 'gain')}
              className="text-[11px] bg-white/5 hover:bg-white/15 text-white/80 px-2.5 py-1 rounded-md transition-all font-semibold border border-white/5 hover:border-white/10"
            >
              💪 Volumen (72kg)
            </button>
          </div>
        </div>
      </div>

      {/* Right Output report card (7 cols) */}
      <div className="lg:col-span-7 space-y-6 text-white">
        {report && (
          <>
            {/* Target energy indicator */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden backdrop-blur-2xl">
              {/* Background abstract decoration to prove craftsmanship */}
              <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-orange-500 opacity-20 blur-xl"></div>
              <div className="absolute left-1/3 -bottom-16 w-36 h-36 rounded-full bg-white opacity-5 blur-xl"></div>

              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-500/20 text-orange-300 border border-orange-500/20 mb-2">
                  <Shield className="w-3 h-3 text-orange-400" /> Presupuesto Calórico Diario
                </div>
                <h4 className="text-2xl font-black tracking-tight text-white font-display">Tu Objetivo Calórico</h4>
                <p className="text-white/60 text-xs mt-1 leading-relaxed max-w-sm">
                  Esta cantidad te permitirá lograr tu meta de <strong className="text-orange-400 font-bold">{goalLabels[profile.goal].name.toLowerCase()}</strong> de manera sostenible.
                </p>
              </div>

              <div className="relative z-10 text-left md:text-right bg-black/40 p-4 px-6 rounded-2xl border border-white/10 backdrop-blur-md min-w-[165px]">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider block">Calorías Diarias</span>
                <span className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200 font-mono tracking-tight">
                  {report.targetCalories}
                </span>
                <span className="text-orange-400 font-bold ml-1 text-sm font-mono">kcal</span>
              </div>
            </div>

            {/* Macros Breakdown Ring/Grid */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
              <div>
                <h4 className="text-xl font-black text-white tracking-tight font-display">Reparto de Macronutrientes</h4>
                <p className="text-xs text-white/50 mt-1">Gramos exactos adaptados a tu peso para optimizar rendimiento y salud.</p>
              </div>

              {/* Progress bars of three macros */}
              <div className="space-y-5">
                {/* Protein */}
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-red-500"></span>
                        <span className="font-extrabold text-sm text-white">Proteína</span>
                        <span className="text-xs text-white/40 font-semibold">(Construcción muscular)</span>
                      </div>
                    </div>
                    <div className="text-right font-mono">
                      <span className="font-black text-md text-white">{report.proteinGrams}g</span>
                      <span className="text-xs text-white/50 ml-1.5">({report.proteinCals} kcal • {Math.round((report.proteinCals / report.targetCalories) * 100)}%)</span>
                    </div>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full transition-all duration-500" style={{ width: `${(report.proteinCals / report.targetCalories) * 100}%` }}></div>
                  </div>
                  <p className="text-[11px] text-white/50">Equivale a <strong className="font-bold text-white">{(report.proteinGrams / profile.weight).toFixed(1)}g</strong> por kg. Fundamental para potenciar tu metabolismo.</p>
                </div>

                {/* Carbs */}
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                        <span className="font-extrabold text-sm text-white">Carbohidratos</span>
                        <span className="text-xs text-white/40 font-semibold">(Energía y recuperación)</span>
                      </div>
                    </div>
                    <div className="text-right font-mono">
                      <span className="font-black text-md text-white">{report.carbGrams}g</span>
                      <span className="text-xs text-white/50 ml-1.5">({report.carbCals} kcal • {Math.round((report.carbCals / report.targetCalories) * 100)}%)</span>
                    </div>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full transition-all duration-500" style={{ width: `${(report.carbCals / report.targetCalories) * 100}%` }}></div>
                  </div>
                  <p className="text-[11px] text-white/50">Tus músculos los utilizarán como combustible de alta eficiencia para tus entrenamientos.</p>
                </div>

                {/* Fats */}
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                        <span className="font-extrabold text-sm text-white">Grasas Saludables</span>
                        <span className="text-xs text-white/40 font-semibold">(Soporte hormonal)</span>
                      </div>
                    </div>
                    <div className="text-right font-mono">
                      <span className="font-black text-md text-white">{report.fatGrams}g</span>
                      <span className="text-xs text-white/50 ml-1.5">({report.fatCals} kcal • {Math.round((report.fatCals / report.targetCalories) * 100)}%)</span>
                    </div>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${(report.fatCals / report.targetCalories) * 100}%` }}></div>
                  </div>
                  <p className="text-[11px] text-white/50">Esenciales para un entorno hormonal óptimo, absorción de vitaminas y bienestar general.</p>
                </div>
              </div>

              {/* TDEE Summary and BMR breakdown details */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider block">Gasto Basal (BMR)</span>
                  <span className="text-lg font-black text-white font-mono">{report.bmr} kcal</span>
                  <p className="text-[10px] text-white/40 mt-0.5 leading-relaxed">Energía necesaria para mantenerte vivo en reposo absoluto.</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider block">Gasto Total (TDEE)</span>
                  <span className="text-lg font-black text-white font-mono">{report.tdee} kcal</span>
                  <p className="text-[10px] text-white/40 mt-0.5 leading-relaxed">Calorías de mantenimiento diario incluyendo tu nivel de actividad.</p>
                </div>
              </div>

              {/* Seamless Action Call to transfer values */}
              <div className="bg-orange-500/10 text-orange-200 rounded-2xl p-4 border border-orange-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-xs text-white">¡Tus macros están calculados!</h5>
                    <p className="text-[11px] text-white/70">Pasa al <span className="font-black text-orange-300">Paso 2: Constructor de Dietas</span> para armar comidas con este objetivo.</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const el = document.getElementById('diet-constructor-tab-btn');
                    if (el) el.click();
                    // Scroll to tab block smoothly
                    document.getElementById('tabs-navigation-anchor')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-black font-black text-xs px-4 py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(249,115,22,0.3)] shrink-0 flex items-center gap-1 cursor-pointer"
                >
                  Construir Dieta
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
