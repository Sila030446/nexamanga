"use client";
import { AuthContext } from "./(auth)/contexts/auth-context";
import { ThemeProvider } from "./themeProvider";

interface ProviderProps {
  children: React.ReactNode;
  authenticated: boolean;
}

export default function Provider({ children, authenticated }: ProviderProps) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <AuthContext.Provider value={authenticated}>
          {children}
        </AuthContext.Provider>
      </ThemeProvider>
    </>
  );
}
