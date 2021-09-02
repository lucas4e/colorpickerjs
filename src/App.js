import React, { useState, useEffect, useMemo } from 'react';
import { useMousePosition } from './components/useMousePosition';
import { useScrollValue } from './components/useScrollValue';
import { getColorFormatValues } from './components/getColorFormatValues';
import { getConstraints } from './components/getConstraints';
import './index.css';

function App() {
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [lightness, setLightness] = useState(0);
  const maxHue = 360;

  const mousePos = useMousePosition();
  const scrollVal = useScrollValue();

  const constraints = useMemo(() => {
    const props = {
      hue,
      setHue,
      saturation,
      setSaturation,
      lightness,
      setLightness,
    };
    return {
      props,
    };
  }, [hue, saturation, lightness]);

  getConstraints(constraints);

  const colorFormat = getColorFormatValues();

  useEffect(() => {
    const mousePosDivByWindow = mousePos.y / window.innerHeight;
    const newSaturation = mousePosDivByWindow * 100;
    setSaturation(newSaturation);
  }, [mousePos.y]);

  useEffect(() => {
    const mousePosDivByWindow = mousePos.x / window.innerWidth;
    const newHue = mousePosDivByWindow * maxHue;
    setHue(newHue);
  }, [mousePos.x]);

  useEffect(() => {
    setLightness(scrollVal);
  }, [scrollVal]);

  const getHSL = (h, s, l) => {
    h = hue;
    s = saturation;
    l = lightness;

    return `hsl(${h}, ${s}%, ${l}%)`;
  };

  return (
    <div className='container'>
      <div
        className='background'
        id='background'
        style={{ backgroundColor: getHSL(hue, saturation, lightness) }}
      >
        <div className='colorProps disable-select'>
          <p>
            {'Hue: ' +
              Math.round(hue) +
              ' Saturation: ' +
              Math.round(saturation) +
              '%' +
              ' Lightness: ' +
              lightness +
              '%'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
