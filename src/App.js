import React, { useState, useEffect, useMemo } from 'react';
import { useMousePosition } from './components/useMousePosition';
import { useScrollValue } from './components/useScrollValue';
import { setConstraints } from './components/setConstraints';
import { useCalculateRGB } from './components/useCalculateRGB';
import { useCalculateHEX } from './components/useCalculateHEX';
import './index.css';

//Feather Icons
import { Clipboard, HelpCircle, Copy } from 'react-feather';

function App() {
  const [hasMoved, setHasMoved] = useState(false);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [lightness, setLightness] = useState(0);
  const maxHue = 360;

  const mousePos = useMousePosition();
  const scrollVal = useScrollValue();

  document.addEventListener('mousedown', () => {
    setHasMoved(true);
  });

  document.addEventListener('wheel', () => {
    setHasMoved(true);
  });

  const element = document.getElementById('background');
  const copy = document.getElementById('copyPopup');

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

  setConstraints(constraints);

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

  const handleClick = (e) => {
    navigator.clipboard.writeText(e).then(
      () => {
        if (!copy.classList.contains('popup')) {
          copy.classList.add('popup');
          setTimeout(() => {
            copy.classList.remove('popup');
          }, 1200);
        }
      },
      () => {
        console.log('Copy to clipboard failed');
      }
    );
  };

  const displayHSL = () => {
    return `hsl(${Math.round(hue)}, ${Math.round(saturation)}%, ${lightness}%)`;
  };

  let rgb = useCalculateRGB(element);
  let hex = useCalculateHEX(element);

  return (
    <div className='container'>
      <div
        className='background'
        id='background'
        style={{ backgroundColor: getHSL(hue, saturation, lightness) }}
      >
        <div className='logo absolute'>
          <p>ColorPickerJS</p>
        </div>
        <div className='about'>
          <HelpCircle />
        </div>
        <div className='colorProps absolute disable-select cursor'>
          {!hasMoved ? (
            <div>Click and drag cursor to change the background color</div>
          ) : (
            <div>
              <p onClick={(e) => handleClick(e.target.innerHTML)}>
                {displayHSL()}
              </p>
              <p onClick={(e) => handleClick(e.target.innerHTML)}>{rgb}</p>
              <p onClick={(e) => handleClick(e.target.innerHTML)}>{hex}</p>
            </div>
          )}
        </div>
        <div
          id='copyPopup'
          className='copyPopup absolute disable-select cursor'
        >
          <div>
            <p>Copied</p>
            <Clipboard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
