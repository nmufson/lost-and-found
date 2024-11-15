import { useEffect } from 'react';
import { GameInfo } from '../../../../types'; // Adjust import path as needed

interface UseGameTimerProps {
  isGameActive: boolean;
  setGameInfo: (updateFn: (prevInfo: GameInfo) => GameInfo) => void;
}

export const useGameTimer = ({
  isGameActive,
  setGameInfo,
}: UseGameTimerProps) => {
  useEffect(() => {
    let timer: number;

    if (isGameActive) {
      timer = window.setInterval(() => {
        setGameInfo((prevGameInfo) => ({
          ...prevGameInfo,
          time: prevGameInfo.time + 1,
        }));
      }, 100);
      // decisecond

      // clear timer on unmount
      return () => clearInterval(timer);
    }
  }, [isGameActive]);
};
