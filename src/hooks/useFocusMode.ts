import { useState, useEffect, useCallback } from "react";

export function useFocusMode() {
  const [focusMode, setFocusMode] = useState(false);

  const toggle = useCallback(() => setFocusMode((v) => !v), []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === "F") {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  return { focusMode, toggle };
}
