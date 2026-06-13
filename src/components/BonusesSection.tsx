import React, { useState } from 'react';
import { Check, CheckSquare, Square, TrendingDown, BookOpen, Beer, AlertCircle, Sparkles, Star, ClipboardList, Eye } from 'lucide-react';

interface ShoppingItem {
  id: string;
  name: string;
  category: 'protein' | 'carb' | 'fat' | 'veg' | 'extra';
  done: boolean;
}

export default function BonusesSection() {
  const [activeBonusTab, setActiveBonusTab] = useState<'shopping' | 'restaurant' | 'errors' | 'labels'>('shopping');

  // BONUS 1: Interactive Checklist
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([
    { id: '1', name: 'Pechuga de Pollo Fresca', category: 'protein', done: false },
    { id: '2', name: 'Huevos Camperos L', category: 'protein', done: false },
    { id: '3', name: 'Claras de Huevo pasteurizadas', category: 'protein', done: false },
    { id: '4', name: 'Lomos de Salmón congelado', category: 'protein', done: false },
    { id: '5', name: 'Lata de Atún al natural', category: 'protein', done: false },
    { id: '6', name: 'Arroz Vaporizado Integral', category: 'carb', done: false },
    { id: '7', name: 'Copos de Avena ecológicos', category: 'carb', done: false },
    { id: '8', name: 'Patatas frescas lavadas', category: 'carb', done: false },
    { id: '9', name: 'Pan 100% integral de centeno', category: 'carb', done: false },
    { id: '10', name: 'Aceite de Oliva Virgen Extra', category: 'fat', done: false },
    { id: '11', name: 'Aguacates medianos', category: 'fat', done: false },
    { id: '12', name: 'Almendras naturales sin sal', category: 'fat', done: false },
    { id: '13', name: 'Crema de cacahuete pura 100%', category: 'fat', done: false },
    { id: '14', name: 'Brócoli fresco de la huerta', category: 'veg', done: false },
    { id: '15', name: 'Espinacas Baby para ensalada', category: 'veg', done: false },
    { id: '16', name: 'Arándanos y banana madura', category: 'veg', done: false },
    { id: '17', name: 'Queso fresco batido 0%', category: 'extra', done: false },
    { id: '18', name: 'Yogur Griego O%', category: 'extra', done: false },
    { id: '19', name: 'Sal rosa y especias favoritas', category: 'extra', done: false },
  ]);

  const toggleShoppingItem = (id: string) => {
    setShoppingList(prev =>
      prev.map(item => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const resetShoppingItems = () => {
    setShoppingList(prev => prev.map(item => ({ ...item, done: false })));
  };

  // BONUS 2: Interactive Food Swap Tool
  const [selectedSwapMain, setSelectedSwapMain] = useState<string>('patatas_fritas');
  const [selectedSwapDrink, setSelectedSwapDrink] = useState<string>('cerveza');

  const swapsMain = {
    patatas_fritas: { label: 'Patatas Fritas (Pizzería/Hamburguesería)', cals: 380, swap: 'Patata Asada', swapCals: 120, icon: '🍟' },
    pan_blanco: { label: 'Pan Blanco de Aperitivo', cals: 210, swap: 'Palitos de Apio o Ensalada Verde', swapCals: 30, icon: '🍞' },
    alitas_pollo: { label: '6 Alitas con Salsa Barbacoa', cals: 580, swap: 'Brochetas de Pechuga a la Plancha', swapCals: 220, icon: '🍗' },
    salsa_cesar: { label: 'Salsa César Industrial', cals: 150, swap: 'Vinagreta de Limón y Cucharadita de Aceite', swapCals: 50, icon: '🍯' }
  };

  const swapsDrink = {
    cerveza: { label: 'Pinta de Cerveza Clásica', cals: 190, swap: 'Agua con Gas y rodaja de Limón', swapCals: 0, icon: '🍺' },
    refresco_normal: { label: 'Lata de Coca-Cola Tradicional', cals: 140, swap: 'Agua o versión Zero/Light (0 kcal)', swapCals: 0, icon: '🥤' },
    copa_vino: { label: 'Copa de Vino Tinto', cals: 125, swap: 'Zumo de Tomate Sazonado o Kombucha light', swapCals: 35, icon: '🍷' }
  };

  const totalOriginalCalories = swapsMain[selectedSwapMain as keyof typeof swapsMain].cals + swapsDrink[selectedSwapDrink as keyof typeof swapsDrink].cals;
  const totalSwappedCalories = swapsMain[selectedSwapMain as keyof typeof swapsMain].swapCals + swapsDrink[selectedSwapDrink as keyof typeof swapsDrink].swapCals;
  const kcalSaved = totalOriginalCalories - totalSwappedCalories;

  // BONUS 3: The 15 Mistakes (We represent top curated actionable ones with rich description)
  const [openMistakeIdx, setOpenMistakeIdx] = useState<number>(0);
  const mistakes = [
    {
      title: 'Confundir un alimento "Saludable" con un alimento "Bajo en Calorías"',
      myth: 'Comer aguacates enteros, nueces ilimitadas y aceite de coco pensando que no engordan porque son "reales".',
      truth: 'Tienen una densidad calórica altísima. Un puñado de nueces adicional puede sumar 300 kcal extras sin darte cuenta, frenando tu pérdida de grasa.'
    },
    {
      title: 'Pesar la comida después de cocinarla (en vez de cruda)',
      myth: 'Pesar 100g de arroz cocinado asumiendo que corresponde a la tabla nutricional estándar.',
      truth: 'El arroz absorbe agua al cocer por lo que 100g cocidos aportan solo la tercera parte de calorías que 100g en crudo. La carne reduce su volumen al perder agua por lo que 100g cocidos aportan más calorías que 100g en crudo. Pesa SIEMPRE en crudo para evitar errores de un 30%.'
    },
    {
      title: 'Beber tus calorías en líquidos (Zumos, refrescos, alcohol)',
      myth: 'Beber zumo de naranja natural de 4 naranjas creyendo que es igual de saciante que comerlas.',
      truth: 'Los jugos eliminan la fibra. Entran directos al torrente, no sacian en absoluto y añaden calorías vacías masivas que destruyen el déficit diario.'
    },
    {
      title: 'Compensar un mal día de dieta matándote a cardio al día siguiente',
      myth: 'Consumir 1500 kcal de pizza y correr 2 horas para quemarlo.',
      truth: 'El ejercicio quema muchísimo menos de lo que crees. Correr quema unas 400-500 kcal/hora. Genera una relación tóxica con el ejercicio. Solo vuelve a retomar tus macros al día siguiente con total normalidad.'
    },
    {
      title: 'No contar el aceite de oliva que usas para cocinar',
      myth: 'Echar un "chorrito" de aceite sin medirlo pensando que es insignificante.',
      truth: 'Una sola cucharada sopera de aceite contiene 120-130 kcal de grasa. Tres chorritos descuidados al día suman casi 400 kcal sorpresa de golpe.'
    },
    {
      title: 'Eliminar los carbohidratos por completo por miedo a la insulina',
      myth: 'Creer que cenar carbohidratos bloquea la quema de grasa nocturna.',
      truth: 'La pérdida de grasa depende del balance energético global al final de tu semana. Los carbs protegen tu tiroides, facilitan la recuperación del entrenamiento y previenen la ansiedad extrema.'
    }
  ];

  // BONUS 4: Interactive Label Interpreter
  const [labelSugar, setLabelSugar] = useState<number>(4);
  const [labelTotalFat, setLabelTotalFat] = useState<number>(6);
  const [labelSatFat, setLabelSatFat] = useState<number>(1.2);
  const [labelProtein, setLabelProtein] = useState<number>(12);

  const getLabelAuditResult = () => {
    let score = 'EXCELENTE';
    let labelBg = 'bg-emerald-50 text-emerald-700 border-emerald-200';
    let recommendations: string[] = [];

    if (labelSugar > 15) {
      score = 'EVITAR / MODERAR';
      labelBg = 'bg-red-50 text-red-700 border-red-200';
      recommendations.push('Alto nivel de azúcares libres. Provocará picos de glucosa y hambre rápida.');
    } else if (labelSugar > 8) {
      score = 'CONSUMO REGULAR';
      labelBg = 'bg-amber-50 text-amber-700 border-amber-200';
      recommendations.push('Tiene azúcares moderados, vigila las porciones totales diarias.');
    }

    if (labelSatFat > 5) {
      if (score === 'EXCELENTE') score = 'CONSUMO REGULAR';
      recommendations.push('Grasas saturadas elevadas. Limita su presencia en fase de pérdida calórica.');
    }

    if (labelProtein >= 10 && score !== 'EVITAR / MODERAR') {
      recommendations.push('¡Excelente aporte proteico! Te ayudará con la saciedad y el músculo.');
    } else if (labelProtein < 3 && labelSugar < 5) {
      recommendations.push('Alimento principalmente neutro, ideal como acompañamiento verde.');
    }

    if (recommendations.length === 0) {
      recommendations.push('Producto altamente equilibrado. Apto para incluir en tus platos diarios.');
    }

    return { score, labelBg, recommendations };
  };

  const audit = getLabelAuditResult();

  return (
    <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-50 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 mb-2">
            <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            Bonos de Lanzamiento Incluidos Gratis
          </span>
          <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">Guías y Herramientas Digitales de Macro Fácil</h3>
          <p className="text-xs text-gray-500 mt-0.5">Accede a las herramientas de apoyo para no volver a adivinar en tus compras y eventos.</p>
        </div>

        {/* Minimal Category Tab Selector */}
        <div className="flex flex-wrap gap-1.5 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
          <button
            onClick={() => setActiveBonusTab('shopping')}
            className={`px-3 py-2 text-xs font-bold rounded-lg transition-all ${
              activeBonusTab === 'shopping' ? 'bg-white shadow-xs text-gray-900' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            📋 Lista Fitness
          </button>
          <button
            onClick={() => setActiveBonusTab('restaurant')}
            className={`px-3 py-2 text-xs font-bold rounded-lg transition-all ${
              activeBonusTab === 'restaurant' ? 'bg-white shadow-xs text-gray-900' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            🍕 Comer Fuera
          </button>
          <button
            onClick={() => setActiveBonusTab('errors')}
            className={`px-3 py-2 text-xs font-bold rounded-lg transition-all ${
              activeBonusTab === 'errors' ? 'bg-white shadow-xs text-gray-900' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            🚨 15 Errores
          </button>
          <button
            onClick={() => setActiveBonusTab('labels')}
            className={`px-3 py-2 text-xs font-bold rounded-lg transition-all ${
              activeBonusTab === 'labels' ? 'bg-white shadow-xs text-gray-900' : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            🏷 Etiquetas
          </button>
        </div>
      </div>

      {/* RENDER ACTIVE TAB BODY */}
      <div className="min-h-[300px]">
        {/* BONUS 1: SHOPPING LIST CHECKLIST */}
        {activeBonusTab === 'shopping' && (
          <div className="space-y-6">
            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h4 className="text-sm font-bold text-emerald-950">Bono #1: Lista de Compras Inteligente</h4>
                <p className="text-xs text-emerald-700">Comida real dividida por categorías para un carrito 100% libre de ultraprocesados.</p>
              </div>
              <button
                onClick={resetShoppingItems}
                className="text-[11px] bg-white border border-emerald-200 hover:bg-emerald-50 text-emerald-800 font-bold px-3 py-1.5 rounded-lg transition-all"
              >
                Reiniciar Lista Checklist
              </button>
            </div>

            {/* Structured group by category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Proteins & Carbs list */}
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">🔴 Proteínas Limpias</span>
                  <div className="space-y-1.5 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                    {shoppingList.filter(i => i.category === 'protein').map(item => (
                      <button
                        key={item.id}
                        onClick={() => toggleShoppingItem(item.id)}
                        className="w-full flex items-center gap-2.5 text-xs text-left py-1 text-gray-700 hover:text-gray-900 font-medium"
                      >
                        {item.done ? <CheckSquare className="w-4.5 h-4.5 text-emerald-600 shrink-0" /> : <Square className="w-4.5 h-4.5 text-gray-300 shrink-0" />}
                        <span className={item.done ? "line-through text-gray-400" : ""}>{item.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">🟡 Carbohidratos Energéticos</span>
                  <div className="space-y-1.5 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                    {shoppingList.filter(i => i.category === 'carb').map(item => (
                      <button
                        key={item.id}
                        onClick={() => toggleShoppingItem(item.id)}
                        className="w-full flex items-center gap-2.5 text-xs text-left py-1 text-gray-700 hover:text-gray-900 font-medium"
                      >
                        {item.done ? <CheckSquare className="w-4.5 h-4.5 text-emerald-600 shrink-0" /> : <Square className="w-4.5 h-4.5 text-gray-300 shrink-0" />}
                        <span className={item.done ? "line-through text-gray-400" : ""}>{item.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Fats, Veg, Extras */}
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">🔵 Grasas Saludables</span>
                  <div className="space-y-1.5 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                    {shoppingList.filter(i => i.category === 'fat').map(item => (
                      <button
                        key={item.id}
                        onClick={() => toggleShoppingItem(item.id)}
                        className="w-full flex items-center gap-2.5 text-xs text-left py-1 text-gray-700 hover:text-gray-900 font-medium"
                      >
                        {item.done ? <CheckSquare className="w-4.5 h-4.5 text-emerald-600 shrink-0" /> : <Square className="w-4.5 h-4.5 text-gray-300 shrink-0" />}
                        <span className={item.done ? "line-through text-gray-400" : ""}>{item.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">🟢 Vegetales, Fibra & Lácteos</span>
                  <div className="space-y-1.5 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                    {shoppingList.filter(i => i.category === 'veg' || i.category === 'extra').map(item => (
                      <button
                        key={item.id}
                        onClick={() => toggleShoppingItem(item.id)}
                        className="w-full flex items-center gap-2.5 text-xs text-left py-1 text-gray-700 hover:text-gray-900 font-medium"
                      >
                        {item.done ? <CheckSquare className="w-4.5 h-4.5 text-emerald-600 shrink-0" /> : <Square className="w-4.5 h-4.5 text-gray-300 shrink-0" />}
                        <span className={item.done ? "line-through text-gray-400" : ""}>{item.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BONUS 2: RESTAURANT CALORIE SAVER */}
        {activeBonusTab === 'restaurant' && (
          <div className="space-y-6">
            <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800">
              <h4 className="text-sm font-bold flex items-center gap-1.5">
                <Beer className="w-4 h-4 text-amber-400" /> Bono #2: Guía de Sobrevivencia en Restaurantes
              </h4>
              <p className="text-xs text-gray-400 mt-1">Cómo comer con amigos y familiares ahorrando cientos de calorías con simples reemplazos.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Interactive choices (6 cols) */}
              <div className="md:col-span-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">1. ¿Qué plato ibas a pedir?</label>
                  <select
                    value={selectedSwapMain}
                    onChange={(e) => setSelectedSwapMain(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-slate-800 rounded-xl p-2.5 text-xs font-medium outline-hidden"
                  >
                    {Object.entries(swapsMain).map(([key, data]) => (
                      <option key={key} value={key}>{data.icon} {data.label} ({data.cals} kcal)</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">2. ¿Qué bebida ibas a pedir?</label>
                  <select
                    value={selectedSwapDrink}
                    onChange={(e) => setSelectedSwapDrink(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 focus:border-slate-800 rounded-xl p-2.5 text-xs font-medium outline-hidden"
                  >
                    {Object.entries(swapsDrink).map(([key, data]) => (
                      <option key={key} value={key}>{data.icon} {data.label} ({data.cals} kcal)</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Saved Result panel (6 cols) */}
              <div className="md:col-span-6 bg-emerald-50 rounded-2xl border border-emerald-100 p-5 space-y-4">
                <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider">REEMPLAZO INTELIGENTE:</span>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between border-b border-emerald-100/55 pb-2">
                    <span className="text-emerald-950 font-bold">Cambia por:</span>
                    <span className="text-emerald-800 font-medium">
                      {swapsMain[selectedSwapMain as keyof typeof swapsMain].swap}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-emerald-100/55 pb-2">
                    <span className="text-emerald-950 font-bold">Bebida por:</span>
                    <span className="text-emerald-800 font-medium">
                      {swapsDrink[selectedSwapDrink as keyof typeof swapsDrink].swap}
                    </span>
                  </div>
                </div>

                {/* Big graphic saver badge */}
                <div className="bg-emerald-600 text-white rounded-xl p-4 text-center">
                  <span className="text-xs text-emerald-100 block">Diferencia calórica salvada:</span>
                  <span className="text-2xl font-black block tracking-tight">-{kcalSaved} kcal</span>
                  <span className="text-[10px] font-medium text-emerald-100 mt-1 block">
                    ¡Eso equivale a correr más de {Math.round(kcalSaved / 10)} minutos para compensar!
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BONUS 3: The 15 Mistakes with expanding block */}
        {activeBonusTab === 'errors' && (
          <div className="space-y-4">
            <div className="bg-amber-50 rounded-2xl border border-amber-100 p-4">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" /> Bono #3: Los Principales Errores de Novato
              </span>
              <p className="text-[11px] text-amber-700 mt-0.5">Hacer las cosas mal puede desperdiciar meses de disciplina. Haz clic en las tarjetas para descubrir la verdad científica.</p>
            </div>

            <div className="space-y-2">
              {mistakes.map((error, idx) => {
                const open = openMistakeIdx === idx;
                return (
                  <div key={idx} className="border border-gray-100/80 rounded-2xl overflow-hidden transition-all bg-slate-50 hover:bg-white">
                    <button
                      onClick={() => setOpenMistakeIdx(idx)}
                      className="w-full text-left p-3.5 px-4 font-bold text-xs text-gray-800 flex justify-between items-center bg-white border-b border-gray-100/50"
                    >
                      <span className="flex items-center gap-2 truncate pr-4">
                        <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 font-extrabold text-[10px]">
                          {idx + 1}
                        </span>
                        <span>{error.title}</span>
                      </span>
                      <span className="text-gray-400 font-medium text-[11px] uppercase whitespace-nowrap shrink-0">{open ? 'Cerrar' : 'Ver Verdad'}</span>
                    </button>

                    {open && (
                      <div className="p-4 bg-gray-50/50 space-y-3 border-t border-gray-50">
                        <div>
                          <span className="text-[9px] font-bold text-red-500 uppercase tracking-widest block mb-0.5">EL MITO COMÚN:</span>
                          <p className="text-xs text-gray-600 leading-relaxed font-medium">"{error.myth}"</p>
                        </div>
                        <div className="pt-2 border-t border-gray-200/50">
                          <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest block mb-0.5">LA CLAVE DE AVANCE:</span>
                          <p className="text-xs text-gray-700 leading-relaxed font-semibold">{error.truth}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* BONUS 4: Interactive Label Interpreter */}
        {activeBonusTab === 'labels' && (
          <div className="space-y-6">
            <div className="bg-indigo-50 text-indigo-900 border border-indigo-100 p-4 rounded-xl">
              <span className="font-bold text-xs">Bono #4: Analizador Automático de Etiquetas Nutricionales</span>
              <p className="text-[11px] text-indigo-700 mt-0.5">Inserta los valores por 100g impresos en la etiqueta de cualquier producto de supermercado y audítalo instantáneamente.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Inputs form (5 cols) */}
              <div className="md:col-span-5 bg-gray-50 border border-gray-100 rounded-2xl p-4.5 space-y-3.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Inserta valores por 100g:</span>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] font-bold text-gray-600">Azúcares Libres (g)</label>
                    <span className="text-xs font-bold text-gray-800">{labelSugar}g</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="45"
                    step="0.5"
                    value={labelSugar}
                    onChange={(e) => setLabelSugar(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-gray-250 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] font-bold text-gray-600">Grasas Saturadas (g)</label>
                    <span className="text-xs font-bold text-gray-800">{labelSatFat}g</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    step="0.2"
                    value={labelSatFat}
                    onChange={(e) => setLabelSatFat(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-gray-250 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] font-bold text-gray-600">Proteína (g)</label>
                    <span className="text-xs font-bold text-gray-800">{labelProtein}g</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    step="0.5"
                    value={labelProtein}
                    onChange={(e) => setLabelProtein(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-gray-250 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              </div>

              {/* Interactive feedback card (7 cols) */}
              <div className="md:col-span-7 bg-white border border-gray-150 rounded-2xl p-5 space-y-4 shadow-2xs">
                <div>
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block mb-1">VERDICTO DEL ANALIZADOR</span>
                  <div className={`p-2 px-4 inline-block rounded-full font-bold text-xs border ${audit.labelBg}`}>
                    📍 {audit.score}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">ANÁLISIS ESTADÍSTICO:</span>
                  <ul className="space-y-1.5">
                    {audit.recommendations.map((recValue, idx) => (
                      <li key={idx} className="text-xs text-gray-600 flex items-start gap-2 leading-relaxed">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{recValue}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-gray-100 text-[10px] text-gray-400 italic">
                  * Este analizador detecta adición de azúcares y grasas perjudiciales basados en las pautas oficiales de la OMS sobre ultraprocesamiento.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
