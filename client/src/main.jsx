import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';

import HomePage, { homeLoader } from "./routes/HomePage";
import GamePage, { gameLoader } from './routes/GamePage';
import NotFoundPage from './routes/NotFoundPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<NotFoundPage />}>
      <Route index path="/" loader={homeLoader} element={<HomePage />} />
      <Route
        path="/game"
        loader={gameLoader}
        element={<GamePage />}
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
