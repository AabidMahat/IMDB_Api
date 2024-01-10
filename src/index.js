import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import AppV2 from "./Appv2";
// import App from "./App";
import StarRating from "./StarRating";

function Test() {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <div>
      <StarRating color="green" maxRating={10} onSetRating={setMovieRating} />
      <p>This movie is rated: {movieRating}/10</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppV2 />
    {/* <StarRating
      message={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
      color="blue"
      onSetRating={() => {}}
    />
    <Test /> */}
  </React.StrictMode>
);
