import { useState } from "react";

import NavBar from "./NavBar";
import { NumResult, Search } from "./NavBar";

import Box from "./ListBox";
import { MovieList } from "./ListBox";
import { WatchedMovieList, WatchedSummary, MovieDetails } from "./WatchBox";

import Loading from "./Loading";

import Error from "./Error";
import { UseMovie } from "./UseMovie";
import { useLocalStroage } from "./useLocalStorage";

//Performing useContext

export default function AppV2() {
  const [search, setSearch] = useState("Spider");

  const [selectedId, setSelectedId] = useState(null);

  const [movies, isLoading, error] = UseMovie(search); // Custom hook

  // const [watched, setWatched] = useState([]);
  // WE can use call function in local storage

  const [watched, setWatched] = useLocalStroage([], "watched");

  function onHandleSelectedId(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);

    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  function handleDeleteWatch(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbId !== id));
  }

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
