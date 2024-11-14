import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import { Photo } from '../../../types';
import { fetchPhotos } from '../../services/photoServices';
import { useGameContext } from '../../context/gameContext';

const Layout = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { resetGameInfo } = useGameContext();

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.slice(0, 5) !== '/game') {
      resetGameInfo();
    }
  }, [location, resetGameInfo]);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const data = await fetchPhotos();
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
    <>
      <Header />
      <Main>
        <Outlet context={photos} />
      </Main>
      <Footer />
    </>
  );
};

export default Layout;
