import styles from './RecordTimeModal.module.css';
import { useState } from 'react';
import formatTime from '../../../utils/formatTime';
import { validateUsername, FeedbackProps } from './validateUsername';

interface RecordTimeModalProps {
  handleSubmitScore: () => void;
  time: number;
}

const RecordTimeModal = ({ handleSubmitScore, time }: RecordTimeModalProps) => {
  const [username, setUserName] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<FeedbackProps>({
    message: null,
    isValid: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
    setFeedback(validateUsername(e.target.value));
    console.log(feedback.isValid);
  };
  console.log(time);

  return (
    <>
      <div className="backdrop"></div>
      <div className={`${styles.recordTimeModal} modal`}>
        <h2>You Found Everyone!</h2>
        <div className={styles.timeDiv}>
          <p>Recorded Time: </p>{' '}
          <p className={styles.formattedTime}>{formatTime(time)}</p>
        </div>

        <p>Enter username to save your score to the leaderboards:</p>
        <div className={styles.inputDiv}>
          <input
            className={styles.usernameInput}
            type="text"
            id="username"
            name="username"
            placeholder="username"
            maxLength={20}
            onChange={handleChange}
            value={username}
          ></input>
          <p className={styles.feedback}>{feedback.message}</p>
        </div>
        <button
          onClick={() => handleSubmitScore(username)}
          disabled={!feedback.isValid}
          className={!feedback.isValid ? styles.disabled : ''}
        >
          Submit Score
        </button>
      </div>
    </>
  );
};

export default RecordTimeModal;
