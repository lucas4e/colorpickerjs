import React, { useState, useEffect } from 'react';
import { useMousePosition } from './components/useMousePosition';
import { useScrollValue } from './components/useScrollValue';
import './index.css';

function App() {
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(50);
  const [lightness, setLightness] = useState(0);

  const mousePos = useMousePosition();
  const scrollVal = useScrollValue();

  useEffect(() => {
    const mousePosDivByWindow = mousePos.y / window.innerHeight;
    const newSaturation = mousePosDivByWindow * 100;
    setSaturation(newSaturation);
  }, [mousePos.y]);

  useEffect(() => {
    const mousePosDivByWindow = mousePos.x / 360;
    const newHue = mousePosDivByWindow * 100;
    setHue(newHue);
  }, [mousePos.x]);

  const getHSL = (h, s, l) => {
    h = hue;
    s = saturation;
    l = 50;

    return `hsl(${h}, ${s}%, ${l}%)`;
  };

  if (saturation > 100) {
    return setSaturation(100);
  }

  if (saturation < 0) {
    return setSaturation(0);
  }

  return (
    <div className='container'>
      <div
        className='background'
        style={{ backgroundColor: getHSL(hue, saturation, lightness) }}
      >
        <div className='colorProps'>
          <p>{'Saturation: ' + Math.round(saturation)}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
