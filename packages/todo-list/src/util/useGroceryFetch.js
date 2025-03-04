import { useState, useEffect } from "react";
import { groceryFetcher } from "./groceryFetcher";

export function useGroceryFetch(source) {
  const [groceryData, setGroceryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isStale = false;

    async function fetchData(url) {
      setIsLoading(true);
      setError(null);
      setGroceryData([]);

      try {
        const data = await groceryFetcher.fetch(url);
        if (!isStale) {
          setGroceryData(data);
        }
      } catch (error) {
        if (!isStale) {
          setError(error.message);
        }
      } finally {
        if (!isStale) {
          setIsLoading(false);
        }
      }
    }

    fetchData(source);

    return () => {
      isStale = true;
    };
  }, [source]);

  return { groceryData, isLoading, error };
}
