import { useState, useEffect } from "react";
import { BASE_URL } from "../api/client";
import { type Recipe } from "./types";

export default function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [trigger, setTrigger] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;
    fetch(`${BASE_URL}operations/recipes/`)
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;
        setRecipes(data);
        setError(null);
      })
      .catch((err) => {
        if (!isMounted) return;
        setRecipes(null);
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
    recipes,
    isLoading,
    error,
    refetch,
  };
}
