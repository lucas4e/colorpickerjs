import React, { useState, useEffect } from 'react';
import { useMousePosition } from './components/useMousePosition';
import { useScrollValue } from './components/useScrollValue';
import './index.css';

function App() {
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [lightness, setLightness] = useState(0);

  const mousePos = useMousePosition();
  const scrollVal = useScrollValue();

  const getHSL = (h, s, l) => {
    h = 220;
    s = 70;
    l = 50;

    return `hsl(${h}, ${s}%, ${l}%)`;
  };

  return (
    <div className='container'>
      <div
        className='background'
        style={{ backgroundColor: getHSL(hue, saturation, lightness) }}
      >
        {console.log(mousePos.x + ' ' + mousePos.y)}
      </div>
    </div>
  );
}

export default App;
