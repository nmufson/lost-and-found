import { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { fetchPhotoPreviews } from '../../services/photoServices';
import PhotoPreview from '../../components/PhotoPreview/PhotoPreview';
import { Photo } from '../../../types';

const Home = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const data = await fetchPhotoPreviews();
        setPhotos(data.photos);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        // setLoading(false);
      }
    };
    loadPhotos();
  }, []);
  if (error) {
    return error;
  }

  return (
    <div className={styles.home}>
      <div className={styles.previewContainer}>
        {photos.map((photo) => (
          <PhotoPreview key={photo.id} photo={photo} />
        ))}
      </div>
    </div>
  );
};

export default Home;
