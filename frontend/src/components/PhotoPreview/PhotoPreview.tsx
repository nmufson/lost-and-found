import styles from './PhotoPreview.module.css';
const API_URL = import.meta.env.VITE_API_URL;

const PhotoPreview = ({ image, name, photoId }) => {
  const imageURL = `${API_URL}${image}`;

  return (
    <div className={styles.photoPreview}>
      <h2>{name}</h2>
      <img src={imageURL} alt="" />
    </div>
  );
};

export default PhotoPreview;
