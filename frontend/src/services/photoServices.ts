const API_URL = import.meta.env.VITE_API_URL;

export const fetchPhotos = async () => {
  try {
    const response = await fetch(`${API_URL}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch photo previews');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching photo previews:', error);
    throw error;
  }
};

export const fetchPhotoBySlug = async (slug: string) => {
  try {
    const response = await fetch(`${API_URL}/photo/slug/${slug}`);
    if (!response.ok) {
      throw new Error('Failed to fetch photo');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching photo:', error);
    throw error;
  }
};
