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

export function MovieList({ medicines, onHandleSelectedId }) {
  //   const [movies, setMovies] = useState(tempMovieData);
  return (
    <ul className="list list-movies">
      {medicines?.map((medicine, i) => (
        <Movie
          medicine={medicine}
          key={medicine.id}
          onHandleSelectedId={onHandleSelectedId}
        />
      ))}
    </ul>
  );
}

function Movie({ medicine, key, onHandleSelectedId }) {
  return (
    <li key={key} onClick={() => onHandleSelectedId(medicine._id)}>
      {/* <img src={movie.Poster} alt={`${movie.Title} poster`} /> */}
      <h3>{medicine.name.split("-")[0]}</h3>
      {/* <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div> */}
    </li>
  );
}
