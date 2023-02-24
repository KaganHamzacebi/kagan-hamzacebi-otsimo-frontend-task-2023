export type Meal = {
  id: number;
  ingredients: Array<Ingredient>;
  name: string;
  // Calculated Params
  averagePrice: number;
  priceScale: 1 | 2 | 3;
}

export type Ingredient = {
  groups: Array<string> | undefined;
  name: string;
  options: Array<Option>;
  quantity: number;
  quantity_type: 'gram' | 'millilitre';
}

export type Option = {
  name: string;
  per_amount: 'kilogram' | 'litre';
  price: number;
  quality: 'high' | 'medium' | 'low';
}