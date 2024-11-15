import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter, useLocation } from 'react-router-dom';
import Leaderboard from './Leaderboard';
import { fetchPhotos } from '../../services/photoServices';
import '@testing-library/jest-dom';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: vi.fn(),
  };
});

vi.mock('../../services/photoServices', () => ({
  fetchPhotos: vi.fn(),
}));

vi.mock('../../components/Loading/Loading', () => ({
  default: () => <div>Loading...</div>,
}));

vi.mock('../../components/PhotoPreview/PhotoPreview', () => ({
  default: ({ photo, selectedPhoto }) => (
    <div data-testid="photo-preview">
      {photo.name}
      {selectedPhoto?.id === photo.id && ' (Selected)'}
    </div>
  ),
}));

vi.mock('../../components/ScoreItem/ScoreItem', () => ({
  default: ({ score, place }) => (
    <div data-testid="score-item">
      {place}. {score.username} - {score.time}
    </div>
  ),
}));

describe('Leaderboard Component', () => {
  const mockPhotos = [
    {
      id: 1,
      name: 'Photo 1',
      scores: [
        { id: 1, username: 'user1', time: 1000 },
        { id: 2, username: 'user2', time: 2000 },
      ],
    },
    {
      id: 2,
      name: 'Photo 2',
      scores: [
        { id: 3, username: 'user3', time: 1500 },
        { id: 4, username: 'user4', time: 2500 },
      ],
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/leaderboard',
      search: '',
      hash: '',
      state: null,
      key: 'default',
    });
  });

  it('shows loading state initially', () => {
    vi.mocked(fetchPhotos).mockResolvedValue({ photos: [] });

    render(
      <MemoryRouter>
        <Leaderboard />
      </MemoryRouter>,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error message when fetch fails', async () => {
    const errorMessage = 'Failed to fetch photos';
    vi.mocked(fetchPhotos).mockRejectedValue(new Error(errorMessage));

    render(
      <MemoryRouter>
        <Leaderboard />
      </MemoryRouter>,
    );

    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });

  it('renders photos and selects default photo when no location state', async () => {
    vi.mocked(fetchPhotos).mockResolvedValue({ photos: mockPhotos });

    render(
      <MemoryRouter>
        <Leaderboard />
      </MemoryRouter>,
    );

    expect(await screen.findByText('Leaderboard')).toBeInTheDocument();

    expect(screen.getAllByTestId('photo-preview')).toHaveLength(2);

    expect(screen.getByText(/Photo 2 \(Selected\)/)).toBeInTheDocument();

    const scores = screen.getAllByTestId('score-item');
    expect(scores).toHaveLength(2);
    expect(scores[0]).toHaveTextContent('1. user3 - 1500');
  });

  it('selects correct photo when coming from game completion', async () => {
    vi.mocked(fetchPhotos).mockResolvedValue({ photos: mockPhotos });
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/leaderboard',
      search: '',
      hash: '',
      state: { photoId: 1 },
      key: 'default',
    });

    render(
      <MemoryRouter>
        <Leaderboard />
      </MemoryRouter>,
    );

    expect(await screen.findByText(/Photo 1 \(Selected\)/)).toBeInTheDocument();

    const scores = screen.getAllByTestId('score-item');
    expect(scores).toHaveLength(2);
    expect(scores[0]).toHaveTextContent('1. user1 - 1000');
  });

  it('renders table headers correctly', async () => {
    vi.mocked(fetchPhotos).mockResolvedValue({ photos: mockPhotos });

    render(
      <MemoryRouter>
        <Leaderboard />
      </MemoryRouter>,
    );

    expect(await screen.findByText('Place')).toBeInTheDocument();
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByText('Time')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
  });
});
