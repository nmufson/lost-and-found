import styles from './Game.module.css';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useRef } from 'react';
import { submitScore } from '../../services/scoreServices';
import CharacterSelect from '../../components/CharacterSelect/CharacterSelect';
import StartGameModal from '../../components/Modals/StartGameModal/StartGameModal';
import RecordTimeModal from '../../components/Modals/RecordTimeModal/RecordTimeModal';
import { useGameContext } from '../../context/gameContext';
import Notification from '../../components/Notification/Notification';
import { useGameMenu } from './hooks/useGameMenu';
import { useGameInitialization } from './hooks/useGameInitialization';
import { useGameCharacter } from './hooks/useGameCharacter';
import { useGameTimer } from './hooks/useGameTimer';

const Game = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams();
  const { gameInfo, setGameInfo, characters, setCharacters } = useGameContext();
  const imageRef = useRef<HTMLImageElement | null>(null);

  const { photo, imageURL } = useGameInitialization({
    locationState: location.state,
    slug,
    setCharacters,
  });

  const { menu, setMenu, handleClick } = useGameMenu(imageRef);

  useGameTimer({
    isGameActive: gameInfo.isGameActive,
    setGameInfo,
  });

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

  const handleSubmitScore = async (username: string | null) => {
    try {
      if (username && photo) {
        const response = await submitScore(gameInfo.time, username, photo.id);
        const newScore = response.newScore;
        console.log(newScore);
        navigate('/leaderboard', { state: { photoId: photo?.id } });
      }
    } catch (error) {
      console.error('Failed to submit score:', error);
    }
  };

  const { notification, handleCharacterClick } = useGameCharacter({
    characters,
    setCharacters,
    menu,
    setMenu,
    onGameComplete: handleStopGame,
  });

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

      <div className={styles.game} onClick={() => console.log(characters)}>
        <img
          src={imageURL || undefined}
          ref={imageRef}
          className={styles.illustration}
          alt={`Game Illustration - ${photo.name}`}
          onClick={handleClick}
        />
        {menu.isOpen && menu.relativePosition && (
          <CharacterSelect
            positionX={menu.relativePosition.x}
            positionY={menu.relativePosition.y}
            characters={characters}
            handleCharacterClick={handleCharacterClick}
          />
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
