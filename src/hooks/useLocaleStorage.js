import { useState, useEffect } from "react";
function useLocalStorageState(key, defaultValue) {
  const [state, setState] = useState(() => {
    let savedState = localStorage.getItem(key);

    if (savedState === null) {
      return defaultValue;
    }
    try {
      return JSON.parse(savedState);
    } catch {
      return savedState;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default useLocalStorageState;
