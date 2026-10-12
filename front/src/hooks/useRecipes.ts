import { useState, useEffect } from "react";
import { type Recipe } from "./types";

export default function useRecipes() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [trigger, setTrigger] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/recipes")
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;
        setRecipe(data);
        setError(null);
      })
      .catch((err) => {
        if (!isMounted) return;
        setRecipe(null);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted = false;
    };
  }, [trigger]);

  function refetch() {
    setIsLoading(true);
    setTrigger((prev) => prev + 1);
  }

  return {
    recipe,
    isLoading,
    error,
    refetch,
  };
}
