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

import { BACKEND_URL } from "./config";
import socketIOClient from "socket.io-client";
import { MantineProvider } from "@mantine/core";
import { initSocket } from "./api/game";

const socket = socketIOClient(BACKEND_URL);
socket.on('connect', () => {
  initSocket(socket.id, (Math.random() + 1).toString(36).substring(7));
})
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
      <Route path="/game/:gameId" loader={gameLoader} element={<GamePage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
