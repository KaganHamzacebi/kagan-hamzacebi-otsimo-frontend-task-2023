type Meal = {
  id: number;
  ingredients: Array<Ingredient>;
  name: string;
  // Calculated Params
  averagePrice: number;
  priceScale: 1 | 2 | 3;
}

type RawMeal = {
  id: number;
  ingredients: Array<Ingredient>;
  name: string;
}

type Ingredient = {
  groups: Array<string> | undefined;
  name: string;
  options: Array<Option>;
  quantity: number;
  quantity_type: 'gram' | 'millilitre';
}

type Option = {
  name: string;
  per_amount: 'kilogram' | 'litre';
  price: number;
  quality: 'high' | 'medium' | 'low';
}

type Comment = {
  commentor: string;
  comment: string;
  star: number;
  date: string;
}

export type { Meal, RawMeal, Comment, Ingredient, Option };