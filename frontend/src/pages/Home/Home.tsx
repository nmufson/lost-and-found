import styles from './Home.module.css';
import PhotoPreview from '../../components/PhotoPreview/PhotoPreview';
import { useOutletContext } from 'react-router-dom';
import { Photo } from '../../../types';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';

interface OutletContext {
  photos: Photo[];
  loading: boolean;
  error: string | null;
}

const Home = () => {
  const { photos, loading, error } = useOutletContext<OutletContext>();

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  return (
    <div className={styles.home}>
      <h1>Select a Game to Start!</h1>
      <div className={styles.previewContainer}>
        {photos?.map((photo) => (
          <PhotoPreview
            key={photo.id}
            photo={photo}
            home={true}
            selectedPhoto={null}
            setSelectedPhoto={null}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
