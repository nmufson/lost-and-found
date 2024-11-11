const API_URL = import.meta.env.VITE_API_URL;

export const fetchPhotoPreviews = async () => {
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
