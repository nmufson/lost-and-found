import styles from './Home.module.css';
import PhotoPreview from '../../components/PhotoPreview/PhotoPreview';
import { useOutletContext } from 'react-router-dom';
import { Photo } from '../../../types';

const Home = () => {
  const photos = useOutletContext<Photo[]>();

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
