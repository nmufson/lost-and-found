import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import CharacterSelectItem from './CharacterSelectItem';
import { Character } from '../../../types';
const API_URL = import.meta.env.VITE_API_URL;

const mockCharacter: Character = {
  id: 1,
  name: 'Test Character',
  image: '/images/test-character.png',
  found: false,
  photoId: 123,
  positionX: 0.5,
  positionY: 0.5,
};

const mockHandleCharacterClick = vi.fn();

test('renders the character name and icon correctly', () => {
  render(
    <CharacterSelectItem
      character={mockCharacter}
      handleCharacterClick={mockHandleCharacterClick}
    />,
  );

  expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();

  expect(screen.getByRole('img')).toHaveAttribute(
    'src',
    `${API_URL}${mockCharacter.image}`,
  );
  expect(screen.getByRole('img')).toHaveAttribute(
    'alt',
    `${mockCharacter.name} Icon`,
  );
});

test('calls handleCharacterClick when the item is clicked', () => {
  render(
    <CharacterSelectItem
      character={mockCharacter}
      handleCharacterClick={mockHandleCharacterClick}
    />,
  );

  const characterItem = screen.getByText(mockCharacter.name);

  fireEvent.click(characterItem);

  expect(mockHandleCharacterClick).toHaveBeenCalledWith(mockCharacter);
  expect(mockHandleCharacterClick).toHaveBeenCalledTimes(1);
});
