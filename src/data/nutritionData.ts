import { FoodItem, PreMadeMenu } from '../types';

export const FOOD_LIBRARY: FoodItem[] = [
  // Proteins
  { id: '1', name: 'Pechuga de Pollo (Cocida)', category: 'protein', calories: 165, protein: 31, carbs: 0, fat: 3.6, unit: 'g', defaultGramWeight: 150 },
  { id: '2', name: 'Salmón Fresco (Filete)', category: 'protein', calories: 206, protein: 22, carbs: 0, fat: 13, unit: 'g', defaultGramWeight: 150 },
  { id: '3', name: 'Atún al Natural (Lata)', category: 'protein', calories: 116, protein: 26, carbs: 0, fat: 1, unit: 'g', defaultGramWeight: 80 },
  { id: '4', name: 'Ternera Magra (Plancha)', category: 'protein', calories: 150, protein: 26, carbs: 0, fat: 5, unit: 'g', defaultGramWeight: 150 },
  { id: '5', name: 'Claras de Huevo', category: 'protein', calories: 52, protein: 11, carbs: 0.7, fat: 0.2, unit: 'g', defaultGramWeight: 200 },
  { id: '6', name: 'Huevo Entero (L)', category: 'protein', calories: 155, protein: 13, carbs: 1.1, fat: 11, unit: 'unidades', defaultGramWeight: 60 },
  { id: '7', name: 'Proteína de Suero (Whey)', category: 'protein', calories: 380, protein: 80, carbs: 5, fat: 4, unit: 'g (scoop)', defaultGramWeight: 30 },
  { id: '8', name: 'Merluza o Pescado Blanco', category: 'protein', calories: 90, protein: 19, carbs: 0, fat: 1.5, unit: 'g', defaultGramWeight: 180 },
  { id: '9', name: 'Tofu Duro', category: 'protein', calories: 144, protein: 16, carbs: 3, fat: 8, unit: 'g', defaultGramWeight: 150 },

  // Carbs
  { id: '20', name: 'Arroz Blanco (Cocido)', category: 'carb', calories: 130, protein: 2.7, carbs: 28, fat: 0.3, unit: 'g', defaultGramWeight: 150 },
  { id: '21', name: 'Arroz Integral (Cocido)', category: 'carb', calories: 111, protein: 2.6, carbs: 23, fat: 0.9, unit: 'g', defaultGramWeight: 150 },
  { id: '22', name: 'Copos de Avena', category: 'carb', calories: 389, protein: 16.9, carbs: 66, fat: 6.9, unit: 'g', defaultGramWeight: 50 },
  { id: '23', name: 'Patata Cocida', category: 'carb', calories: 87, protein: 2, carbs: 20, fat: 0.1, unit: 'g', defaultGramWeight: 200 },
  { id: '24', name: 'Boniato o Camote Asado', category: 'carb', calories: 86, protein: 1.6, carbs: 20, fat: 0.1, unit: 'g', defaultGramWeight: 200 },
  { id: '25', name: 'Pasta Integral (Cocida)', category: 'carb', calories: 124, protein: 5.3, carbs: 25, fat: 0.5, unit: 'g', defaultGramWeight: 150 },
  { id: '26', name: 'Pan de Molde Integral', category: 'carb', calories: 250, protein: 9, carbs: 43, fat: 3, unit: 'rebanadas', defaultGramWeight: 50 },
  { id: '27', name: 'Quinoa (Cocida)', category: 'carb', calories: 120, protein: 4.4, carbs: 21, fat: 1.9, unit: 'g', defaultGramWeight: 150 },
  { id: '28', name: 'Legumbres (Lentejas Cocidas)', category: 'carb', calories: 116, protein: 9, carbs: 20, fat: 0.4, unit: 'g', defaultGramWeight: 150 },

  // Fats
  { id: '40', name: 'Aceite de Oliva Virgen Extra', category: 'fat', calories: 884, protein: 0, carbs: 0, fat: 100, unit: 'g (cucharada)', defaultGramWeight: 15 },
  { id: '41', name: 'Aguacate', category: 'fat', calories: 160, protein: 2, carbs: 9, fat: 15, unit: 'g', defaultGramWeight: 100 },
  { id: '42', name: 'Nueces o Almendras', category: 'fat', calories: 607, protein: 15, carbs: 21, fat: 54, unit: 'g (puñado)', defaultGramWeight: 30 },
  { id: '43', name: 'Crema de Cacahuete Natural', category: 'fat', calories: 588, protein: 25, carbs: 20, fat: 50, unit: 'g', defaultGramWeight: 20 },
  { id: '44', name: 'Semillas de Chía', category: 'fat', calories: 486, protein: 17, carbs: 42, fat: 31, unit: 'g', defaultGramWeight: 15 },

  // Dairy
  { id: '60', name: 'Queso Fresco Batido 0% (Skyr)', category: 'dairy', calories: 46, protein: 8, carbs: 3.5, fat: 0.1, unit: 'g', defaultGramWeight: 200 },
  { id: '61', name: 'Yogur Griego Natural O%', category: 'dairy', calories: 59, protein: 10, carbs: 3.6, fat: 0.4, unit: 'g', defaultGramWeight: 150 },
  { id: '62', name: 'Leche Desnatada', category: 'dairy', calories: 34, protein: 3.4, carbs: 5, fat: 0.1, unit: 'ml', defaultGramWeight: 250 },
  { id: '63', name: 'Leche Semi-desnatada', category: 'dairy', calories: 47, protein: 3.4, carbs: 4.8, fat: 1.6, unit: 'ml', defaultGramWeight: 250 },
  { id: '64', name: 'Queso Cottage Light', category: 'dairy', calories: 98, protein: 11, carbs: 3.4, fat: 4.3, unit: 'g', defaultGramWeight: 100 },

  // Vegetables & Fruits
  { id: '80', name: 'Plátano', category: 'vegetable', calories: 89, protein: 1.1, carbs: 23, fat: 0.3, unit: 'unidad', defaultGramWeight: 120 },
  { id: '81', name: 'Manzana', category: 'vegetable', calories: 52, protein: 0.3, carbs: 14, fat: 0.2, unit: 'unidad', defaultGramWeight: 150 },
  { id: '82', name: 'Arándanos Frescos', category: 'vegetable', calories: 57, protein: 0.7, carbs: 14, fat: 0.3, unit: 'g', defaultGramWeight: 100 },
  { id: '83', name: 'Brócoli (Cocinando al vapor)', category: 'vegetable', calories: 34, protein: 2.8, carbs: 7, fat: 0.4, unit: 'g', defaultGramWeight: 150 },
  { id: '84', name: 'Espinacas Frescas', category: 'vegetable', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, unit: 'g', defaultGramWeight: 100 },
  { id: '85', name: 'Tomate de Ensalada', category: 'vegetable', calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2, unit: 'g', defaultGramWeight: 150 }
];

