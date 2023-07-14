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
import GamePage from "./routes/game";
import NotFoundPage from "./routes/404";

import { BACKEND_URL } from "./config";
import socketIOClient from "socket.io-client";
import { MantineProvider } from "@mantine/core";

const socket = socketIOClient(BACKEND_URL);
export const SocketContext = createContext(socket);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      errorElement={<NotFoundPage />}
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
              <SocketContext.Provider value={socket}>
                <Outlet />
              </SocketContext.Provider>
            </MantineProvider>
          </header>
        </div>
      }
    >
      <Route index path="/" element={<HomePage />} />
      <Route path="/game" element={<GamePage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
