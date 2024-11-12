import styles from './StartGameModal.module.css';
const API_URL = import.meta.env.VITE_API_URL;

const StartGameModal = ({ photo, handleStartGame }) => {
  return (
    <>
      <div className="backdrop"></div>
      <div className={`${styles.startGameModal} modal`}>
        <h2>Find the Following Characters</h2>
        <div className={styles.iconContainer}>
          {photo.characters.map((char) => {
            const imageURL = `${API_URL}${char.image}`;

            return (
              <img
                key={char.id}
                src={imageURL}
                alt={`${char.name} icon`}
                className={styles.charIcon}
              />
            );
          })}
        </div>
        <p>Press Start to Begin</p>
        <button onClick={handleStartGame}>Start</button>
      </div>
    </>
  );
};

export default StartGameModal;
