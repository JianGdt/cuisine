export function extractIngredients(
  meal: Record<string, string>
): { ingredient: string; measure: string }[] {
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]
    if (ingredient) {
      ingredients.push({ ingredient, measure })
    } else {
      break
    }
  }
  return ingredients
}
