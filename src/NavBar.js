import { useRef } from "react";
import { useKey } from "./UseKey";

export default function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
export function Search({ search, setSearch }) {
  const inputEl = useRef(null);

  useKey(function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setSearch("");
  }, "Enter");

  // useEffect(
  //   function () {
  //     document.addEventListener("keydown", (e) => {
  //       if (document.activeElement === inputEl.current) return;

  //       if (e.code === "Enter") {
  //         inputEl.current.focus();
  //         setSearch("");
  //       }
  //     });
  //   },
  //   [setSearch]
  // );

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      ref={inputEl}
    />
  );
}
export function NumResult({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
