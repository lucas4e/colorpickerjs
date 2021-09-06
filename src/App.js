import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useMousePosition } from './components/useMousePosition';
import { useScrollValue } from './components/useScrollValue';
import { setConstraints } from './components/setConstraints';
import { useCalculateRGB } from './components/useCalculateRGB';
import { useCalculateHEX } from './components/useCalculateHEX';
import './index.css';

//Feather Icons
import { Check, HelpCircle, Copy } from 'react-feather';

function App() {
  const [hasMoved, setHasMoved] = useState(false);
  const [hoverOnOutput, setHoverOnOutput] = useState(false);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [lightness, setLightness] = useState(0);
  const maxHue = 360;

  const mousePos = useMousePosition();
  const scrollVal = useScrollValue();

  const { HSLRef } = useRef(null);
  const { HEXRef } = useRef(null);
  const { RGBRef } = useRef(null);

  const element = document.getElementById('background');
  const copy = document.getElementById('copyPopup');
  const colorBox = document.getElementById('colorProps');

  const listenForMove = () => {
    setHasMoved(true);
    document.removeEventListener('mousedown', listenForMove);
    document.removeEventListener('wheel', listenForMove);
  };

  document.addEventListener('mousedown', listenForMove, { once: true });
  document.addEventListener('wheel', listenForMove, { once: true });

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
    if (!hoverOnOutput) {
      const mousePosDivByWindow = mousePos.y / window.innerHeight;
      const newSaturation = mousePosDivByWindow * 100;
      setSaturation(newSaturation);
    }
  }, [mousePos.y]);

  useEffect(() => {
    if (!hoverOnOutput) {
      const mousePosDivByWindow = mousePos.x / window.innerWidth;
      const newHue = mousePosDivByWindow * maxHue;
      setHue(newHue);
    }
  }, [mousePos.x]);

  useEffect(() => {
    setLightness(scrollVal);
  }, [scrollVal]);

  useEffect(() => {
    if (colorBox) {
      colorBox.addEventListener('mousedown', (e) => {
        e ? setHoverOnOutput(true) : setHoverOnOutput(false);
      });
    }
  }, [mousePos]);

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
        <div className='about'>
          <HelpCircle />
        </div>
        <div
          id='colorProps'
          className='colorProps absolute disable-select cursor'
        >
          {!hasMoved ? (
            <div>Click and drag cursor to change the background color</div>
          ) : (
            <div>
              <span>
                <span>
                  <h2>HSL</h2>
                  <p ref={HSLRef} value='HSL'>
                    {displayHSL()}
                  </p>
                </span>
                <Copy onClick={() => handleClick(HSLRef)} />
              </span>
              <div className='line'></div>
              <span>
                <span>
                  <h2>RGB</h2>
                  <p ref={RGBRef} value='RGB'>
                    {rgb}
                  </p>
                </span>
                <Copy onClick={() => handleClick()} />
              </span>
              <div className='line'></div>
              <span>
                <span>
                  <h2>HEX</h2>
                  <p ref={HEXRef} value='HEX'>
                    {hex}
                  </p>
                </span>
                <Copy onClick={() => handleClick()} />
              </span>
              <div className='line'></div>
            </div>
          )}
        </div>
        <div
          id='copyPopup'
          className='copyPopup absolute disable-select cursor'
        >
          <div>
            <p>Copied</p>
            <Check />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
