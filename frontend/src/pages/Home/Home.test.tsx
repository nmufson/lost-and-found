import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { useOutletContext } from 'react-router-dom';
import Home from './Home';
import '@testing-library/jest-dom';
import { Photo } from '../../../types';

vi.mock('react-router-dom', () => ({
  useOutletContext: vi.fn(),
}));

vi.mock('../../components/Loading/Loading', () => ({
  default: () => <div>Loading...</div>,
}));

vi.mock('../../components/PhotoPreview/PhotoPreview', () => ({
  default: ({ photo }: { photo: Photo }) => (
    <div data-testid="photo-preview">{photo.name}</div>
  ),
}));

describe('Home Component', () => {
  const mockPhotos = [
    { id: 1, name: 'Photo 1' },
    { id: 2, name: 'Photo 2' },
    { id: 3, name: 'Photo 3' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading component when loading is true', () => {
    vi.mocked(useOutletContext).mockReturnValue({
      photos: [],
      loading: true,
    });

    render(<Home />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders title and photo previews when loading is false', () => {
    vi.mocked(useOutletContext).mockReturnValue({
      photos: mockPhotos,
      loading: false,
    });

    render(<Home />);

    expect(screen.getByText('Select a Game to Start!')).toBeInTheDocument();
    expect(screen.getAllByTestId('photo-preview')).toHaveLength(3);
    expect(screen.getByText('Photo 1')).toBeInTheDocument();
    expect(screen.getByText('Photo 2')).toBeInTheDocument();
    expect(screen.getByText('Photo 3')).toBeInTheDocument();
  });

  it('renders empty state when no photos are available', () => {
    vi.mocked(useOutletContext).mockReturnValue({
      photos: [],
      loading: false,
    });

    render(<Home />);

    expect(screen.getByText('Select a Game to Start!')).toBeInTheDocument();
    expect(screen.queryAllByTestId('photo-preview')).toHaveLength(0);
  });
});
