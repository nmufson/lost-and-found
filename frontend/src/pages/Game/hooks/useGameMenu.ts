import { useState, useEffect, RefObject } from 'react';
import { MenuState } from '../../../../types';

export const useGameMenu = (imageRef: RefObject<HTMLImageElement>) => {
  const [menu, setMenu] = useState<MenuState>({
    isOpen: false,
    initialPosition: null,
    relativePosition: null,
  });

  const getCoordinates = (event: React.MouseEvent<HTMLImageElement>) => {
    if (!imageRef.current) return null;

    const { offsetX, offsetY } = event.nativeEvent;
    const relativeX = offsetX / imageRef.current.width;
    const relativeY = offsetY / imageRef.current.height;

    return { x: relativeX, y: relativeY };
  };

  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const relativePos = getCoordinates(event);
    const clickPosition = { x: event.pageX, y: event.pageY };

    setMenu({
      isOpen: true,
      initialPosition: clickPosition,
      relativePosition: relativePos,
    });
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (menu.isOpen && menu.initialPosition) {
        const { x, y } = menu.initialPosition;
        const boundaryOffset = 400;
        const horizontalBoundary = [x - boundaryOffset, x + boundaryOffset];
        const verticalBoundary = [y - boundaryOffset, y + boundaryOffset];

        if (
          event.pageX < horizontalBoundary[0] ||
          event.pageX > horizontalBoundary[1] ||
          event.pageY < verticalBoundary[0] ||
          event.pageY > verticalBoundary[1]
        ) {
          setMenu((prevMenu) => ({
            ...prevMenu,
            isOpen: false,
          }));
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [menu.relativePosition, menu.isOpen]);

  return { menu, setMenu, handleClick };
};
