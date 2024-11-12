import * as photoServices from '../services/photoServices';

export async function getHomePage(req: Request, res: Response) {
  try {
    const photos = await photoServices.getPhotos();

    const data = {
      title: 'Home Page',
      message: 'Welcome to the Home Page!',
      photos,
    };

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load home page data.' });
  }
}
