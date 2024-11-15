import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom';
import Game from './Game';
import { GameProvider } from '../../context/gameContext';
import { useGameInitialization } from './hooks/useGameInitialization';
import { useGameMenu } from './hooks/useGameMenu';
import { useGameCharacter } from './hooks/useGameCharacter';

vi.mock('./hooks/useGameInitialization', () => ({
  useGameInitialization: vi.fn(),
}));

vi.mock('./hooks/useGameMenu', () => ({
  useGameMenu: vi.fn(),
}));

vi.mock('./hooks/useGameCharacter', () => ({
  useGameCharacter: vi.fn(),
}));

vi.mock('../../services/scoreServices', () => ({
  submitScore: vi.fn(),
}));

describe('Game Component', () => {
  beforeEach(() => {
    vi.mocked(useGameInitialization).mockReturnValue({
      photo: {
        id: 1,
        name: 'Test Photo',
        image: '/test.jpg',
        characters: [
          {
            id: 1,
            name: 'Character 1',
            positionX: 0.5,
            image: 'image1.jpg',
            photoId: 11,
            positionY: 0.5,
            found: false,
          },
        ],
      },
      imageURL: 'http://test.com/test.jpg',
    });

    vi.mocked(useGameMenu).mockReturnValue({
      menu: {
        isOpen: false,
        relativePosition: null,
      },
      setMenu: vi.fn(),
      handleClick: vi.fn(),
    });

    vi.mocked(useGameCharacter).mockReturnValue({
      notification: {
        isVisible: false,
        success: null,
        character: null,
      },
      handleCharacterClick: vi.fn(),
    });
  });

  const renderWithProviders = (initialPath = '/game/test-slug') => {
    return render(
      <MemoryRouter initialEntries={[initialPath]}>
        <GameProvider>
          <Routes>
            <Route path="/game/:slug" element={<Game />} />
          </Routes>
        </GameProvider>
      </MemoryRouter>,
    );
  };

  it('renders game image when photo is loaded', () => {
    renderWithProviders();
    const gameImage = screen.getByAltText('Game Illustration - Test Photo');
    expect(gameImage).toBeInTheDocument();
  });

  it('shows start game modal by default', () => {
    renderWithProviders();

    expect(screen.getByText(/start game to begin/i)).toBeInTheDocument();
  });

  it('starts game when start button is clicked', async () => {
    renderWithProviders();
    const startButton = screen.getByRole('button', { name: /start game/i });

    await fireEvent.click(startButton);

    waitForElementToBeRemoved(() => screen.queryByText(/start game to begin/i));
  });

  it('updates game timer when game is active', () => {
    const { rerender } = renderWithProviders();

    const startButton = screen.getByRole('button', { name: /start game/i });
    fireEvent.click(startButton);

    vi.useFakeTimers();
    vi.advanceTimersByTime(1000);

    vi.useRealTimers();
  });
});
