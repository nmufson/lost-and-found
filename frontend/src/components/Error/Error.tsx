import styles from './Error.module.css';

const Error = ({ error }: { error: string }) => {
  return (
    <div className={styles.error}>
      <p>{error}</p>
    </div>
  );
};
export default Error;
