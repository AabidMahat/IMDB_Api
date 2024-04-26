import { useState } from "react";

import NavBar from "./NavBar";
import { NumResult, Search } from "./NavBar";

import Box from "./ListBox";
import { MovieList } from "./ListBox";
import { WatchedMovieList, WatchedSummary, MovieDetails } from "./WatchBox";

import Loading from "./Loading";

import Error from "./Error";
import { UseMovie } from "./UseMovieV1";
import { useLocalStroage } from "./useLocalStorage";
import { useSearchParams } from "react-router-dom";

//Performing useContext

export default function AppV2() {
  const [search, setSearch] = useState("");

  const [selectedId, setSelectedId] = useState(null);

  const [medicine, isLoading, error] = UseMovie(search); // Custom hook

  const [watched, setWatched] = useLocalStroage([], "watched");

  const [serachParams, setSearchParams] = useSearchParams();

  function onHandleSelectedId(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
    setSearchParams({ medicineId: id.toString() });
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);

    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  function handleDeleteWatch(id) {
    setWatched((watched) => watched.filter((medicine) => medicine.id !== id));
  }

  return (
    <>
      <NavBar>
        <Search search={search} setSearch={setSearch} />
        <NumResult movies={medicine} />
      </NavBar>
      <Main>
        <Box>
          {/* {isLoading ? <Loading /> : <MovieList movies={movies} />} */}
          {isLoading && <Loading />}
          {!isLoading && !error && (
            <MovieList
              medicines={medicine}
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
