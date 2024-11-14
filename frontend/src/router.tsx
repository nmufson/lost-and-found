import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';
import Game from './pages/Game/Game';
import Leaderboard from './pages/Leaderboard/Leaderboard';
import { createBrowserRouter } from 'react-router-dom';
import { GameProvider } from './context/gameContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <GameProvider>
        <Layout />
      </GameProvider>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'home/',
        element: <Home />,
      },
      {
        path: 'game/:slug',
        element: <Game />,
      },
      {
        path: 'leaderboard/',
        element: <Leaderboard />,
      },
    ],
  },
]);

export default router;
