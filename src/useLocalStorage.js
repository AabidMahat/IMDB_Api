import { useState, useEffect } from "react";

export function useLocalStroage(initialState, key) {
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    // console.log(storedValue);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
