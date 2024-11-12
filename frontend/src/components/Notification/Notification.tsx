import styles from './Notification.module.css';
import AlertIcon from '../../../public/AlertIcon';
import SuccessIcon from '../../../public/SuccessIcon';

const Notification = ({ success, character }) => {
  return (
    <div className={styles.notification}>
      {success ? <SuccessIcon /> : <AlertIcon />}
      <p>{success ? `Success, you found ${character.name}` : 'Try Again!'}</p>
    </div>
  );
};

export default Notification;
