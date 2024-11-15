import styles from './StartGameModal.module.css';
import CharacterIcon from '../../CharacterIcon/CharacterIcon';
import { Photo } from '../../../../types';

interface StartGameModalProps {
  photo: Photo;
  handleStartGame: () => void;
}

const StartGameModal = ({ photo, handleStartGame }: StartGameModalProps) => {
  return (
    <>
      <div className="backdrop"></div>
      <div className={`${styles.startGameModal} modal`}>
        <h2>Find the Following Characters</h2>
        <div className={styles.iconContainer}>
          {photo.characters.map((char) => (
            <CharacterIcon key={char.id} character={char} />
          ))}
        </div>
        <p>Start Game to Begin</p>
        <button onClick={handleStartGame}>Start Game</button>
      </div>
    </>
  );
};

export default StartGameModal;
