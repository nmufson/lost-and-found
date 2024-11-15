import styles from './Leaderboard.module.css';
import { useEffect, useState } from 'react';
import { Photo } from '../../../types';
import PhotoPreview from '../../components/PhotoPreview/PhotoPreview';
import ScoreItem from '../../components/ScoreItem/ScoreItem';
import { useLocation } from 'react-router-dom';
import { fetchPhotos } from '../../services/photoServices';
import Loading from '../../components/Loading/Loading';

const Leaderboard = () => {
  const location = useLocation();
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // fetch so we always have updated scores
  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const data = await fetchPhotos();
        setPhotos(data.photos);
        // location state comes from game page after user submits score
        if (location.state?.photoId) {
          const photo = data.photos.find(
            (photo: Photo) => photo.id === location.state?.photoId,
          );
          setSelectedPhoto(photo);
        } else if (!selectedPhoto) {
          setSelectedPhoto(data.photos[1]);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    loadPhotos();
  }, []);

  if (error) {
    return error;
  }

  if (loading) return <Loading />;

  return (
    <div className={styles.leaderboard}>
      <h1>Leaderboard</h1>
      <div className={styles.previewContainer}>
        {photos?.map((photo) => (
          <PhotoPreview
            key={photo.id}
            photo={photo}
            home={false}
            selectedPhoto={selectedPhoto}
            setSelectedPhoto={setSelectedPhoto}
          />
        ))}
      </div>
      <div className={styles.tableContainer}>
        <h2>{selectedPhoto?.name}</h2>
        <div className={styles.scoreTable}>
          <div className={styles.tableHeader}>
            <p>Place</p>
            <p>Username</p>
            <p>Time</p>
            <p>Date</p>
          </div>
          <div className={styles.scoreContainer}>
            {selectedPhoto?.scores.map((score, index) => (
              <ScoreItem key={score.id} score={score} place={index + 1} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
