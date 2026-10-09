export type DimensionEnum = "mass" | "volume" | "length";

export interface Ingredient {
  readonly id: number;
  name: string;
  description?: string | null;
}

export interface UnitMeasurement {
  readonly id: number;
  name: string;
  abbreviation: string;
  dimension?: DimensionEnum;
}

export interface RecipeIngredient {
  readonly id: number;
  ingredient_details: Ingredient;
  quantity: number;
  unit_details: UnitMeasurement | null;
}

export interface Recipe {
  readonly id: number;
  name: string;
  description?: string | null;
  recipe_ingredients: RecipeIngredient[];
}
