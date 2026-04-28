import { Food } from './types';

export const FOODS: Omit<Food, 'id'>[] = [
  { name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6, servingSize: '100g' },
  { name: 'Large Egg', calories: 72, protein: 6, carbs: 0.4, fat: 5, servingSize: '1 large (50g)' },
  { name: 'Brown Rice', calories: 216, protein: 5, carbs: 45, fat: 1.8, servingSize: '1 cup cooked (195g)' },
  { name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.4, servingSize: '1 medium (118g)' },
  { name: 'Greek Yogurt', calories: 100, protein: 17, carbs: 6, fat: 0.7, servingSize: '170g container' },
  { name: 'Oatmeal', calories: 150, protein: 5, carbs: 27, fat: 3, servingSize: '1 cup cooked (234g)' },
  { name: 'Almonds', calories: 164, protein: 6, carbs: 6, fat: 14, servingSize: '1 oz (28g)' },
  { name: 'Peanut Butter', calories: 190, protein: 7, carbs: 7, fat: 16, servingSize: '2 tbsp (32g)' },
  { name: 'Avocado', calories: 160, protein: 2, carbs: 9, fat: 15, servingSize: '1/2 fruit (100g)' },
  { name: 'Broccoli', calories: 55, protein: 3.7, carbs: 11, fat: 0.6, servingSize: '1 cup chopped (91g)' },
  { name: 'Salmon (baked)', calories: 208, protein: 28, carbs: 0, fat: 10, servingSize: '100g' },
  { name: 'Black Beans', calories: 227, protein: 15, carbs: 41, fat: 0.9, servingSize: '1 cup cooked (172g)' },
  { name: 'Whole Milk', calories: 149, protein: 8, carbs: 12, fat: 8, servingSize: '1 cup (244ml)' },
  { name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, servingSize: '1 medium (182g)' },
  { name: 'Spinach', calories: 7, protein: 0.9, carbs: 1.1, fat: 0.1, servingSize: '1 cup raw (30g)' },
  { name: 'Tuna (canned)', calories: 109, protein: 25, carbs: 0, fat: 0.5, servingSize: '100g drained' },
  { name: 'Sweet Potato', calories: 103, protein: 2.3, carbs: 24, fat: 0.1, servingSize: '1 medium (130g)' },
  { name: 'Ground Beef 85%', calories: 218, protein: 22, carbs: 0, fat: 14, servingSize: '100g' },
  { name: 'Pasta (cooked)', calories: 220, protein: 8, carbs: 43, fat: 1.3, servingSize: '1 cup (140g)' },
  { name: 'Cheddar Cheese', calories: 113, protein: 7, carbs: 0.4, fat: 9, servingSize: '1 oz (28g)' },
  { name: 'Cottage Cheese', calories: 206, protein: 28, carbs: 8, fat: 5, servingSize: '1 cup (226g)' },
  { name: 'Blueberries', calories: 84, protein: 1.1, carbs: 21, fat: 0.5, servingSize: '1 cup (148g)' },
  { name: 'Orange', calories: 62, protein: 1.2, carbs: 15, fat: 0.2, servingSize: '1 medium (131g)' },
  { name: 'Olive Oil', calories: 119, protein: 0, carbs: 0, fat: 14, servingSize: '1 tbsp (14g)' },
  { name: 'White Bread', calories: 79, protein: 2.7, carbs: 15, fat: 1, servingSize: '1 slice (30g)' },
];

export const QUICK_ADD_FOODS = FOODS.slice(0, 12);
