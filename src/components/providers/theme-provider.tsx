"use client";

import * as React from "react";

export interface UseThemeProps {
  theme: string | undefined;
  setTheme: (theme: string) => void;
  resolvedTheme: "dark" | "light";
  themes: string[];
  systemTheme: "dark" | "light" | undefined;
  forcedTheme?: string;
}

const ThemeContext = React.createContext<UseThemeProps>({
  theme: "system",
  setTheme: () => {},
  resolvedTheme: "dark",
  themes: ["light", "dark", "system"],
  systemTheme: "dark",
});

export interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  storageKey?: string;
  themes?: string[];
  forcedTheme?: string;
}

function getSystemTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function disableAnimation() {
  const css = document.createElement("style");
  css.appendChild(
    document.createTextNode(
      "*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}"
    )
  );
  document.head.appendChild(css);
  return () => {
    (() => window.getComputedStyle(document.body))();
    setTimeout(() => {
      document.head.removeChild(css);
    }, 1);
  };
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = false,
  storageKey = "theme",
  themes = ["light", "dark", "system"],
  forcedTheme,
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<string>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(storageKey);
        if (stored) return stored;
      } catch {}
    }
    return defaultTheme;
  });

  const [systemTheme, setSystemTheme] = React.useState<"dark" | "light">(() => getSystemTheme());

  const activeTheme = forcedTheme ?? theme;

  const resolvedTheme: "dark" | "light" = React.useMemo(() => {
    if (activeTheme === "system" && enableSystem) {
      return systemTheme;
    }
    return activeTheme === "light" ? "light" : "dark";
  }, [activeTheme, enableSystem, systemTheme]);

  // Apply theme to DOM
  const applyTheme = React.useCallback(
    (targetTheme: "dark" | "light") => {
      const root = document.documentElement;
      const enableTransitions = disableTransitionOnChange ? disableAnimation() : null;

      if (attribute === "class") {
        root.classList.remove("light", "dark");
        root.classList.add(targetTheme);
      } else {
        root.setAttribute(attribute, targetTheme);
      }
      root.style.colorScheme = targetTheme;

      enableTransitions?.();
    },
    [attribute, disableTransitionOnChange]
  );

  // Sync state with DOM on mount and theme change
  React.useEffect(() => {
    applyTheme(resolvedTheme);
  }, [resolvedTheme, applyTheme]);

  // Listen to system theme changes
  React.useEffect(() => {
    if (!enableSystem) return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      const nextSys = e.matches ? "dark" : "light";
      setSystemTheme(nextSys);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [enableSystem]);

  // Sync across tabs
  React.useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue) {
        setThemeState(e.newValue);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [storageKey]);

  const setTheme = React.useCallback(
    (newTheme: string) => {
      setThemeState(newTheme);
      try {
        localStorage.setItem(storageKey, newTheme);
      } catch {}
    },
    [storageKey]
  );

  const contextValue = React.useMemo(
    () => ({
      theme: activeTheme,
      setTheme,
      resolvedTheme,
      themes,
      systemTheme: enableSystem ? systemTheme : undefined,
      forcedTheme,
    }),
    [activeTheme, setTheme, resolvedTheme, themes, enableSystem, systemTheme, forcedTheme]
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

export function useTheme(): UseThemeProps {
  return React.useContext(ThemeContext);
}
