import styles from './ScoreItem.module.css';
import formatDate from '../../utils/formateDate';
import formatTime from '../../utils/formatTime';
import { Score } from '../../../types';

interface ScoreItemProps {
  score: Score;
  place: number;
}

const ScoreItem = ({ score, place }: ScoreItemProps) => {
  const formattedDate = formatDate(score.date);
  const formattedTime = formatTime(score.time);

  return (
    <div className={styles.scoreItem}>
      <p className={styles.place}>{place}</p>
      <p>{score.username}</p>
      <p className={styles.time}>{formattedTime}</p>
      <p>{formattedDate}</p>
    </div>
  );
};

export default ScoreItem;
