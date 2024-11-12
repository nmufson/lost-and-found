import styles from './Game.module.css';
import { useLocation, useParams } from 'react-router-dom';
import { useState, useEffect, useRef, isValidElement } from 'react';
import CharacterItem from '../../components/CharacterItem/CharacterItem';
import Notification from '../../components/Notification/Notification';
const API_URL = import.meta.env.VITE_API_URL;
import { Photo, Character } from '../../../types';
import { fetchPhotoBySlug } from '../../services/photoServices';
import formatTime from '../../utils/formatTime';
import StartGameModal from '../../components/Modals/StartGameModal/StartGameModal';
import RecordTimeModal from '../../components/Modals/RecordTimeModal/RecordTimeModal';

const Game = () => {
  const location = useLocation();
  const [photo, setPhoto] = useState<Photo | null>(
    location.state?.photo || null,
  );
  const [imageURL, setImageURL] = useState<string | null>(
    `${API_URL}${photo?.image}` || null,
  );
  const [characters, setCharacters] = useState<Character[] | null>(
    photo?.characters.map((character: Character) => ({
      ...character,
      found: false,
    })) || null,
  );
  const [gameInfo, setGameInfo] = useState({
    isStartGameModalOpen: true,
    isRecordTimeModalOpen: false,
    isGameActive: false,
    time: 0,
  });
  const { slug } = useParams();

  useEffect(() => {
    if (!location.state) {
      const getGame = async () => {
        try {
          console.log(slug);
          const data = await fetchPhotoBySlug(slug);
          setPhoto(data.photo);
          setImageURL(`${API_URL}${data.photo.image}`);
          setCharacters(
            data.photo.characters.map((character: Character) => ({
              ...character,
              found: false,
            })),
          );
        } catch (error) {
          console.error('Error fetching photo:', error);
        } finally {
          // setLoading(false);
        }
      };

      getGame();
    }
  }, [slug, location.state]);

  const imageRef = useRef(null);

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
      const newCharacters = characters.map((char) =>
        char.id === character.id ? { ...char, found: true } : char,
      );
      setCharacters(newCharacters);

      const allFound = newCharacters.every((char) => char.found === true);
      if (allFound) {
        handleStopGame();
      }
    } else {
      setNotification({ isVisible: true, success: false, character: null });
    }

    setMenu({
      isOpen: false,
      position: null,
      initialPosition: null,
      relativePosition: null,
    });
    setTimeout(() => {
      setNotification({ isVisible: false, success: null, character: null });
    }, 2000);
  };

  useEffect(() => {
    if (gameInfo.isGameActive) {
      const timer = setInterval(() => {
        setGameInfo((prevGameInfo) => ({
          ...prevGameInfo,
          time: prevGameInfo.time + 1,
        }));
      }, 100);

      // clear timer on unmount
      return () => clearInterval(timer);
    }
  }, [gameInfo.isGameActive]);

  const handleStartGame = () => {
    setGameInfo((prevGameInfo) => ({
      ...prevGameInfo,
      isStartGameModalOpen: false,
      isGameActive: true,
    }));
  };

  const handleStopGame = () => {
    setGameInfo((prevGameInfo) => ({
      ...prevGameInfo,
      isGameActive: false,
      isRecordTimeModalOpen: true,
    }));
  };

  const handleSubmitScore = async (username) => {
    try {
      // store the time in deciseconds and format later
      const response = await newScore(gameInfo.time, username, photo.id);
      const newScore = response.newScore;
    } catch (error) {
      console.error('Failed to submit score:', error);
    }
  };

  // useEffect(() => {
  //   return () => {
  //     clearTimeout();
  //   };
  // }, []);

  if (!photo) return <div>loading...</div>;

  return (
    <>
      {gameInfo.isRecordTimeModalOpen && (
        <RecordTimeModal
          handleSubmitScore={handleSubmitScore}
          time={gameInfo.time}
        />
      )}
      {gameInfo.isStartGameModalOpen && (
        <StartGameModal
          photo={photo}
          handleStartGame={handleStartGame}
        ></StartGameModal>
      )}
      <div className={styles.timerDiv}>
        <p>{formatTime(gameInfo.time)}</p>
      </div>
      <div className={styles.game} onClick={() => console.log(characters)}>
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
    </>
  );
};

export default Game;
