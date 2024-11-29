import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';
import { MockedFunction } from 'vitest';
import { useGameContext } from '../../context/gameContext';

vi.mock('../../context/gameContext', () => ({
  useGameContext: vi.fn(),
}));

const mockGameInfo = {
  isStartGameModalOpen: false,
  isRecordTimeModalOpen: false,
  isGameActive: true,
  time: 1200,
};

const mockCharacters = [
  {
    id: 1,
    name: 'Character 1',
    found: true,
    image: '/images/test1.png',
    photoId: 101,
    positionX: 250,
    positionY: 150,
  },
  {
    id: 2,
    name: 'Character 2',
    found: false,
    image: '/images/test2.png',
    photoId: 102,
    positionX: 450,
    positionY: 300,
  },
];

describe('Header Component', () => {
  it('should render the header correctly on the home page', () => {
    (useGameContext as MockedFunction<typeof useGameContext>).mockReturnValue({
      gameInfo: {
        isStartGameModalOpen: false,
        isRecordTimeModalOpen: false,
        isGameActive: false,
        time: 0,
      },
      characters: null,
      setGameInfo: vi.fn(),
      setCharacters: vi.fn(),
      resetGameInfo: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/home']}>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByText('Lost & Found')).toBeInTheDocument();
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
  });

  it('should render the game info and character icons correctly on the game page', () => {
    (useGameContext as MockedFunction<typeof useGameContext>).mockReturnValue({
      gameInfo: mockGameInfo,
      characters: mockCharacters,
      setGameInfo: vi.fn(),
      setCharacters: vi.fn(),
      resetGameInfo: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/game']}>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByText('02:00.0')).toBeInTheDocument();

    expect(screen.getByText('Character 1')).toBeInTheDocument();
    expect(screen.getByText('Character 2')).toBeInTheDocument();
    expect(screen.getByAltText('Character 1 Icon')).toBeInTheDocument();
    expect(screen.getByAltText('Character 2 Icon')).toBeInTheDocument();
  });

  it('should not render leaderboard link on the game page', () => {
    (useGameContext as MockedFunction<typeof useGameContext>).mockReturnValue({
      gameInfo: mockGameInfo,
      characters: mockCharacters,
      setGameInfo: vi.fn(),
      setCharacters: vi.fn(),
      resetGameInfo: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/game']}>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.queryByText('Leaderboard')).toBeNull();
  });
});
