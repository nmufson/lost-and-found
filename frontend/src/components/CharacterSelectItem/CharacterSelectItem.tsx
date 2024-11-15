import styles from './CharacterSelectItem.module.css';
import CharacterIcon from '../CharacterIcon/CharacterIcon';
import { Character } from '../../../types';

interface CharacterSelectItemProps {
  character: Character;
  handleCharacterClick: (character: Character) => void;
}

const CharacterSelectItem = ({
  character,
  handleCharacterClick,
}: CharacterSelectItemProps) => {
  return (
    <div
      className={`${styles.characterItem} ${character.found ? styles.found : ''}`}
      onClick={() => handleCharacterClick(character)}
    >
      <CharacterIcon character={character} />
      <p>{character.name}</p>
    </div>
  );
};

export default CharacterSelectItem;
