import styles from './Notification.module.css';
import AlertIcon from '../../../public/AlertIcon';
import SuccessIcon from '../../../public/SuccessIcon';
import { Character } from '../../../types';

interface NotificationProps {
  success: boolean | null;
  character: Character | null;
}

const Notification = ({ success, character }: NotificationProps) => {
  return (
    <div className={`${styles.notification} notification`}>
      {success ? <SuccessIcon /> : <AlertIcon />}
      <p>{success ? `Success, you found ${character?.name}!` : 'Try Again'}</p>
    </div>
  );
};

export default Notification;
