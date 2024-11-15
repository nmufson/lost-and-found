import { useGameContext } from '../../context/gameContext';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { useLocation } from 'react-router-dom';
import formatTime from '../../utils/formatTime';
import CharacterIcon from '../CharacterIcon/CharacterIcon';

const Header = () => {
  const { gameInfo, characters } = useGameContext();

  const location = useLocation();
  const currentPath = location.pathname;

  const isGame = currentPath.slice(0, 5) === '/game';

  return (
    <header className={styles.header}>
      <div
        className={`${styles.headerContainer} ${!isGame ? styles.home : ''}`}
      >
        <Link to="/home" className={styles.logo}>
          Lost & Found
        </Link>

        {isGame && (
          <div className={styles.gameInfoContainer}>
            <p className={styles.timer}>{formatTime(gameInfo.time)}</p>
            <div className={styles.charIconContainer}>
              {characters?.map((char) => {
                return (
                  <div
                    key={char.id}
                    className={`${styles.charContainer} ${char.found ? styles.found : ''}`}
                  >
                    <CharacterIcon character={char} />
                    <p>{char.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {!isGame && (
          <Link to="/leaderboard" className={styles.leaderboard}>
            Leaderboard
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
