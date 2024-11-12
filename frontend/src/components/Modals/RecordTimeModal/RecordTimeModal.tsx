import styles from './RecordTimeModal.module.css';
import { useState } from 'react';
import formatTime from '../../../utils/formatTime';

interface RecordTimeModalProps {
  handleSubmitScore: () => void;
  time: number;
}

const RecordTimeModal = ({ handleSubmitScore, time }) => {
  const [username, setUserName] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  console.log(time);
  return (
    <>
      <div className="backdrop"></div>
      <div className={`${styles.RecordTimeModal} modal`}>
        <h2>You Found Everyone!</h2>
        <p>
          Recorded Time: {formatTime(time)} {time}
        </p>
        <p>Enter username to save your score to the leaderboards:</p>
        <label htmlFor="username"></label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="username"
          maxLength={20}
          onChange={handleChange}
          value={username}
        ></input>
        <button onClick={() => handleSubmitScore(username)}>
          Submit Score
        </button>
      </div>
    </>
  );
};

export default RecordTimeModal;
