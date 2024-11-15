import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';
import { useGameContext } from '../../context/gameContext';

vi.mock('../../context/gameContext', () => ({
  useGameContext: vi.fn(),
}));

const mockGameInfo = {
  time: 1200,
  // deciseconds
};

const mockCharacters = [
  { id: 1, name: 'Character 1', found: true, image: '/images/test1.png' },
  { id: 2, name: 'Character 2', found: false, image: '/images/test2.png' },
];

describe('Header Component', () => {
  it('should render the header correctly on the home page', () => {
    useGameContext.mockReturnValue({ gameInfo: {}, characters: [] });

    render(
      <MemoryRouter initialEntries={['/home']}>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByText('Lost & Found')).toBeInTheDocument();
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
  });

  it('should render the game info and character icons correctly on the game page', () => {
    useGameContext.mockReturnValue({
      gameInfo: mockGameInfo,
      characters: mockCharacters,
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
    useGameContext.mockReturnValue({
      gameInfo: mockGameInfo,
      characters: mockCharacters,
    });

    render(
      <MemoryRouter initialEntries={['/game']}>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.queryByText('Leaderboard')).toBeNull();
  });
});
