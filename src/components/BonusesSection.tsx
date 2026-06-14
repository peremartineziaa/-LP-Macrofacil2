import React, { useState } from 'react';
import { 
  Check, CheckSquare, Square, Star, ClipboardList, BookOpen, Clock, 
  Flame, Award, Search, CheckCircle, RefreshCw, ThumbsUp, Sparkles, Smile
} from 'lucide-react';

interface ShoppingItem {
  id: string;
  name: string;
  category: 'protein' | 'carb' | 'fat' | 'veg' | 'extra';
  done: boolean;
}

interface Recipe {
  id: string;
  title: string;
  cals: number;
  time: string;
  difficulty: 'Fácil' | 'Medio';
  ingredients: string[];
  instructions: string;
  emoji: string;
  type: 'desayuno' | 'almuerzo' | 'merienda' | 'cena';
}

interface Habit {
  id: string;
  name: string;
  description: string;
  streak: number;
  done: boolean;
}

export default function BonusesSection() {
  const [activeBonusTab, setActiveBonusTab] = useState<'shopping' | 'recipes' | 'habits'>('shopping');

  // BONO 1: Lista de Compras Inteligente State
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([
    { id: '1', name: 'Pechuga de Pollo Fresca', category: 'protein', done: false },
    { id: '2', name: 'Huevos Camperos L', category: 'protein', done: false },
    { id: '3', name: 'Lomos de Salmón congelado', category: 'protein', done: false },
    { id: '4', name: 'Queso fresco batido 0%', category: 'protein', done: false },
    { id: '5', name: 'Lata de Atún al natural', category: 'protein', done: false },
    { id: '6', name: 'Arroz Vaporizado Integral', category: 'carb', done: false },
    { id: '7', name: 'Copos de Avena ecológicos', category: 'carb', done: false },
    { id: '8', name: 'Patatas hermosas para asar', category: 'carb', done: false },
    { id: '9', name: 'Pan 100% integral de centeno', category: 'carb', done: false },
    { id: '10', name: 'Aceite de Oliva Virgen Extra (AOVE)', category: 'fat', done: false },
    { id: '11', name: 'Aguacates medianos', category: 'fat', done: false },
    { id: '12', name: 'Nueces peladas naturales', category: 'fat', done: false },
    { id: '13', name: 'Crema de cacahuete pura 100%', category: 'fat', done: false },
    { id: '14', name: 'Brócoli fresco', category: 'veg', done: false },
    { id: '15', name: 'Espinacas Baby', category: 'veg', done: false },
    { id: '16', name: 'Arándanos frescos / Fresas', category: 'veg', done: false },
    { id: '17', name: 'Especias surtidas (orégano, pimentón)', category: 'extra', done: false },
    { id: '18', name: 'Yogur Griego Light 0%', category: 'extra', done: false },
  ]);

  const toggleShoppingItem = (id: string) => {
    setShoppingList(prev =>
      prev.map(item => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const resetShoppingItems = () => {
    setShoppingList(prev => prev.map(item => ({ ...item, done: false })));
  };

  // BONO 2: Recetario de Comidas Rápidas State
  const [selectedRecipeType, setSelectedRecipeType] = useState<'all' | 'desayuno' | 'almuerzo' | 'merienda' | 'cena'>('all');
  const [activeRecipeDetail, setActiveRecipeDetail] = useState<string | null>('1');

  const recipes: Recipe[] = [
    {
      id: '1',
      title: 'Avena Nocturna Proteica con Arándanos',
      cals: 320,
      time: '5 min prep (reposar noche)',
      difficulty: 'Fácil',
      type: 'desayuno',
      emoji: '🥣',
      ingredients: ['40g copos de avena', '150g queso fresco batido 0%', '50ml leche o bebida de almendras', 'Puñado de arándanos', 'Canela al gusto'],
      instructions: 'Mezcla la avena, el queso batido, la leche y la canela en un tarro de cristal. Corona con los arándanos y déjalo reposar cerrado en la nevera durante la noche. ¡Listo para tomar recién levantado!'
    },
    {
      id: '2',
      title: 'Tostada de Centeno con Aguacate y Huevo',
      cals: 360,
      time: '8 min',
      difficulty: 'Fácil',
      type: 'desayuno',
      emoji: '🥑',
      ingredients: ['1 rebanada grande de pan de centeno integral', '40g de aguacate maduro', '1 huevo campero cocido o a la plancha', 'Pizca de sal y pimienta negra'],
      instructions: 'Tuesta la rebanada de pan. Machaca el aguacate y extiéndelo sobre la tostada. Pon encima el huevo cortado en láminas o a la plancha y sazona con sal y un toque de pimienta.'
    },
    {
      id: '3',
      title: 'Wok Exótico de Pollo y Brócoli Espreso',
      cals: 410,
      time: '12 min',
      difficulty: 'Fácil',
      type: 'almuerzo',
      emoji: '🥘',
      ingredients: ['150g de pechuga de pollo troceada', '120g de brócoli cortado pequeño', '50g de pimiento rojo en tiras', '5g de aceite de oliva (1 cucharadita)', 'Chorrito de salsa de soja baja en sodio'],
      instructions: 'Calienta el aceite en una sartén grande o wok a fuego vivo. Saltea el pollo hasta dorar, añade el brócoli y pimiento rojo. Remueve durante 6-8 minutos hasta que la verdura esté al dente. Añade la soja al final.'
    },
    {
      id: '4',
      title: 'Salmón Papillote con Patatas Rápidas al Microondas',
      cals: 460,
      time: '15 min',
      difficulty: 'Fácil',
      type: 'almuerzo',
      emoji: '🐟',
      ingredients: ['130g de lomo de salmón fresco', '120g de patata cortada en rodajas finas', 'Rodajas de limón y eneldo fresco', 'Sal y pimienta'],
      instructions: 'Coloca las patatas sazonadas en un plato apto para microondas con tapa durante 4-5 minutos. En un papel de aluminio o estuche de silicona pon el salmón, el limón y el eneldo encima. Hornea a 200°C o microondas durante 7 minutos.'
    },
    {
      id: '5',
      title: 'Bol de Yogur Griego, Proteína y Nueces',
      cals: 260,
      time: '3 min',
      difficulty: 'Fácil',
      type: 'merienda',
      emoji: '🍓',
      ingredients: ['150g de yogur griego light 0%', '15g de proteína en polvo (opcional) o edulcorante', '15g de nueces troceadas', '3 fresas fileteadas'],
      instructions: 'Bate el yogur griego con la proteína en polvo o el edulcorante hasta que quede homogéneo. Decora con las nueces y las fresas frescas por encima.'
    },
    {
      id: '6',
      title: 'Crema de Calabacín y Tortilla Esponjosa de Atún',
      cals: 340,
      time: '10 min',
      difficulty: 'Fácil',
      type: 'cena',
      emoji: '🍳',
      ingredients: ['1 tazón de crema de calabacín casera de verduras', '2 huevos L', '1 lata de atún al natural escurrido', 'Gotas de aceite de oliva'],
      instructions: 'Calienta la crema. Para la tortilla, bate los dos huevos con el atún desmigado y hazla en una sartén antiadherente con apenas unas gotas de aceite durante 2 minutos por lado.'
    },
    {
      id: '7',
      title: 'Merluza al Limón y Ensalada de Espinacas Baby',
      cals: 290,
      time: '10 min',
      difficulty: 'Fácil',
      type: 'cena',
      emoji: '🥦',
      ingredients: ['150g de filete de merluza congelado o fresco', '80g de espinacas baby', '50g de tomates cherry', '10g de semillas de calabaza', 'Limón exprimidor', '1 cucharadita de aceite de oliva'],
      instructions: 'Haz la merluza a la plancha con sal y abundante zumo de limón fresco (4 minutos por lado). Prepara en un bol la ensalada de espinacas con cherrys y semillas, aliñando con la cucharadita de aceite.'
    }
  ];

  const filteredRecipes = selectedRecipeType === 'all' 
    ? recipes 
    : recipes.filter(r => r.type === selectedRecipeType);

  // BONO 3: Planificador de Hábitos State
  const [habits, setHabits] = useState<Habit[]>([
    { id: 'h1', name: 'Mantener Déficit Calórico', description: 'Consumir exactamente tus calorías objetivo de hoy.', streak: 5, done: false },
    { id: 'h2', name: 'Paso Diario Activo', description: 'Completar un paseo de al menos 8,000 pasos.', streak: 3, done: false },
    { id: 'h3', name: 'Hidratación Óptima', description: 'Beber mínimo 2 litros de agua pura durante el día.', streak: 7, done: false },
    { id: 'h4', name: 'Descanso Reparador', description: 'Dormir entre 7 y 8 horas completas para regular la grelina (hambre).', streak: 4, done: false },
    { id: 'h5', name: 'Zero Ultraprocesados', description: 'Comer alimentos de verdad y evitar snacks comerciales azucarados.', streak: 6, done: false },
  ]);

  const toggleHabit = (id: string) => {
    setHabits(prev =>
      prev.map(h => {
        if (h.id === id) {
          const newDone = !h.done;
          return {
            ...h,
            done: newDone,
            streak: newDone ? h.streak + 1 : Math.max(0, h.streak - 1)
          };
        }
        return h;
      })
    );
  };

  const completedHabitsCount = habits.filter(h => h.done).length;
  const overallHabitsProgress = Math.round((completedHabitsCount / habits.length) * 100);

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-5 md:p-8 shadow-xl backdrop-blur-2xl space-y-8 text-white relative overflow-hidden">
      <div className="absolute right-0 top-0 translate-x-1/3 -translate-y-1/3 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl opacity-20"></div>

      {/* Hero Bonus Block Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-6 relative z-10">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30 mb-2">
            <Star className="w-3.5 h-3.5 text-orange-400 fill-orange-400 animate-pulse" />
            OBTIENES 3 BONOS EXCLUSIVOS GRATIS
          </span>
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight font-display">
            Desbloquea los Recursos Premium en Vivo
          </h3>
          <p className="text-xs text-white/60 mt-1 max-w-2xl leading-relaxed">
            Te damos acceso completo a las herramientas interactivas del sistema. Pulsa en cada pestaña de bonos para explorar listas, recetas y planificar tus hábitos diarios de salud.
          </p>
        </div>

        {/* Minimal Category Tab Selector */}
        <div className="flex flex-wrap gap-1 bg-white/5 p-1 rounded-2xl border border-white/10">
          <button
            onClick={() => setActiveBonusTab('shopping')}
            className={`flex-1 sm:flex-initial px-4 py-3 text-xs font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap duration-200 ${
              activeBonusTab === 'shopping' ? 'bg-orange-500 text-black font-extrabold shadow-md' : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            📋 Compras Inteligentes
          </button>
          <button
            onClick={() => setActiveBonusTab('recipes')}
            className={`flex-1 sm:flex-initial px-4 py-3 text-xs font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap duration-200 ${
              activeBonusTab === 'recipes' ? 'bg-orange-500 text-black font-extrabold shadow-md' : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            🥗 Recetario Rápido
          </button>
          <button
            onClick={() => setActiveBonusTab('habits')}
            className={`flex-1 sm:flex-initial px-4 py-3 text-xs font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 whitespace-nowrap duration-200 ${
              activeBonusTab === 'habits' ? 'bg-orange-500 text-black font-extrabold shadow-md' : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            🎯 Hábitos Saludables
          </button>
        </div>
      </div>

      {/* RENDER ACTIVE TAB BODY */}
      <div className="relative z-10 min-h-[300px]">
        {/* BONUS 1: COMPRAS INTELIGENTES */}
        {activeBonusTab === 'shopping' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-4 bg-white/5 border border-white/5 rounded-2xl p-5 md:p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-full border border-orange-500/20 uppercase">Bono #01</span>
                    <span className="text-xs font-bold line-through text-red-400">Valor original: 47 €</span>
                  </div>
                  <h4 className="text-lg font-extrabold text-white font-display">Guía de Compras Inteligentes</h4>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Aprende a elegir alimentos que apoyen tu pérdida de peso sin gastar más dinero en suplementos costosos ni marcas superfluas.
                  </p>
                  
                  {/* Copy Benefits explicitly requested */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-white/50 block">Beneficios del Bono:</span>
                    <div className="space-y-1.5 text-xs text-white/80">
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-orange-400" />
                        <span>Lista de alimentos recomendados</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-orange-400" />
                        <span>Alternativas saludables a procesados</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-orange-400" />
                        <span>Consejos clave para ahorrar en la compra</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <button
                    onClick={resetShoppingItems}
                    className="w-full text-center text-xs font-bold bg-white/5 hover:bg-white/10 text-white border border-white/10 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Reiniciar Carrito del Supermercado
                  </button>
                </div>
              </div>

              {/* Checklist visual table */}
              <div className="lg:col-span-8 bg-white/5 border border-white/5 rounded-2xl p-5 md:p-6 space-y-5">
                <div className="flex justify-between items-center pb-2 border-b border-white/5">
                  <span className="text-xs font-bold text-white/80 flex items-center gap-1.5">
                    <ClipboardList className="w-4 h-4 text-orange-400" /> Carrito Interactivo de Alimentos Fitness
                  </span>
                  <span className="text-[10px] text-white/40 font-mono">
                    {shoppingList.filter(i => i.done).length} / {shoppingList.length} Comprados
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Category: proteins */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">🔴 Proteínas de Alta Calidad</span>
                    <div className="space-y-1 bg-[#0a0a0f] p-3 rounded-xl border border-white/5 max-h-[200px] overflow-y-auto">
                      {shoppingList.filter(i => i.category === 'protein').map(i => (
                        <button
                          key={i.id}
                          onClick={() => toggleShoppingItem(i.id)}
                          className="w-full flex items-center gap-2 text-xs text-left py-1 text-white/70 hover:text-white font-medium"
                        >
                          {i.done ? <CheckSquare className="w-4 h-4 text-orange-400 shrink-0" /> : <Square className="w-4 h-4 text-white/20 shrink-0" />}
                          <span className={i.done ? "line-through text-white/40" : ""}>{i.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category: carbs */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">🟡 Carbohidratos Sacientes</span>
                    <div className="space-y-1 bg-[#0a0a0f] p-3 rounded-xl border border-white/5 max-h-[200px] overflow-y-auto">
                      {shoppingList.filter(i => i.category === 'carb').map(i => (
                        <button
                          key={i.id}
                          onClick={() => toggleShoppingItem(i.id)}
                          className="w-full flex items-center gap-2 text-xs text-left py-1 text-white/70 hover:text-white font-medium"
                        >
                          {i.done ? <CheckSquare className="w-4 h-4 text-orange-400 shrink-0" /> : <Square className="w-4 h-4 text-white/20 shrink-0" />}
                          <span className={i.done ? "line-through text-white/40" : ""}>{i.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category: fats */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">🔵 Grasas Saludables Esenciales</span>
                    <div className="space-y-1 bg-[#0a0a0f] p-3 rounded-xl border border-white/5 max-h-[160px] overflow-y-auto">
                      {shoppingList.filter(i => i.category === 'fat').map(i => (
                        <button
                          key={i.id}
                          onClick={() => toggleShoppingItem(i.id)}
                          className="w-full flex items-center gap-2 text-xs text-left py-1 text-white/70 hover:text-white font-medium"
                        >
                          {i.done ? <CheckSquare className="w-4 h-4 text-orange-400 shrink-0" /> : <Square className="w-4 h-4 text-white/20 shrink-0" />}
                          <span className={i.done ? "line-through text-white/40" : ""}>{i.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category: veggies */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">🟢 Vegetales, Fibra & Lácteos</span>
                    <div className="space-y-1 bg-[#0a0a0f] p-3 rounded-xl border border-white/5 max-h-[160px] overflow-y-auto">
                      {shoppingList.filter(i => i.category === 'veg' || i.category === 'extra').map(i => (
                        <button
                          key={i.id}
                          onClick={() => toggleShoppingItem(i.id)}
                          className="w-full flex items-center gap-2 text-xs text-left py-1 text-white/70 hover:text-white font-medium"
                        >
                          {i.done ? <CheckSquare className="w-4 h-4 text-orange-400 shrink-0" /> : <Square className="w-4 h-4 text-white/20 shrink-0" />}
                          <span className={i.done ? "line-through text-white/40" : ""}>{i.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BONUS 2: RECETARIO RÁPIDO */}
        {activeBonusTab === 'recipes' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-4 bg-white/5 border border-white/5 rounded-2xl p-5 md:p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-full border border-orange-500/20 uppercase">Bono #02</span>
                    <span className="text-xs font-bold line-through text-red-400">Valor original: 37 €</span>
                  </div>
                  <h4 className="text-lg font-extrabold text-white font-display">Recetario de Comidas Rápidas</h4>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Satisface tu apetito de inmediato. Recibe recetas ultra sencillas diseñadas para ajustarse a tus objetivos calóricos diarios sin complicarte la vida.
                  </p>
                  
                  {/* Copy Benefits explicitly requested */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-white/50 block">Beneficios del Bono:</span>
                    <div className="space-y-1.5 text-xs text-white/80">
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-orange-400" />
                        <span>Preparaciones deliciosas y muy rápidas</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-orange-400" />
                        <span>Ingredientes súper fáciles de conseguir</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-orange-400" />
                        <span>Múltiples opciones para toda la semana</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-2">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-white/40 block">Filtrar Recetario por momento:</span>
                  <div className="flex flex-wrap gap-1">
                    {['all', 'desayuno', 'almuerzo', 'cena'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedRecipeType(t as any)}
                        className={`text-[9px] uppercase font-bold p-1 px-2.5 rounded-md border transition-all cursor-pointer ${
                          selectedRecipeType === t 
                            ? 'bg-orange-500 border-orange-400 text-black' 
                            : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                        }`}
                      >
                        {t === 'all' ? 'Todo' : t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recipe Database details viewer */}
              <div className="lg:col-span-8 bg-white/5 border border-white/5 rounded-2xl p-4 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-5">
                {/* Scrollable List Column */}
                <div className="md:col-span-5 space-y-2 max-h-[350px] overflow-y-auto pr-1">
                  {filteredRecipes.map(recipe => (
                    <button
                      key={recipe.id}
                      onClick={() => setActiveRecipeDetail(recipe.id)}
                      className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex gap-3 items-center cursor-pointer ${
                        activeRecipeDetail === recipe.id 
                          ? 'bg-orange-500/10 border-orange-500/40 text-white' 
                          : 'bg-white/5 border-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span className="text-2xl">{recipe.emoji}</span>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold truncate text-[11px] sm:text-xs">{recipe.title}</div>
                        <div className="flex gap-2 text-[9px] mt-1 font-mono text-white/50">
                          <span>{recipe.cals} kcal</span>
                          <span>•</span>
                          <span className="truncate">{recipe.time}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Selected Detail Column */}
                <div className="md:col-span-7 bg-[#0a0a0f] border border-white/5 rounded-2xl p-4 md:p-5 flex flex-col justify-between max-h-[350px] overflow-y-auto">
                  {activeRecipeDetail ? (() => {
                    const rec = recipes.find(r => r.id === activeRecipeDetail)!;
                    return (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2.5 border-b border-white/5 pb-2">
                          <span className="text-3xl">{rec.emoji}</span>
                          <div>
                            <span className="text-[9px] font-bold text-orange-400 uppercase font-mono tracking-widest">{rec.type} ({rec.difficulty})</span>
                            <h5 className="font-extrabold text-xs sm:text-sm text-white leading-tight font-display">{rec.title}</h5>
                          </div>
                        </div>

                        {/* Ingredients list */}
                        <div>
                          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-1">Ingredientes Necesarios:</span>
                          <ul className="text-[11px] text-white/80 space-y-1 font-mono">
                            {rec.ingredients.map((ing, i) => (
                              <li key={i} className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                <span>{ing}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Instructions */}
                        <div className="pt-2 border-t border-white/5">
                          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-1">Paso de Preparación:</span>
                          <p className="text-[11px] text-white/70 leading-relaxed font-semibold italic">
                            {rec.instructions}
                          </p>
                        </div>
                      </div>
                    );
                  })() : (
                    <div className="h-full flex flex-col items-center justify-center text-center text-white/30 p-10">
                      <BookOpen className="w-8 h-8 mb-2" />
                      <p className="text-xs">Selecciona una receta para ver sus instrucciones de preparación instantánea.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BONUS 3: PLANIFICADOR DE HÁBITOS */}
        {activeBonusTab === 'habits' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-4 bg-white/5 border border-white/5 rounded-2xl p-5 md:p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-orange-400 bg-orange-500/10 px-2.5 py-0.5 rounded-full border border-orange-500/20 uppercase">Bono #03</span>
                    <span className="text-xs font-bold line-through text-red-400">Valor original: 27 €</span>
                  </div>
                  <h4 className="text-lg font-extrabold text-white font-display">Planificador de Hábitos Saludables</h4>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Un sistema práctico para auditar tu constancia diaria, prevenir atracones impulsivos y mantener la disciplina de forma automática.
                  </p>
                  
                  {/* Copy Benefits explicitly requested */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-white/50 block">Beneficios del Bono:</span>
                    <div className="space-y-1.5 text-xs text-white/80">
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-orange-400" />
                        <span>Seguimiento diario e interactivo</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-orange-400" />
                        <span>Objetivos semanales de déficit</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-orange-400" />
                        <span>Mayor disciplina y organización real</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0a0a0f] border border-white/5 rounded-xl p-4 text-center space-y-2">
                  <span className="text-[10px] text-white/40 uppercase block">Rendimemto de Disciplina Hoy:</span>
                  <div className="text-2xl font-black font-mono text-orange-400">{overallHabitsProgress}%</div>
                  {/* Visual progress bar bar */}
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden border border-white/5">
                    <div className="bg-orange-500 h-full transition-all duration-300" style={{ width: `${overallHabitsProgress}%` }}></div>
                  </div>
                  <p className="text-[9px] text-white/50 block italic">
                    {completedHabitsCount === habits.length ? '¡Felicidades! Día 100% perfecto' : `Completa los hábitos para motivar tu Streak`}
                  </p>
                </div>
              </div>

              {/* Habit checklist list view */}
              <div className="lg:col-span-8 bg-white/5 border border-white/5 rounded-2xl p-4 md:p-6 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/5 mb-2">
                  <span className="text-xs font-bold text-white/80 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-orange-400" /> Planificador y Tablero de Hábitos Diarios
                  </span>
                  <span className="text-[10px] text-white/40 block">Pulsa en cada tarjeta para marcarlo como cumplido hoy</span>
                </div>

                <div className="space-y-2.5">
                  {habits.map((habit) => (
                    <div
                      key={habit.id}
                      onClick={() => toggleHabit(habit.id)}
                      className={`p-3 md:p-4 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                        habit.done 
                          ? 'bg-orange-500/10 border-orange-500/30 text-white' 
                          : 'bg-white/5 border-white/5 text-white hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="shrink-0">
                          {habit.done ? (
                            <CheckCircle className="w-5 h-5 text-orange-400 fill-orange-500/10" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-white/20"></div>
                          )}
                        </div>
                        <div>
                          <h6 className="font-extrabold text-[11px] sm:text-xs text-white leading-tight">{habit.name}</h6>
                          <p className="text-[10px] text-white/50 mt-0.5 leading-tight">{habit.description}</p>
                        </div>
                      </div>

                      {/* Streak counter badge */}
                      <div className="bg-white/5 border border-white/5 rounded-lg px-2.5 py-1 text-center shrink-0">
                        <div className="text-[8px] text-white/40 uppercase block">Racha</div>
                        <div className="text-[10px] font-black text-orange-400 font-mono">🔥 {habit.streak}d</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
