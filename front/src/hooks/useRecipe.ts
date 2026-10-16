import { useState, useEffect } from "react";
import { type Recipe } from "./types";
import { BASE_URL } from "../api/client";

export function useRecipe(id: number) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loadedId, setLoadedId] = useState<number | null>(null);
  const [trigger, setTrigger] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;
    fetch(`${BASE_URL}operations/recipes/${id}/`)
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;
        setRecipe(data);
        setError(null);
        setLoadedId(id);
      })
      .catch((err) => {
        if (!isMounted) return;
        setRecipe(null);
        setError(err);
        setLoadedId(id);
      });

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted = false;
    };
  }, [trigger, id]);

  // Derive loading: true whenever the data we have doesn't belong to the current id
  const isLoading = loadedId !== id;

  function refetch() {
    setTrigger((prev) => prev + 1);
  }

  return {
    recipe,
    isLoading,
    error,
    refetch,
  };
}
