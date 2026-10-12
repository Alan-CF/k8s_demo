import useRecipes from "../hooks/useRecipes";

export default function Recipes() {
  const { recipes, loading, error } = useRecipes();

  return (
    <div className="flex flex-col items-center min-h-screen pt-5">
      <h1>Recipes</h1>
      <p>This is the Recipes page.</p>
    </div>
  );
}
