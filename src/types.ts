export type Gender = 'male' | 'female';

export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'extreme';

export type Goal = 'lose' | 'maintain' | 'gain';

export interface UserProfile {
  gender: Gender;
  age: number;
  weight: number; // in kg
  height: number; // in cm
  activity: ActivityLevel;
  goal: Goal;
}

export interface MacroReport {
  bmr: number;
  tdee: number;
  targetCalories: number;
  proteinGrams: number;
  carbGrams: number;
  fatGrams: number;
  proteinCals: number;
  carbCals: number;
  fatCals: number;
}

export interface FoodItem {
  id: string;
  name: string;
  category: 'protein' | 'carb' | 'fat' | 'vegetable' | 'dairy' | 'snack' | 'other';
  calories: number; // per 100g
  protein: number;  // per 100g
  carbs: number;    // per 100g
  fat: number;      // per 100g
  unit: string;     // standard unit e.g., '100g' or 'unidad'
  defaultGramWeight: number; // standard portion size in grams
}

export interface MealItem {
  id: string; // unique ID in this diet list
  food: FoodItem;
  weightGrams: number;
}

export interface Meal {
  id: string;
  name: string; // e.g., 'Desayuno', 'Almuerzo'
  items: MealItem[];
}

export interface PreMadeMenu {
  id: string;
  name: string;
  targetKcal: number;
  goal: Goal;
  description: string;
  meals: {
    name: string;
    items: {
      foodName: string;
      weightGrams: number;
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
    }[];
  }[];
}
