import React, { createContext, useState, useContext } from 'react';
import { GameInfo, GameContextType, Character } from '../../types';

const GameContext = createContext<GameContextType | null>(null);

const initialGameInfo = {
  isStartGameModalOpen: true,
  isRecordTimeModalOpen: false,
  isGameActive: false,
  time: 0,
};

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [gameInfo, setGameInfo] = useState<GameInfo>(initialGameInfo);
  const [characters, setCharacters] = useState<Character[] | null>(null);

  const resetGameInfo = () => setGameInfo(initialGameInfo);

  return (
    <GameContext.Provider
      value={{
        gameInfo,
        setGameInfo,
        characters,
        setCharacters,
        resetGameInfo,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within GameProvider');
  }
  return context;
};
