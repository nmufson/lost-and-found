import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Game from "./pages/Game/Game";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "home/",
        element: <Home />,
      },
      {
        path: "game/",
        element: <Game />,
      },
    ],
  },
]);

export default router;
