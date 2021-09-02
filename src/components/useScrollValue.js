import { useEffect, useState } from 'react';

export const useScrollValue = () => {
  const [scrollVal, setScrollVal] = useState(50);
  const tick = 2;

  const checkScrollDirection = (event) => {
    if (event.wheelDelta) {
      return event.wheelDelta > 0;
    }

    return event.deltaY < 0;
  };

  const incrementScroll = () => {
    return setScrollVal(scrollVal + tick);
  };

  const decrementScroll = () => {
    return setScrollVal(scrollVal - tick);
  };

  const setConstraints = () => {
    if (scrollVal > 100) {
      setScrollVal(100);
    }

    if (scrollVal < 0) {
      setScrollVal(0);
    }
  };

  useEffect(() => {
    const handleScroll = (event) => {
      if (checkScrollDirection(event)) {
        incrementScroll();
      } else {
        decrementScroll();
      }
    };
    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [scrollVal]);

  setConstraints();

  return scrollVal;
};
