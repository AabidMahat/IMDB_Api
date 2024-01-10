import { useEffect, useState } from "react";

import NavBar from "./NavBar";
import { NumResult, Search } from "./NavBar";

import Box from "./ListBox";
import { MovieList } from "./ListBox";
import { WatchedMovieList, WatchedSummary, MovieDetails } from "./WatchBox";

import Loading from "./Loading";

import Error from "./Error";

//Performing useContext

const KEY = "21f1d128";

export default function AppV2() {
  const [search, setSearch] = useState("Spider");

  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  function onHandleSelectedId(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatch(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbId !== id));
  }

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

  return (
    <>
      <NavBar>
        <Search search={search} setSearch={setSearch} />
        <NumResult movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {/* {isLoading ? <Loading /> : <MovieList movies={movies} />} */}
          {isLoading && <Loading />}
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              onHandleSelectedId={onHandleSelectedId}
            />
          )}
          {error && <Error message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              handleCloseMovie={handleCloseMovie}
              onHandleWatch={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatch}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}
