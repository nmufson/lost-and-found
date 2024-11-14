import styles from './CharacterSelect.module.css';
import CharacterItem from '../CharacterItem/CharacterItem';
import { Character } from '../../../types';

interface CharacterSelectProps {
  positionX: number;
  positionY: number;
  characters: Character[];
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
      className={styles.characterSelect}
      style={{
        left: positionX,
        top: positionY,
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
  );
};

export default CharacterSelect;
