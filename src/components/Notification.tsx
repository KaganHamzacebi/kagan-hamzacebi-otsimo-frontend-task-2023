import styles from '../styles/components/Notification.module.scss';
import { useAppSelector } from '../app/hooks';
import { getNotification } from '../features/NotificationControllerSlice';

// Icons
import { BiErrorAlt } from 'react-icons/bi';

/**
 * Notification Component
 */

function Notification() {
  const { active, text, type } = useAppSelector(getNotification);

  return (
    <>
      <div className={`${styles.main} ${active && styles.active}`}>
        {
          type === 'Error' && <BiErrorAlt className={styles.errorIcon} />
        }
        <span className={styles.notificationText}>{text}</span>
      </div>
    </>
  );
}

export default Notification;