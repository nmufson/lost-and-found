import styles from './PhotoPreview.module.css';
import { useNavigate } from 'react-router-dom';
import { Photo } from '../../../types';
const API_URL = import.meta.env.VITE_API_URL;

interface PhotoPreviewProps {
  photo: Photo;
}

const PhotoPreview = ({ photo }: PhotoPreviewProps) => {
  const navigate = useNavigate();

  const imageURL = `${API_URL}${photo.image}`;

  const handleClick = () => {
    navigate(`/game/${photo.slug}`, { state: { photo } });
  };

  return (
    <div className={styles.photoPreview} onClick={handleClick}>
      <h2>{photo.name}</h2>
      <img src={imageURL} alt={`Image preview for ${photo.name}`} />
    </div>
  );
};

export default PhotoPreview;
