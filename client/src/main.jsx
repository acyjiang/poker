import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import HomePage, { homeLoader } from "./routes/home";
import GamePage, { gameLoader } from "./routes/game";
import NotFoundPage from "./routes/404";

import { BACKEND_URL } from "./config";
import socketIOClient from "socket.io-client";

const socket = socketIOClient(BACKEND_URL);
export const SocketContext = createContext(socket);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFoundPage />}>
      <Route index path="/" element={<HomePage />} />
      <Route path="/game" element={<GamePage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SocketContext.Provider value={socket}>
      <RouterProvider router={router} />
    </SocketContext.Provider>
  </React.StrictMode>
);
