import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ScrollContextType = {
  scrollPositions: Record<string, number>;
  saveScrollPosition: (key: string, position: number) => void;
  getScrollPosition: (key: string) => number;
};

const ScrollContext = createContext<ScrollContextType | null>(null);

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [scrollPositions, setScrollPositions] = useState<
    Record<string, number>
  >({});

  const saveScrollPosition = useCallback((key: string, position: number) => {
    setScrollPositions((prev) => ({
      ...prev,
      [key]: position,
    }));
  }, []);

  const getScrollPosition = useCallback(
    (key: string) => {
      return scrollPositions[key] ?? 0;
    },
    [scrollPositions],
  );

  const value = useMemo(
    () => ({
      scrollPositions,
      saveScrollPosition,
      getScrollPosition,
    }),
    [scrollPositions, saveScrollPosition, getScrollPosition],
  );

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
}

/* eslint-disable react-refresh/only-export-components */
export function useScroll() {
  const context = useContext(ScrollContext);

  if (!context) {
    throw new Error("useScroll must be used inside ScrollProvider");
  }

  return context;
}
