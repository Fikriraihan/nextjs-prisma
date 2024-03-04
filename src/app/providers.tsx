"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { PersistGate } from "redux-persist/integration/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            <NextUIProvider>{children}</NextUIProvider>
          </NextThemesProvider>
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}
