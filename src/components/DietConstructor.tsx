import React, { useState, useEffect } from 'react';
import { FoodItem, Meal, MealItem, MacroReport, UserProfile } from '../types';
import { FOOD_LIBRARY, PRE_MADE_MENUS } from '../data/nutritionData';
import { Search, Plus, Trash2, RotateCcw, Copy, Check, Scale, BookOpen, Utensils, Award } from 'lucide-react';

interface DietConstructorProps {
  targetMacros: MacroReport;
  userProfile: UserProfile;
}

const DEFAULT_MEALS = [
  { id: 'desayuno', name: 'Desayuno', items: [] },
  { id: 'almuerzo', name: 'Almuerzo / Comida Principal', items: [] },
  { id: 'merienda', name: 'Merienda / Snack', items: [] },
  { id: 'cena', name: 'Cena / Última Comida', items: [] },
];

export default function DietConstructor({ targetMacros, userProfile }: DietConstructorProps) {
  const [meals, setMeals] = useState<Meal[]>(() => {
    // try to load from localStorage first
    const saved = localStorage.getItem('macro_facil_meals');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return DEFAULT_MEALS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [customGramWeights, setCustomGramWeights] = useState<Record<string, number>>({});
  const [selectedMealId, setSelectedMealId] = useState<string>('desayuno');
  const [copySuccessMessage, setCopySuccessMessage] = useState<string | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('macro_facil_meals', JSON.stringify(meals));
  }, [meals]);

  const handleAddFood = (food: FoodItem, targetMealId: string) => {
    const customWeight = customGramWeights[food.id] || food.defaultGramWeight;
    const newItem: MealItem = {
      id: `${food.id}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      food,
      weightGrams: customWeight,
    };

    setMeals(prevMeals =>
      prevMeals.map(m => {
        if (m.id === targetMealId) {
          return { ...m, items: [...m.items, newItem] };
        }
        return m;
      })
    );
  };

  const handleDeleteItem = (mealId: string, itemId: string) => {
    setMeals(prevMeals =>
      prevMeals.map(m => {
        if (m.id === mealId) {
          return { ...m, items: m.items.filter(item => item.id !== itemId) };
        }
        return m;
      })
    );
  };

  const handleUpdateWeight = (mealId: string, itemId: string, newWeight: number) => {
    if (newWeight <= 0) return;
    setMeals(prevMeals =>
      prevMeals.map(m => {
        if (m.id === mealId) {
          return {
            ...m,
            items: m.items.map(item =>
              item.id === itemId ? { ...item, weightGrams: newWeight } : item
            ),
          };
        }
        return m;
      })
    );
  };

  const handleResetDiet = () => {
    if (window.confirm('¿Estás seguro de que deseas limpiar tu menú actual para volver a empezar?')) {
      setMeals(DEFAULT_MEALS);
    }
  };

  // Convert are calculations for a food item based on weight
  const getNutrientsForWeight = (food: FoodItem, weightGrams: number) => {
    const factor = weightGrams / 100;
    return {
      calories: Math.round(food.calories * factor),
      protein: parseFloat((food.protein * factor).toFixed(1)),
      carbs: parseFloat((food.carbs * factor).toFixed(1)),
      fat: parseFloat((food.fat * factor).toFixed(1)),
    };
  };

  // Calculate daily aggregates
  const calculateTotalNutrients = () => {
    let calories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;

    meals.forEach(m => {
      m.items.forEach(item => {
        const nutr = getNutrientsForWeight(item.food, item.weightGrams);
        calories += nutr.calories;
        protein += nutr.protein;
        carbs += nutr.carbs;
        fat += nutr.fat;
      });
    });

    return {
      calories,
      protein: parseFloat(protein.toFixed(1)),
      carbs: parseFloat(carbs.toFixed(1)),
      fat: parseFloat(fat.toFixed(1)),
    };
  };

  const totals = calculateTotalNutrients();

  // Load a Pre-made Menu directly into the state
  const handleLoadPresetMenu = (menuId: string) => {
    const menu = PRE_MADE_MENUS.find(m => m.id === menuId);
    if (!menu) return;

    const formattedMeals = DEFAULT_MEALS.map(defaultMeal => {
      // Find matches from pre-made meals
      let menuMeal = menu.meals.find(mm => {
        if (defaultMeal.id === 'desayuno' && mm.name.toLowerCase().includes('desayun')) return true;
        if (defaultMeal.id === 'almuerzo' && (mm.name.toLowerCase().includes('almuerz') || mm.name.toLowerCase().includes('comida'))) return true;
        if (defaultMeal.id === 'merienda' && (mm.name.toLowerCase().includes('meriend') || mm.name.toLowerCase().includes('batido') || mm.name.toLowerCase().includes('snack'))) return true;
        if (defaultMeal.id === 'cena' && mm.name.toLowerCase().includes('cena')) return true;
        return false;
      });

      // If cannot find, check index order mapping
      if (!menuMeal) {
        if (defaultMeal.id === 'desayuno') menuMeal = menu.meals[0];
        if (defaultMeal.id === 'almuerzo') menuMeal = menu.meals[1];
        if (defaultMeal.id === 'merienda') menuMeal = menu.meals[2];
        if (defaultMeal.id === 'cena') menuMeal = menu.meals[3];
      }

      if (!menuMeal) return { ...defaultMeal, items: [] };

      // Map pre-made items back to food database objects
      const items = menuMeal.items.map(item => {
        // Find closest food item match
        let foundFood = FOOD_LIBRARY.find(f => f.name.toLowerCase().includes(item.foodName.toLowerCase()));
        if (!foundFood) {
          // construct a temporary custom one
          foundFood = {
            id: `temp-${Math.random()}`,
            name: item.foodName,
            category: 'other',
            calories: Math.round((item.calories / item.weightGrams) * 100),
            protein: parseFloat(((item.protein / item.weightGrams) * 100).toFixed(1)),
            carbs: parseFloat(((item.carbs / item.weightGrams) * 100).toFixed(1)),
            fat: parseFloat(((item.fat / item.weightGrams) * 100).toFixed(1)),
            unit: 'g',
            defaultGramWeight: item.weightGrams,
          };
        }

        return {
          id: `preset-${foundFood.id}-${Math.random()}`,
          food: foundFood,
          weightGrams: item.weightGrams,
        };
      });

      return {
        ...defaultMeal,
        items,
      };
    });

    setMeals(formattedMeals);
    setCopySuccessMessage(`¡Plantilla de "${menu.name}" cargada con éxito en tu Constructor!`);
    setTimeout(() => setCopySuccessMessage(null), 4000);

    // Scroll smoothly back to constructor
    document.getElementById('diet-constructor-core')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Helper values for search display options
  const filteredFoods = FOOD_LIBRARY.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || f.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'protein', label: 'Proteínas' },
    { id: 'carb', label: 'Carbohidratos' },
    { id: 'fat', label: 'Grasas Sanas' },
    { id: 'dairy', label: 'Lácteos' },
    { id: 'vegetable', label: 'Frutas/Verduras' },
  ];

  // Helper progress calculations
  const caloriePercent = Math.min(Math.round((totals.calories / targetMacros.targetCalories) * 100), 150);
  const proteinPercent = Math.min(Math.round((totals.protein / targetMacros.proteinGrams) * 100), 150);
  const carbPercent = Math.min(Math.round((totals.carbs / targetMacros.carbGrams) * 100), 150);
  const fatPercent = Math.min(Math.round((totals.fat / targetMacros.fatGrams) * 100), 150);

  return (
    <div className="space-y-8" id="diet-constructor-core">
      {/* Alert toast notification on copy success */}
      {copySuccessMessage && (
        <div className="fixed top-4 right-4 z-50 max-w-md bg-orange-950 text-white rounded-2xl p-4 shadow-xl flex items-center gap-3 animate-fade-in border border-orange-500">
          <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
            <Check className="w-5 h-5 text-orange-400" />
          </div>
          <div className="text-sm font-medium">{copySuccessMessage}</div>
        </div>
      )}

      {/* Target Balance Banner */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30 mb-2">
              <BookOpen className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
              Paso 2: Construye Tu Plan Diario
            </span>
            <h3 className="text-2xl font-black text-white tracking-tight font-display">Balance de Nutrientes en Tiempo Real</h3>
            <p className="text-xs text-white/60 mt-0.5">Controla las calorías añadidas y compara contra las metas científicas establecidas abajo.</p>
          </div>
          <button
            onClick={handleResetDiet}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/15 hover:border-red-400/50 hover:bg-red-500/10 text-white/60 hover:text-red-300 text-xs font-semibold transition-all self-start md:self-auto cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Limpiar Dieta
          </button>
        </div>

        {/* Live Ring / Gauge grid stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Calorie summary */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 shadow-md flex flex-col justify-between relative overflow-hidden backdrop-blur-md">
            <div>
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">Calorías Diarias</span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-2xl font-black text-white font-mono">{totals.calories}</span>
                <span className="text-[11px] text-white/40 font-mono">/ {targetMacros.targetCalories} kcal</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center text-[11px] mb-1 text-white/60">
                <span>Progreso</span>
                <span className={totals.calories > targetMacros.targetCalories ? "text-amber-400 font-black font-mono" : "text-orange-400 font-black font-mono"}>
                  {caloriePercent}%
                </span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    caloriePercent > 105 ? 'bg-amber-500' : caloriePercent > 80 ? 'bg-orange-500' : 'bg-slate-600'
                  }`}
                  style={{ width: `${caloriePercent}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Protein details */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 shadow-md flex flex-col justify-between backdrop-blur-md">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">Proteína</span>
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              </div>
              <div className="flex items-baseline gap-1.5 mt-1 font-mono">
                <span className="text-2xl font-black text-white">{totals.protein}g</span>
                <span className="text-[11px] text-white/40">/ {targetMacros.proteinGrams}g</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center text-[11px] mb-1 text-white/60">
                <span>Construcción</span>
                <span className="text-red-400 font-extrabold font-mono">{proteinPercent}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 rounded-full transition-all duration-300"
                  style={{ width: `${proteinPercent}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Carbs details */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 shadow-md flex flex-col justify-between backdrop-blur-md">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">Carbohidratos</span>
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              </div>
              <div className="flex items-baseline gap-1.5 mt-1 font-mono">
                <span className="text-2xl font-black text-white">{totals.carbs}g</span>
                <span className="text-[11px] text-white/40">/ {targetMacros.carbGrams}g</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center text-[11px] mb-1 text-white/60">
                <span>Energía</span>
                <span className="text-amber-400 font-extrabold font-mono">{carbPercent}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-300"
                  style={{ width: `${carbPercent}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Fats details */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 shadow-md flex flex-col justify-between backdrop-blur-md">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">Grasas Sanas</span>
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              </div>
              <div className="flex items-baseline gap-1.5 mt-1 font-mono">
                <span className="text-2xl font-black text-white">{totals.fat}g</span>
                <span className="text-[11px] text-white/40">/ {targetMacros.fatGrams}g</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center text-[11px] mb-1 text-white/60">
                <span>Hormonal</span>
                <span className="text-blue-400 font-extrabold font-mono">{fatPercent}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${fatPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Builder Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: Food Search & Library (5 cols) */}
        <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-3xl shadow-xl p-5 md:p-6 space-y-5 text-white backdrop-blur-xl">
          <div>
            <h4 className="text-base font-bold text-white tracking-tight flex items-center gap-2 font-display">
              <Utensils className="w-4.5 h-4.5 text-orange-400" />
              Biblioteca de Alimentos
            </h4>
            <p className="text-xs text-white/60 mt-0.5">Busca ingredientes y añádelos a tus porciones del día.</p>
          </div>

          {/* Search container */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-white/30" />
            </span>
            <input
              type="text"
              placeholder="Buscar pechuga, avena, huevo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 focus:border-orange-500 text-sm p-2.5 pl-9 rounded-xl outline-hidden focus:ring-1 focus:ring-orange-500 transition-all font-semibold text-white placeholder:text-white/30"
            />
          </div>

          {/* Horizontal scroll category badges */}
          <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-thin">
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                  selectedCategory === c.id
                    ? 'bg-orange-500 border-orange-500 text-black font-black'
                    : 'bg-white/5 text-white/65 border-white/10 hover:border-white/15'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Scrollable list of foods */}
          <div className="max-h-[380px] overflow-y-auto space-y-2.5 pr-1.5">
            {filteredFoods.length === 0 ? (
              <div className="text-center py-12 text-white/40 text-xs font-semibold">
                No se encontraron alimentos en esta categoría.
              </div>
            ) : (
              filteredFoods.map(food => {
                const itemWeight = customGramWeights[food.id] || food.defaultGramWeight;
                const activeColor =
                  food.category === 'protein'
                    ? 'border-l-red-500'
                    : food.category === 'carb'
                    ? 'border-l-amber-500'
                    : food.category === 'fat'
                    ? 'border-l-blue-500'
                    : 'border-l-slate-400';

                const localizedNutr = getNutrientsForWeight(food, itemWeight);

                return (
                  <div
                    key={food.id}
                    className={`p-3 bg-white/5 border border-white/5 hover:border-white/10 rounded-2xl transition-all border-l-4 ${activeColor} flex flex-col justify-between gap-3`}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="text-xs font-bold text-white tracking-tight block leading-tight">{food.name}</span>
                        <span className="text-[10px] uppercase text-white/40 font-bold tracking-wider font-mono">
                          Por 100g: {food.calories} kcal • P:{food.protein}g C:{food.carbs}g G:{food.fat}g
                        </span>
                      </div>
                    </div>

                    {/* Quantity selectors and CTA */}
                    <div className="flex items-center gap-2 pt-2 border-t border-white/10 justify-between">
                      <div className="flex items-center gap-1.5 shrink-0">
                        <Scale className="w-3.5 h-3.5 text-white/40" />
                        <input
                          type="number"
                          value={itemWeight}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 0;
                            setCustomGramWeights(prev => ({ ...prev, [food.id]: val }));
                          }}
                          className="w-16 bg-white/10 border border-white/10 text-center rounded-lg text-xs p-1 font-bold outline-hidden focus:border-orange-500 text-white"
                        />
                        <span className="text-[11px] text-white/50 font-medium">gramos</span>
                      </div>

                      {/* Nutrient micro summary for this customized portion */}
                      <div className="text-[11px] font-bold text-orange-400 bg-orange-500/20 px-2.5 py-1 rounded-lg shrink-0 font-mono">
                        {localizedNutr.calories} kcal
                      </div>
                    </div>

                    {/* Meal selector to add to */}
                    <div className="grid grid-cols-5 gap-1.5 pt-1">
                      {meals.map(m => (
                        <button
                          key={m.id}
                          onClick={() => handleAddFood(food, m.id)}
                          title={`Añadir a ${m.name}`}
                          className="text-[10px] bg-white/5 border hover:bg-orange-500 hover:border-orange-500 hover:text-black transition-all border-white/5 text-white/80 p-1 font-bold rounded-lg text-center truncate cursor-pointer"
                        >
                          + {m.name.split(' ')[0]}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <p className="text-[10px] text-white/40 leading-relaxed pt-2 border-t border-white/10">
            * Puedes modificar el peso de los alimentos tantas veces como quieras para ajustar tu objetivo perfectamente.
          </p>
        </div>

        {/* RIGHT COLUMN: Meals List Constructor (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {meals.map(meal => {
            // calculate meal aggregates
            let mealKcal = 0;
            let mealP = 0;
            let mealC = 0;
            let mealF = 0;

            meal.items.forEach(item => {
              const nutr = getNutrientsForWeight(item.food, item.weightGrams);
              mealKcal += nutr.calories;
              mealP += nutr.protein;
              mealC += nutr.carbs;
              mealF += nutr.fat;
            });

            return (
              <div key={meal.id} className="bg-white/5 border border-white/10 rounded-3xl p-5 md:p-6 shadow-xl space-y-4 text-white backdrop-blur-xl">
                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                  <div>
                    <h5 className="font-bold text-sm text-white font-display">{meal.name}</h5>
                    <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">
                      {meal.items.length === 1 ? '1 Alimento' : `${meal.items.length} Alimentos`}
                    </span>
                  </div>

                  {/* Meal sub-totals header */}
                  <div className="text-right text-[11px] font-bold text-white/80 bg-white/5 px-3 py-1 rounded-xl border border-white/5 font-mono">
                    <span className="text-white text-xs mr-2">{mealKcal} kcal</span>
                    <span className="text-red-400 mr-2">P: {mealP.toFixed(1)}g</span>
                    <span className="text-amber-400 mr-2">C: {mealC.toFixed(1)}g</span>
                    <span className="text-blue-400">G: {mealF.toFixed(1)}g</span>
                  </div>
                </div>

                {/* List items added */}
                {meal.items.length === 0 ? (
                  <div className="py-6 border-dashed border-2 border-white/10 rounded-2xl flex flex-col items-center justify-center text-center text-white/40 bg-white/2-0.5">
                    <p className="text-xs font-semibold">No hay alimentos en esta comida.</p>
                    <p className="text-[10px] mt-0.5 text-white/30">Introduce gramos y haz clic en el botón de añadir a la izquierda.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {meal.items.map(item => {
                      const computed = getNutrientsForWeight(item.food, item.weightGrams);

                      return (
                        <div
                          key={item.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 gap-3 group transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-[#0a0a0f] border border-white/10 shrink-0">
                              <Utensils className="w-4 h-4 text-orange-400" />
                            </div>
                            <div>
                              <span className="font-bold text-xs text-white block line-clamp-1">{item.food.name}</span>
                              <span className="text-[10px] text-white/40 font-semibold uppercase tracking-wide font-mono">
                                {computed.calories} kcal • P: {computed.protein}g | C: {computed.carbs}g | G: {computed.fat}g
                              </span>
                            </div>
                          </div>

                          {/* Controls: Edit weight, Delete */}
                          <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-0 border-white/10 shrink-0">
                            <div className="flex items-center gap-1.5">
                              <input
                                type="number"
                                min="1"
                                max="1000"
                                value={item.weightGrams}
                                onChange={(e) => handleUpdateWeight(meal.id, item.id, parseInt(e.target.value) || 0)}
                                className="w-14 bg-white/10 border border-white/10 text-white rounded-lg text-center text-xs p-1 font-bold focus:border-orange-500"
                              />
                              <span className="text-[10px] text-white/40 font-semibold font-mono">g</span>
                            </div>

                            <button
                              onClick={() => handleDeleteItem(meal.id, item.id)}
                              className="text-white/40 hover:text-red-400 p-1 rounded-lg hover:bg-red-500/10 transition-all shrink-0 cursor-pointer"
                              title="Eliminar alimento"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Copy Premade Menus Block in Accordion style (Promised: Menús Listos para Copiar) */}
      <div className="bg-white/5 border border-white/10 text-white rounded-3xl p-6 md:p-8 space-y-6 backdrop-blur-2xl shadow-xl">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30 mb-3">
            <Award className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
            Bono: Menús Listos para Copiar
          </span>
          <h4 className="text-2xl font-black tracking-tight font-display text-white">Planes Listos Para Empezar Hoy Mismo</h4>
          <p className="text-xs text-white/60 mt-1">Copia menús completos optimizados a las metas de calorías estándar en un solo clic.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRE_MADE_MENUS.map(menu => {
            const isTargetGoal = menu.goal === userProfile.goal;
            return (
              <div
                key={menu.id}
                className={`bg-[#0d0d14] border rounded-2xl p-5 flex flex-col justify-between gap-5 relative transition-all ${
                  isTargetGoal
                    ? 'border-orange-500/60 shadow-[0_0_15px_rgba(249,115,22,0.15)] ring-1 ring-orange-500/30'
                    : 'border-white/5 hover:border-white/10'
                }`}
              >
                {isTargetGoal && (
                  <span className="absolute -top-3 left-4 bg-orange-500 text-black font-black text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full">
                    Recomendado para ti
                  </span>
                )}

                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-extrabold text-sm text-white font-display">{menu.name}</span>
                    <span className="bg-white/5 px-2.5 py-1 text-orange-400 font-extrabold text-xs rounded-lg whitespace-nowrap font-mono">
                      {menu.targetKcal} kcal
                    </span>
                  </div>
                  <p className="text-xs text-white/60 line-clamp-3 leading-relaxed">
                    {menu.description}
                  </p>

                  <div className="space-y-1 bg-black/40 p-2.5 rounded-lg border border-white/5">
                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest block mb-1">Estructura del menú:</span>
                    {menu.meals.map((meal, idx) => (
                      <div key={idx} className="flex justify-between text-[11px] text-white/70">
                        <span className="truncate">{meal.name.split(' (')[0]}</span>
                        <span className="text-[10px] text-orange-400 font-mono">{meal.items.length} foods</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleLoadPresetMenu(menu.id)}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold transition-all bg-orange-500 hover:bg-orange-400 text-black shadow-xs md:whitespace-nowrap cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  Copiar menú al Constructor
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
