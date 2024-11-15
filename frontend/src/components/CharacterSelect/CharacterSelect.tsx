import styles from './CharacterSelect.module.css';
import CharacterSelectItem from '../CharacterSelectItem/CharacterSelectItem';
import { Character } from '../../../types';

interface CharacterSelectProps {
  positionX: number;
  positionY: number;
  characters: Character[] | null;
  handleCharacterClick: (character: Character) => void;
}

const CharacterSelect = ({
  positionX,
  positionY,
  characters,
  handleCharacterClick,
}: CharacterSelectProps) => {
  return (
    <div
      data-testid="character-select"
      className={styles.characterSelect}
      style={{
        left: `${positionX * 100}%`,
        top: `${positionY * 100}%`,
      }}
    >
      {characters?.map((char) => (
        <CharacterSelectItem
          key={char.id}
          character={char}
          handleCharacterClick={() => handleCharacterClick(char)}
        />
      ))}
    </div>
  );
};

export default CharacterSelect;
