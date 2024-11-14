const API_URL = import.meta.env.VITE_API_URL;

export const submitScore = async (
  time: number,
  username: string,
  photoId: number,
) => {
  try {
    console.log(time, username, photoId);
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
      const errorMessage = `Failed to submit score: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }
    return await response.json();
  } catch (error) {
    console.error('Error submitting score:', error);
    throw error;
  }
};
