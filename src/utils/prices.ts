export const fixedPrices: Record<string, number> = {
  "Beef Wellington": 22,
  "Chicken Alfredo": 18,
  "Spaghetti Bolognese": 15,
  "Fish & Chips": 12,
  "Chicken Curry": 16,
};

export function getPrice(mealName: string): number {
  return fixedPrices[mealName] ?? 14;
}