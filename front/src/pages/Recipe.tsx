import { useParams } from "wouter";
import { useRecipe } from "../hooks/useRecipe";
import Table from "../components/table";

export default function Recipe() {
  const { id } = useParams();
  const { recipe, isLoading, error } = useRecipe(Number(id));

  return (
    <div className="flex flex-col items-center min-h-screen pt-5">
      {isLoading ? (
        <p>loading recipies...</p>
      ) : error ? (
        <p className="text-red-500">There was an error loading the recipes.</p>
      ) : (
        <div className="px-5">
          <h1 className="text-2xl font-bold">{recipe?.name} ingredient list</h1>
          <p>{recipe?.description}</p>
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
                <Table.HeaderCell>UoM</Table.HeaderCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {recipe?.recipe_ingredients.map((ingredient) => (
                <Table.Row key={ingredient.id}>
                  <Table.Cell>{ingredient.ingredient_details.name}</Table.Cell>
                  <Table.Cell>
                    {ingredient.ingredient_details.description}
                  </Table.Cell>

                  <Table.Cell>{ingredient.quantity}</Table.Cell>
                  <Table.Cell>
                    {ingredient.unit_details?.name || "units"}
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
