import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <p>
          Nick Mufson |{' '}
          <a href="mailto:nickmufson1@gmail.com" target="_blank">
            Email
          </a>{' '}
          |{' '}
          <a
            href="https://www.linkedin.com/in/nicholasmufson/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
            LinkedIn
          </a>{' '}
          |{' '}
          <a
            href="https://github.com/nmufson"
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
            GitHub
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
