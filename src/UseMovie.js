import { useEffect, useState } from "react";

const KEY = "21f1d128";

export function UseMovie(search) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${search}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          setError("Something went wrong with fetching movies");
          throw new Error("Something went wrong with fetching movies");
        }

        const data = await res.json();
        if (data.Response === "False") {
          setError(`No movie found`);
          throw new Error("Movie not found");
        }

        setMovies(data.Search);
        console.log(data.Search);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (search.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    fetchData();

    return function () {
      controller.abort();
    };
  }, [search]);

  return [movies, isLoading, error];
}
