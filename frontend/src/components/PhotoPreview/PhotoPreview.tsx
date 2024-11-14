import styles from './PhotoPreview.module.css';
import { useNavigate } from 'react-router-dom';
import { Photo } from '../../../types';
const API_URL = import.meta.env.VITE_API_URL;

interface PhotoPreviewProps {
  photo: Photo;
  home: boolean;
  selectedPhoto: Photo | null;
  setSelectedPhoto: ((photo: Photo) => void) | null;
}

const PhotoPreview = ({
  photo,
  home,
  selectedPhoto = null,
  setSelectedPhoto = null,
}: PhotoPreviewProps) => {
  const navigate = useNavigate();

  const imageURL = `${API_URL}${photo.image}`;

  const handleClick = () => {
    if (home) {
      navigate(`/game/${photo.slug}`, { state: { photo } });
    } else if (setSelectedPhoto) {
      setSelectedPhoto(photo);
    }
  };

  const selected = selectedPhoto?.id === photo.id;

  return (
    <div
      className={`${styles.photoPreview} ${selected ? styles.selected : ''}`}
      onClick={handleClick}
    >
      <h2>{photo.name}</h2>
      <img src={imageURL} alt={`Image preview for ${photo.name}`} />
    </div>
  );
};

export default PhotoPreview;
