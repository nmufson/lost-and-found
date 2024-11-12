import styles from './CharacterItem.module.css';
const API_URL = import.meta.env.VITE_API_URL;

const CharacterItem = ({ character, handleCharacterClick }) => {
  const iconURL = `${API_URL}${character.image}`;

  return (
    <div
      className={`${styles.characterItem} ${character.found ? styles.found : ''}`}
      onClick={handleCharacterClick}
    >
      <img src={iconURL} alt={`${character.name} icon`} />
      <p>{character.name}</p>
    </div>
  );
};

export default CharacterItem;
