import useRecipes from "../hooks/useRecipes";
import { Link } from "wouter";

export default function Recipes() {
  const { recipes, isLoading, error } = useRecipes();

  return (
    <div className="flex flex-col items-center min-h-screen pt-5">
      {isLoading ? (
        <p>loading recipies...</p>
      ) : error ? (
        <p className="text-red-500">There was an error loading the recipes.</p>
      ) : (
        <div className="px-5">
          <table className="w-full max-w-4xl mx-auto border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2 text-left">
                  Recipe Id
                </th>
                <th className="border border-gray-300 p-2 text-left">
                  Recipe Name
                </th>
                <th className="border border-gray-300 p-2 text-left">
                  Recipe Description
                </th>
                <th className="border border-gray-300 p-2 text-left">
                  Recipe Ingredients
                </th>
                <th className="border border-gray-300 p-2 text-left">
                  View Details
                </th>
              </tr>
            </thead>
            <tbody>
              {recipes?.map((recipe) => (
                <tr key={recipe.id}>
                  <td className="border border-gray-300 p-2">{recipe.id}</td>
                  <td className="border border-gray-300 p-2">{recipe.name}</td>
                  <td className="border border-gray-300 p-2">
                    {recipe.description}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {recipe.recipe_ingredients
                      .map((ingredient) => ingredient.ingredient_details.name)
                      .join(", ")}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <Link
                      to={`/recipes/${recipe.id}`}
                      className="text-blue-500 underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
