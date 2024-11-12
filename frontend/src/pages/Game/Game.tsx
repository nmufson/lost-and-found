import styles from './Game.module.css';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useRef, isValidElement } from 'react';
import CharacterItem from '../../components/CharacterItem/CharacterItem';
import Notification from '../../components/Notification/Notification';
const API_URL = import.meta.env.VITE_API_URL;
import { Photo, Character } from '../../../types';

const Game = () => {
  const location = useLocation();
  const photo = location.state?.photo;

  const imageURL = `${API_URL}${photo.image}`;

  const imageRef = useRef(null);
  const [characters, setCharacters] = useState(
    photo.characters.map((character: Character) => ({
      ...character,
      found: false,
    })),
  );

  const [notification, setNotification] = useState({
    isVisible: false,
    success: null,
    character: null,
  });

  const [menu, setMenu] = useState({
    isOpen: false,
    position: null,
    initialPosition: null,
    relativePosition: null,
  });

  const getCoordinates = (pageX, pageY) => {
    if (!imageRef.current) return null;

    const rect = imageRef.current.getBoundingClientRect();

    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    const relativeX = (pageX - rect.left - scrollLeft) / rect.width;
    const relativeY = (pageY - rect.top - scrollTop) / rect.height;

    return { x: relativeX, y: relativeY };
  };

  const handleClick = (event) => {
    const relativePos = getCoordinates(event.pageX, event.pageY);
    console.log('Relative position:', relativePos);

    const clickPosition = { x: event.pageX, y: event.pageY };
    setMenu({
      isOpen: true,
      position: clickPosition,
      initialPosition: clickPosition,
      relativePosition: relativePos,
    });
  };

  const handleMouseMove = (event) => {
    if (menu.isOpen && menu.initialPosition) {
      const { x, y } = menu.initialPosition;

      const boundaryOffset = 500;

      const horizontalBoundary = [x - boundaryOffset, x + boundaryOffset];
      const verticalBoundary = [y - boundaryOffset, y + boundaryOffset];

      if (
        event.pageX < horizontalBoundary[0] ||
        event.pageX > horizontalBoundary[1] ||
        event.pageY < verticalBoundary[0] ||
        event.pageY > verticalBoundary[1]
      ) {
        setMenu((prevMenu) => ({
          ...prevMenu,
          isOpen: false,
        }));
      }
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup to remove listener
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [menu.initialPosition]);

  const handleCharacterClick = (character) => {
    const selectedX = menu.relativePosition.x;
    const selectedY = menu.relativePosition.y;

    const margin = 0.03;

    if (
      character.positionX - margin < selectedX &&
      selectedX < character.positionX + margin &&
      character.positionY - margin < selectedY &&
      selectedY < character.positionY + margin
    ) {
      setNotification({ isVisible: true, success: true, character });
      console.log('success!');
    } else {
      setNotification({ isVisible: true, success: false, character: null });
    }

    setTimeout(() => {
      setNotification({ isVisible: false, success: null, character: null });
      console.log('here');
    }, 2000);
  };

  // useEffect(() => {
  //   return () => {
  //     clearTimeout();
  //   };
  // }, []);

  return (
    <div className={styles.game}>
      <img
        src={imageURL}
        ref={imageRef}
        className={styles.illustration}
        alt={`Game Illustration - ${photo.name}`}
        onClick={handleClick}
      />
      {menu.isOpen && menu.position && (
        <div
          className={styles.menu}
          style={{
            left: menu.position.x,
            top: menu.position.y,
          }}
        >
          {characters.map((char) => (
            <CharacterItem
              key={char.id}
              character={char}
              handleCharacterClick={() => handleCharacterClick(char)}
            />
          ))}
        </div>
      )}
      {notification.isVisible && (
        <Notification
          success={notification.success}
          character={notification.character}
        />
      )}
    </div>
  );
};

export default Game;
