import React from 'react';

export interface Photo {
  id: number;
  image: string;
  name: string;
  scores: Score[];
  characters: Character[];
  slug: string;
}

export interface Score {
  id: number;
  photoId: number;
  time: number;
  username: string;
  date: string;
}

export interface Character {
  id: number;
  image: string;
  name: string;
  photoId: number;
  positionX: number;
  positionY: number;
  found?: boolean;
}

export interface GameInfo {
  isStartGameModalOpen: boolean;
  isRecordTimeModalOpen: boolean;
  isGameActive: boolean;
  time: number;
}

export interface GameContextType {
  gameInfo: GameInfo;
  setGameInfo: React.Dispatch<React.SetStateAction<GameInfo>>;
  characters: Character[] | null;
  setCharacters: React.Dispatch<React.SetStateAction<Character[] | null>>;
  resetGameInfo: () => void;
}
