import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Notification from './Notification';
import { Character } from '../../../types';

describe('Notification Component', () => {
  const mockCharacter: Character = {
    id: 1,
    name: 'Character 1',
    image: '/image1.png',
    photoId: 101,
    positionX: 0.2,
    positionY: 0.3,
    found: false,
  };

  it('should render success message when success is true', () => {
    render(<Notification success={true} character={mockCharacter} />);
    expect(
      screen.getByText(/success, you found character 1!/i),
    ).toBeInTheDocument();
    expect(screen.getByText('success-icon')).toBeInTheDocument();
  });

  it('should render failure message when success is false', () => {
    render(<Notification success={false} character={null} />);
    expect(screen.getByText(/try again/i)).toBeInTheDocument();
    expect(screen.getByText('alert-icon')).toBeInTheDocument();
  });

  it('should handle null success and character gracefully', () => {
    render(<Notification success={null} character={null} />);
    expect(screen.getByText(/try again/i)).toBeInTheDocument();
    expect(screen.getByText('alert-icon')).toBeInTheDocument();
  });

  it('should handle missing character name gracefully', () => {
    const incompleteCharacter: Partial<Character> = {
      id: 1,
      photoId: 101,
    };

    render(
      <Notification
        success={true}
        character={incompleteCharacter as Character}
      />,
    );
    expect(
      screen.getByText(/success, you found undefined!/i),
    ).toBeInTheDocument();
  });
});
