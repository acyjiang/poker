import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";

import HomePage from "./routes/home";
import GamePage, { gameLoader } from "./routes/game";
import NotFoundPage from "./routes/404";
import { MantineProvider } from "@mantine/core";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      // errorElement={<NotFoundPage />}
      element={
        <div className="App">
          <header className="App-header">
            <MantineProvider
              theme={{
                fontFamily: "Greycliff CF, sans-serif",
                primaryColor: "blue",
              }}
              withGlobalStyles
              withNormalizeCSS
            >
              <Outlet />
            </MantineProvider>
          </header>
        </div>
      }
    >
      <Route index path="/" element={<HomePage />} />
      <Route path="/game/:gameId" loader={gameLoader} element={<GamePage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
