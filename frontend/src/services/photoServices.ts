const API_URL = import.meta.env.VITE_API_URL;

export const fetchPhotos = async () => {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch photo previews');
  }
  return await response.json();
};

export const fetchPhotoBySlug = async (slug: string) => {
  const response = await fetch(`${API_URL}/photo/slug/${slug}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch photo');
  }
  return await response.json();
};
