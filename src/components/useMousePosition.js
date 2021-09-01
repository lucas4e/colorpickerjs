import { useEffect, useState } from 'react';

export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mousePressed, setMousePressed] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.type === 'mousedown') {
        setMousePressed(true);
        console.log('Mouse pressed');
      } else {
        console.log('Mouse released');
        setMousePressed(false);
      }
    };
    window.addEventListener('mouseup', handleKeyPress);
    window.addEventListener('mousedown', handleKeyPress);
    return () => {
      window.removeEventListener('mousedown', handleKeyPress);
      window.removeEventListener('mouseup', handleKeyPress);
    };
  }, []);

  useEffect(() => {
    const setFromEvent = (e) => {
      if (mousePressed === true) {
        setPosition({ x: e.clientX, y: e.clientY });
      }
    };
    window.addEventListener('mousemove', setFromEvent);
    return () => {
      window.removeEventListener('mousemove', setFromEvent);
    };
  }, [mousePressed]);

  return position;
};
