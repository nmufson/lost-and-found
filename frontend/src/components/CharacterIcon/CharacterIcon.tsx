import styles from './CharacterIcon.module.css';
const API_URL = import.meta.env.VITE_API_URL;
import { Character } from '../../../types';

const CharacterIcon = ({ character }: { character: Character }) => {
  const characterURL = `${API_URL}${character.image}`;

  return (
    <img
      src={characterURL}
      alt={`${character.name} Icon`}
      className={styles.characterIcon}
    />
  );
};

export default CharacterIcon;
