import { useState, useRef } from 'react';
import { Character, NotificationState } from '../types/gameTypes';
import { MenuState } from '../../../../types';

interface UseGameCharacterProps {
  characters: Character[];
  setCharacters: (characters: Character[]) => void;
  menu: MenuState;
  setMenu: (menu: MenuState) => void;
  onGameComplete: () => void;
}

export const useGameCharacter = ({
  characters,
  setCharacters,
  menu,
  setMenu,
  onGameComplete,
}: UseGameCharacterProps) => {
  const [notification, setNotification] = useState<NotificationState>({
    isVisible: false,
    success: null,
    character: null,
  });

  const notificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCharacterClick = (character: Character) => {
    if (character.found || !menu.relativePosition) return;

    const selectedX = menu.relativePosition.x;
    const selectedY = menu.relativePosition.y;
    const margin = 0.03;
    const isCorrectLocation =
      character.positionX - margin < selectedX &&
      selectedX < character.positionX + margin &&
      character.positionY - margin < selectedY &&
      selectedY < character.positionY + margin;

    if (isCorrectLocation) {
      setNotification({ isVisible: true, success: true, character });
      const newCharacters = characters.map((char) =>
        char.id === character.id ? { ...char, found: true } : char,
      );
      setCharacters(newCharacters);

      if (newCharacters.every((char) => char.found)) {
        onGameComplete();
      }
    } else {
      setNotification({ isVisible: true, success: false, character: null });
    }

    setMenu({
      isOpen: false,
      initialPosition: null,
      relativePosition: null,
    });

    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }

    notificationTimeoutRef.current = setTimeout(() => {
      setNotification({ isVisible: false, success: null, character: null });
      notificationTimeoutRef.current = null;
    }, 2000);
  };

  return { notification, handleCharacterClick };
};
