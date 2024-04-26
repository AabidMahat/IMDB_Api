import axios from "axios";
import { useEffect, useState } from "react";

const KEY = "21f1d128";

export function UseMovie(search) {
  const [medicine, setMedicine] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError("");

        const res = await axios.get(
          `http://localhost:4000/api/v1/medicines?s=${search}`,
          {
            signal: controller.signal,
            withCredentials: true,
          }
        );

        // const res = await fetch(
        //   `https://www.omdbapi.com/?apikey=${KEY}&s=${search}`,
        //   { signal: controller.signal }
        // );

        if (!res || !res.data) {
          setError("Something went wrong with fetching movies");
          throw new Error("Something went wrong with fetching movies");
        }

        const resData = await res.data;

        const data = resData?.data.medicines;

        if (!data) {
          setError(`No movie found`);
          throw new Error("Movie not found");
        }

        // Filter the data based on the search term

        console.log(search.length);

        const filteredMedicines =
          search.length > 0
            ? data.filter((medicine) =>
                medicine.name.toLowerCase().includes(search.toLowerCase())
              )
            : data;

        setMedicine(filteredMedicines);
        // console.log(data.Search);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    // if (search.length < 3) {
    //   setMedicine([]);
    //   setError("");
    //   return;
    // }
    fetchData();

    return function () {
      controller.abort();
    };
  }, [search]);

  return [medicine, isLoading, error];
}
