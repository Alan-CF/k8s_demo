import useRecipes from "../hooks/useRecipes";
import { Link } from "wouter";
import Table from "../components/table";

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
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.HeaderCell>Recipe Id</Table.HeaderCell>
                <Table.HeaderCell>Recipe Name</Table.HeaderCell>
                <Table.HeaderCell>Recipe Description</Table.HeaderCell>
                <Table.HeaderCell>Recipe Ingredients</Table.HeaderCell>
                <Table.HeaderCell>View Details</Table.HeaderCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {recipes?.map((recipe) => (
                <Table.Row key={recipe.id}>
                  <Table.Cell>{recipe.id}</Table.Cell>
                  <Table.Cell>{recipe.name}</Table.Cell>
                  <Table.Cell>{recipe.description}</Table.Cell>
                  <Table.Cell>
                    {recipe.recipe_ingredients
                      .map((ingredient) => ingredient.ingredient_details.name)
                      .join(", ")}
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      to={`/recipes/${recipe.id}`}
                      className="text-blue-500 underline"
                    >
                      View
                    </Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )}
    </div>
  );
}
