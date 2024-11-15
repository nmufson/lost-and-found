import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import CharacterSelect from './CharacterSelect';
import { Character } from '../../../types';

const mockCharacters: Character[] = [
  {
    id: 1,
    name: 'Character 1',
    image: '/image1.png',
    found: false,
    photoId: 101,
    positionX: 0.2,
    positionY: 0.3,
  },
  {
    id: 2,
    name: 'Character 2',
    image: '/image2.png',
    found: false,
    photoId: 102,
    positionX: 0.5,
    positionY: 0.6,
  },
];

const mockHandleCharacterClick = vi.fn();

describe('CharacterSelect', () => {
  it('should render the character select component correctly', () => {
    render(
      <CharacterSelect
        positionX={0.5}
        positionY={0.5}
        characters={mockCharacters}
        handleCharacterClick={mockHandleCharacterClick}
      />,
    );

    expect(screen.getByTestId('character-select')).toBeInTheDocument();
    expect(screen.getByText('Character 1')).toBeInTheDocument();
    expect(screen.getByText('Character 2')).toBeInTheDocument();
  });

  it('should pass positionX and positionY as styles to the div', () => {
    render(
      <CharacterSelect
        positionX={0.5}
        positionY={0.5}
        characters={mockCharacters}
        handleCharacterClick={mockHandleCharacterClick}
      />,
    );

    const characterSelectDiv = screen.getByTestId('character-select');
    expect(characterSelectDiv).toHaveStyle({ left: '50%', top: '50%' });
  });

  it('should call handleCharacterClick with the correct character when clicked', () => {
    render(
      <CharacterSelect
        positionX={0.5}
        positionY={0.5}
        characters={mockCharacters}
        handleCharacterClick={mockHandleCharacterClick}
      />,
    );

    fireEvent.click(screen.getByText('Character 1'));
    expect(mockHandleCharacterClick).toHaveBeenCalledWith(mockCharacters[0]);
    expect(mockHandleCharacterClick).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText('Character 2'));
    expect(mockHandleCharacterClick).toHaveBeenCalledWith(mockCharacters[1]);
    expect(mockHandleCharacterClick).toHaveBeenCalledTimes(2);
  });
});
