import { useState } from "react";
import Button from "./Button";

export default function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <Button isOpen={isOpen} onClick={() => setIsOpen((open) => !open)} />

      {isOpen && children}
    </div>
  );
}

export function MovieList({ movies, onHandleSelectedId }) {
  //   const [movies, setMovies] = useState(tempMovieData);
  return (
    <ul className="list list-movies">
      {movies?.map((movie, i) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          onHandleSelectedId={onHandleSelectedId}
        />
      ))}
    </ul>
  );
}

function Movie({ movie, key, onHandleSelectedId }) {
  return (
    <li key={key} onClick={() => onHandleSelectedId(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
