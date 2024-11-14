import styles from './CharacterItem.module.css';
import CharacterIcon from '../CharacterIcon/CharacterIcon';
import { Character } from '../../../types';

interface CharacterItemProps {
  character: Character;
  handleCharacterClick: (character: Character) => void;
}

const CharacterItem = ({
  character,
  handleCharacterClick,
}: CharacterItemProps) => {
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

export default CharacterItem;