export const PRE_MADE_MENUS: PreMadeMenu[] = [
  {
    id: 'menu-perder-grasa',
    name: 'Menú Definición & Saciedad (Déficit)',
    targetKcal: 1600,
    goal: 'lose',
    description: 'Alto en proteínas y fibra para maximizar la saciedad mientras estás en déficit calórico. Ideal para preservar masa muscular y perder grasa corporal.',
    meals: [
      {
        name: 'Desayuno (Porridge de Proteic)',
        items: [
          { foodName: 'Copos de Avena', weightGrams: 40, calories: 155.6, protein: 6.8, carbs: 26.4, fat: 2.8 },
          { foodName: 'Proteína de Suero (Whey)', weightGrams: 30, calories: 114, protein: 24, carbs: 1.5, fat: 1.2 },
          { foodName: 'Arándanos Frescos', weightGrams: 80, calories: 45.6, protein: 0.6, carbs: 11.2, fat: 0.2 }
        ]
      },
      {
        name: 'Almuerzo (Mediodía Saludable)',
        items: [
          { foodName: 'Pechuga de Pollo (Cocida)', weightGrams: 150, calories: 247.5, protein: 46.5, carbs: 0, fat: 5.4 },
          { foodName: 'Arroz Integral (Cocido)', weightGrams: 120, calories: 133.2, protein: 3.1, carbs: 27.6, fat: 1.1 },
          { foodName: 'Brócoli (Cocinando al vapor)', weightGrams: 150, calories: 51, protein: 4.2, carbs: 10.5, fat: 0.6 },
          { foodName: 'Aceite de Oliva Virgen Extra', weightGrams: 8, calories: 70.7, protein: 0, carbs: 0, fat: 8 }
        ]
      },
      {
        name: 'Merienda (Snack Saciente)',
        items: [
          { foodName: 'Queso Fresco Batido 0% (Skyr)', weightGrams: 200, calories: 92, protein: 16, carbs: 7, fat: 0.2 },
          { foodName: 'Nueces o Almendras', weightGrams: 15, calories: 91, protein: 2.3, carbs: 3.2, fat: 8.1 }
        ]
      },
      {
        name: 'Cena (Cena Ligera Restauradora)',
        items: [
          { foodName: 'Salmón Fresco (Filete)', weightGrams: 120, calories: 247.2, protein: 26.4, carbs: 0, fat: 15.6 },
          { foodName: 'Boniato o Camote Asado', weightGrams: 100, calories: 86, protein: 1.6, carbs: 20, fat: 0.1 },
          { foodName: 'Espinacas Frescas', weightGrams: 100, calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
          { foodName: 'Aguacate', weightGrams: 50, calories: 80, protein: 1, carbs: 4.5, fat: 7.5 }
        ]
      }
    ]
  },
  {
    id: 'menu-ganar-musculo',
    name: 'Menú Súper Fuerza & Rendimiento (Ganar Músculo)',
    targetKcal: 2600,
    goal: 'gain',
    description: 'Cargado de carbohidratos de calidad y suficiente proteína para el desarrollo muscular y entrenamientos exigentes sin sentirse pesado.',
    meals: [
      {
        name: 'Desayuno Energético',
        items: [
          { foodName: 'Huevo Entero (L)', weightGrams: 120, calories: 186, protein: 15.6, carbs: 1.3, fat: 13.2 },
          { foodName: 'Pan de Molde Integral', weightGrams: 100, calories: 250, protein: 9, carbs: 43, fat: 3 },
          { foodName: 'Aguacate', weightGrams: 60, calories: 96, protein: 1.2, carbs: 5.4, fat: 9 },
          { foodName: 'Plátano', weightGrams: 120, calories: 106.8, protein: 1.3, carbs: 27.6, fat: 0.4 }
        ]
      },
      {
        name: 'Almuerzo (Potencia de Rendimiento)',
        items: [
          { foodName: 'Ternera Magra (Plancha)', weightGrams: 180, calories: 270, protein: 46.8, carbs: 0, fat: 9 },
          { foodName: 'Arroz Blanco (Cocido)', weightGrams: 250, calories: 325, protein: 6.8, carbs: 70, fat: 0.8 },
          { foodName: 'Aceite de Oliva Virgen Extra', weightGrams: 15, calories: 132.6, protein: 0, carbs: 0, fat: 15 },
          { foodName: 'Tomate de Ensalada', weightGrams: 150, calories: 27, protein: 1.4, carbs: 5.9, fat: 0.3 }
        ]
      },
      {
        name: 'Batido Pre/Post Entreno',
        items: [
          { foodName: 'Copos de Avena', weightGrams: 60, calories: 233.4, protein: 10.1, carbs: 39.6, fat: 4.1 },
          { foodName: 'Proteína de Suero (Whey)', weightGrams: 35, calories: 133, protein: 28, carbs: 1.8, fat: 1.4 },
          { foodName: 'Leche Semi-desnatada', weightGrams: 250, calories: 117.5, protein: 8.5, carbs: 12, fat: 4 },
          { foodName: 'Crema de Cacahuete Natural', weightGrams: 25, calories: 147, protein: 6.3, carbs: 5, fat: 12.5 }
        ]
      },
      {
        name: 'Cena de Recuperación Anabólica',
        items: [
          { foodName: 'Pechuga de Pollo (Cocida)', weightGrams: 150, calories: 247.5, protein: 46.5, carbs: 0, fat: 5.4 },
          { foodName: 'Patata Cocida', weightGrams: 250, calories: 217.5, protein: 5, carbs: 50, fat: 0.3 },
          { foodName: 'Brócoli (Cocinando al vapor)', weightGrams: 150, calories: 51, protein: 4.2, carbs: 10.5, fat: 0.6 },
          { foodName: 'Aceite de Oliva Virgen Extra', weightGrams: 10, calories: 88.4, protein: 0, carbs: 0, fat: 10 }
        ]
      }
    ]
  },
  {
    id: 'menu-mantenimiento',
    name: 'Menú Equilibrio & Vitalidad (Mantenimiento)',
    targetKcal: 2000,
    goal: 'maintain',
    description: 'Perfecto balance para personas activas que quieren mantener su composición corporal, sentirse ligeros y saludables todo el año.',
    meals: [
      {
        name: 'Desayuno Equilibrado',
        items: [
          { foodName: 'Yogur Griego Natural O%', weightGrams: 200, calories: 118, protein: 20, carbs: 7.2, fat: 0.8 },
          { foodName: 'Copos de Avena', weightGrams: 50, calories: 194.5, protein: 8.5, carbs: 33, fat: 3.5 },
          { foodName: 'Nueces o Almendras', weightGrams: 20, calories: 121.4, protein: 3, carbs: 4.2, fat: 10.8 },
          { foodName: 'Arándanos Frescos', weightGrams: 100, calories: 57, protein: 0.7, carbs: 14, fat: 0.3 }
        ]
      },
      {
        name: 'Almuerzo de Nutrientes',
        items: [
          { foodName: 'Salmón Fresco (Filete)', weightGrams: 150, calories: 309, protein: 33, carbs: 0, fat: 19.5 },
          { foodName: 'Quinoa (Cocida)', weightGrams: 150, calories: 180, protein: 6.6, carbs: 31.5, fat: 2.9 },
          { foodName: 'Espinacas Frescas', weightGrams: 100, calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
          { foodName: 'Tomate de Ensalada', weightGrams: 100, calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2 }
        ]
      },
      {
        name: 'Merienda Ligera Antojos',
        items: [
          { foodName: 'Pan de Molde Integral', weightGrams: 50, calories: 125, protein: 4.5, carbs: 21.5, fat: 1.5 },
          { foodName: 'Atún al Natural (Lata)', weightGrams: 80, calories: 92.8, protein: 20.8, carbs: 0, fat: 0.8 },
          { foodName: 'Aguacate', weightGrams: 40, calories: 64, protein: 0.8, carbs: 3.6, fat: 6 }
        ]
      },
      {
        name: 'Cena Nutritiva de Fácil Digestión',
        items: [
          { foodName: 'Pechuga de Pollo (Cocida)', weightGrams: 130, calories: 214.5, protein: 40.3, carbs: 0, fat: 4.7 },
          { foodName: 'Patata Cocida', weightGrams: 200, calories: 174, protein: 4, carbs: 40, fat: 0.2 },
          { foodName: 'Brócoli (Cocinando al vapor)', weightGrams: 150, calories: 51, protein: 4.2, carbs: 10.5, fat: 0.6 },
          { foodName: 'Aceite de Oliva Virgen Extra', weightGrams: 10, calories: 88.4, protein: 0, carbs: 0, fat: 10 }
        ]
      }
    ]
  }
];
