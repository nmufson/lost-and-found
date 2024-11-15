import { useState, useEffect } from 'react';
import { Photo, Character } from '../../../../types';
import { fetchPhotoBySlug } from '../../../services/photoServices';
const API_URL = import.meta.env.VITE_API_URL;

interface GameInitProps {
  locationState: any;
  slug: string | undefined;
  setCharacters: (characters: Character[]) => void;
}

export const useGameInitialization = ({
  locationState,
  slug,
  setCharacters,
}: GameInitProps) => {
  // location state comes from home page after user selects photo to play
  const [photo, setPhoto] = useState<Photo | null>(
    locationState?.photo || null,
  );
  const [imageURL, setImageURL] = useState<string | null>(
    `${API_URL}${photo?.image}`,
  );

  useEffect(() => {
    const initializeCharacters = (photoData: Photo) => {
      setCharacters(
        photoData.characters.map((character: Character) => ({
          ...character,
          found: false,
        })),
      );
    };

    if (locationState?.photo) {
      setPhoto(locationState.photo);
      setImageURL(`${API_URL}${locationState.photo.image}`);
      initializeCharacters(locationState.photo);
    } else {
      const getGame = async () => {
        try {
          if (slug) {
            const data = await fetchPhotoBySlug(slug);
            setPhoto(data.photo);
            setImageURL(`${API_URL}${data.photo.image}`);
            initializeCharacters(data.photo);
          }
        } catch (error) {
          console.error('Error fetching photo:', error);
        }
      };

      getGame();
    }
  }, [slug, locationState, setCharacters]);

  return { photo, imageURL };
};
