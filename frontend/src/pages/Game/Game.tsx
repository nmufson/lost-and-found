import styles from './Game.module.css';
import videoGame from '../../assets/video-game.jpg';
import space from '../../assets/space.jpg';
import town from '../../assets/town.jpg';
import finnIcon from '../../assets/finn-icon.png';
import { useState, useEffect, useCallback, useRef } from 'react';
import CharacterItem from '../../components/CharacterItem/CharacterItem';

const Game = () => {
  const imageRef = useRef(null);
  const [menu, setMenu] = useState({
    isOpen: false,
    position: null,
    initialPosition: null,
  });

  const boundaryOffset = 500;

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
    });
  };

  const handleMouseMove = (event) => {
    if (menu.isOpen && menu.initialPosition) {
      const { x, y } = menu.initialPosition;

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

  return (
    <div className={styles.game}>
      <img
        // src={videoGame}
        src={space}
        // src={town}
        ref={imageRef}
        className={styles.illustration}
        alt="Game Illustration"
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
          {data.map((char, index) => (
            <CharacterItem key={index} name={char.name} icon={char.image} />
          ))}
        </div>
      )}
    </div>
  );
};

const data = [
  { name: 'finn', image: finnIcon },
  { name: 'finn', image: finnIcon },
  { name: 'finn', image: finnIcon },
];

export default Game;
