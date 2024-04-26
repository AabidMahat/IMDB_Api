import { useEffect, useState } from "react";
import { average } from "./Data";
import StarRating from "./StarRating";
import Loading from "./Loading";
import { useKey } from "./UseKey";
import axios from "axios";
import "./order.css";
import { Link } from "react-router-dom";
// export default function WatchBox() {
//   const [isOpen2, setIsOpen2] = useState(true);

//   return (
//     <div className="box">
//       <Button isOpen={isOpen2} onClick={() => setIsOpen2((open) => !open)} />

//       {isOpen2 && (
//         <>
//           <WatchedSummary watched={watched} />
//           <WatchedMovieList watched={watched} />
//         </>
//       )}
//     </div>
//   );
// }
const KEY = "21f1d128";

export function MovieDetails({
  selectedId,
  handleCloseMovie,
  onHandleWatch,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [medicine, setMedicine] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const isWatched = watched.map((medicine) => medicine.id).includes(selectedId);
  const watchUserRating = watched.find(
    (medicine) => medicine.id === selectedId
  )?.userRating;

  function handleAdd() {
    const newWatchedMovie = {
      imdbId: selectedId,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
      imdbRating: Number(movie.imdbRating),
      runtime: Number(movie.Runtime.split(" ").at(0)),
      userRating,
    };

    const newMedicine = {
      id: selectedId,
      name: medicine.name,
      sideEffects: medicine.sideEffect,
      usage: medicine.use,
      substitues: medicine.substitute,
      medicals: medicine.medicals,
    };

    onHandleWatch(newMedicine);
    handleCloseMovie();
  }

  useKey(handleCloseMovie, "Escape");

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await axios.get(
          `http://localhost:4000/api/v1/medicines/${selectedId}`
        );

        const resData = await res.data;
        const data = resData.data.medicines;
        console.log(data);
        setMedicine(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      console.log(medicine.name);
      if (!medicine.name) return;
      document.title = `Medicine | ${medicine.name}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [medicine.name]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handleCloseMovie}>
              &#8592;
            </button>
            <img src={movie.Poster} alt={movie.Title} />
            <div className="details-overview">
              <h2>{medicine.name}</h2>
              <p>
                {/* {movie.Released} &bull; {movie.Runtime} */}
                Medicine Type &bull; {(medicine.name ?? "").split(" ").pop()}
              </p>
              <p>
                Content &bull;
                {(medicine.name ?? "").match(
                  /\d+(\.\d+)?(mg)?(\/\d+(\.\d+)?(mg)?)?/
                )?.[0] ?? "No Content Provided"}
              </p>
              <p>
                <span>⭐</span>
                {movie.imdbRating} 5
              </p>
            </div>
          </header>
          <section>
            <ol className="olcards">
              <li style={{ "--cardColor": "#343a40" }}>
                <div className="content">
                  <div className="title">Usage</div>
                  <div className="text">
                    {medicine.use?.map((med, index) => (
                      <p key={index}>{med}</p>
                    ))}
                  </div>
                </div>
              </li>
              <li style={{ "--cardColor": "#343a40" }}>
                <div className="content">
                  <div className="title">SideEffects</div>
                  <div className="text">
                    {medicine.sideEffect?.map((med, index) => (
                      <p key={index}>{med}</p>
                    ))}
                  </div>
                </div>
              </li>
              <li style={{ "--cardColor": "#343a40" }}>
                <div className="content">
                  <div className="title">Substitue</div>
                  <div className="text">
                    {medicine.substitute?.map((med, index) => (
                      <p key={index}>{med}</p>
                    ))}
                  </div>
                </div>
              </li>
              <li style={{ "--cardColor": "#343a40" }}>
                <div className="content">
                  <div className="title">Medicals</div>
                  <div className="text">
                    {medicine.medicals?.map((med) => (
                      <p key={med.cityName}>
                        {med.cityName}{" "}
                        <span className="contact">({med.contact})</span>
                      </p>
                    ))}
                  </div>
                </div>
              </li>
            </ol>
          </section>
          <div className="btnCenter">
            {}
            <Link
              to={`http://localhost:5173/app/cities/?medical=${encodeURIComponent(
                JSON.stringify(medicine.medicals)
              )}`}>
              <button class="button-30">Go to Map</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}

export function WatchedMovieList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={watched.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, key, onDeleteWatched }) {
  return (
    <li key={key}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbId)}>
          X
        </button>
      </div>
    </li>
  );
}

/* <p>
              Usage:-
              <ol>
                {medicine.use?.map((med) => (
                  <li>{med}</li>
                ))}
              </ol>
            </p>
            <p>
              SideEffects:-
              <ol>
                {medicine.sideEffect?.map((med) => (
                  <li>{med}</li>
                ))}
              </ol>
            </p>
            <p>
              Substitue:-
              <ol>
                {medicine.substitute?.map((med) => (
                  <li>{med}</li>
                ))}
              </ol>
            </p>
            <p>
              Medicals:-
              <ol>
                {medicine.medicals?.map((med) => (
                  <li>{med.cityName}</li>
                ))}
              </ol>
            </p> */
