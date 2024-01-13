import { useEffect } from "react";

export function useKey(handleCloseMovie, KEY) {
  useEffect(() => {
    function callback(e) {
      if (e.code.toLowerCase() === KEY.toLowerCase()) {
        handleCloseMovie();
      }
    }
    document.addEventListener("keydown", callback);

    return function () {
      document.removeEventListener("keydown", callback);
    };
  }, [handleCloseMovie, KEY]);
}
