import { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { fetchPhotoPreviews } from '../../services/photoServices';
import PhotoPreview from '../../components/PhotoPreview/PhotoPreview';

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const data = await fetchPhotoPreviews();
        setPhotos(data.photos);
        console.log(data);
      } catch (error) {
        setError(error.message || 'Failed to load photos');
      } finally {
        // setLoading(false);
      }
    };
    loadPhotos();
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.previewContainer}>
        {photos.map((photo) => (
          <PhotoPreview
            key={photo.id}
            name={photo.name}
            image={photo.image}
            id={photo.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
