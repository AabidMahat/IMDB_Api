import { useState } from "react";

import NavBar from "./NavBar";
import { NumResult } from "./NavBar";

import Box from "./ListBox";
import { MovieList } from "./ListBox";
import { WatchedMovieList, WatchedSummary } from "./WatchBox";
import { tempMovieData, tempWatchedData } from "./Data";

//Performing useContext

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <NavBar>
        <NumResult movies={movies} />
      </NavBar>
      <Main>
        <Box>
          <MovieList movies={movies} />
        </Box>

        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMovieList watched={watched} />
        </Box>
      </Main>
    </>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}
