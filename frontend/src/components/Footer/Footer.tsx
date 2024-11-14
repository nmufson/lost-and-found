import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <p>
          Nick Mufson | <a href="mailto:nickmufson1@gmail.com">Email</a> |{' '}
          <a href="https://www.linkedin.com/in/nicholasmufson/">LinkedIn</a> |{' '}
          <a href="https://github.com/nmufson">GitHub</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
