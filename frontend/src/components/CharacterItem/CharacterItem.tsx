import styles from './CharacterItem.module.css';
const API_URL = import.meta.env.VITE_API_URL;

const CharacterItem = ({ character, handleCharacterClick }) => {
  const iconURL = `${API_URL}${character.image}`;

  return (
    <div className={styles.characterItem} onClick={handleCharacterClick}>
      <img src={iconURL} alt={character.name} />
      <p>{character.name}</p>
    </div>
  );
};

export default CharacterItem;
