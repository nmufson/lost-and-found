const API_URL = import.meta.env.VITE_API_URL;

export const submitScore = async (
  time: number,
  username: string,
  photoId: number,
) => {
  const response = await fetch(`${API_URL}/photo/${photoId}/score`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      time,
      username,
      photoId,
    }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to submit score');
  }
  return await response.json();
};
