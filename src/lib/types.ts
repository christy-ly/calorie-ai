export interface Food {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  servingSize: string;
}

export interface FoodEntry {
  id: number;
  foodId: number;
  loggedAt: string;
  quantity: number;
}

export interface FoodEntryWithFood extends FoodEntry {
  food: Food;
}

export interface DailyTotals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}
