import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import PhotoPreview from './PhotoPreview';
import { Photo } from '../../../types';

const mockPhoto: Photo = {
  id: 1,
  image: '/path/to/image.jpg',
  name: 'Test Photo',
  scores: [],
  characters: [],
  slug: 'test-photo',
};

const mockSetSelectedPhoto = vi.fn();
const API_URL = import.meta.env.VITE_API_URL;

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('PhotoPreview Component', () => {
  it('should render the photo preview correctly', () => {
    render(
      <Router>
        <PhotoPreview
          photo={mockPhoto}
          home={true}
          selectedPhoto={null}
          setSelectedPhoto={null}
        />
      </Router>,
    );

    expect(screen.getByText('Test Photo')).toBeInTheDocument();
    expect(
      screen.getByAltText('Image preview for Test Photo'),
    ).toBeInTheDocument();
    expect(screen.getByAltText('Image preview for Test Photo')).toHaveAttribute(
      'src',
      `${API_URL}/path/to/image.jpg`,
    );
  });

  it('should navigate to the correct game page when clicked in home view', () => {
    const mockNavigate = vi.fn();
    (useNavigate as vi.Mock).mockReturnValue(mockNavigate);

    render(
      <Router>
        <PhotoPreview
          photo={mockPhoto}
          home={true}
          selectedPhoto={null}
          setSelectedPhoto={null}
        />
      </Router>,
    );

    fireEvent.click(screen.getByText('Test Photo'));

    expect(mockNavigate).toHaveBeenCalledWith(`/game/test-photo`, {
      state: { photo: mockPhoto },
    });
  });

  it('should call setSelectedPhoto when clicked in non-home view', () => {
    render(
      <Router>
        <PhotoPreview
          photo={mockPhoto}
          home={false}
          selectedPhoto={null}
          setSelectedPhoto={mockSetSelectedPhoto}
        />
      </Router>,
    );

    fireEvent.click(screen.getByText('Test Photo'));

    expect(mockSetSelectedPhoto).toHaveBeenCalledWith(mockPhoto);
  });

  it('should not apply selected styles when the photo is not selected', () => {
    render(
      <Router>
        <PhotoPreview
          photo={mockPhoto}
          home={false}
          selectedPhoto={null}
          setSelectedPhoto={mockSetSelectedPhoto}
        />
      </Router>,
    );

    const photoPreviewElement = screen.getByText('Test Photo').closest('div');
    expect(photoPreviewElement).not.toHaveClass('selected');
  });
});
