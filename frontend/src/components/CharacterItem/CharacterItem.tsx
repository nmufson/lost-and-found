import styles from './CharacterItem.module.css';

const CharacterItem = ({ name, icon }) => {
  return (
    <div className={styles.characterItem}>
      <img src={icon} alt={name} />
      <p>{name}</p>
    </div>
  );
};

export default CharacterItem;
