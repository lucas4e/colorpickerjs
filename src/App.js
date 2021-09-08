import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useMousePosition } from './components/useMousePosition';
import { useScrollValue } from './components/useScrollValue';
import { setConstraints } from './components/setConstraints';
import { useCalculateRGB } from './components/useCalculateRGB';
import { useCalculateHEX } from './components/useCalculateHEX';
import './index.css';

//Feather Icons
import { Check, HelpCircle, Copy, ChevronRight } from 'react-feather';

function App() {
  const hasMoved = useRef(false);
  const [InputHover, setInputHover] = useState(false);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [lightness, setLightness] = useState(0);
  const maxHue = 360;

  const mousePos = useMousePosition();
  const scrollVal = useScrollValue();

  const HSLRef = useRef(null);
  const HEXRef = useRef(null);
  const RGBRef = useRef(null);

  const element = document.getElementById('background');
  const copy = document.getElementById('copyPopup');
  const outputBox = document.getElementsByClassName('copyBtn');

  const listenForMove = () => {
    hasMoved.current = true;
    document.removeEventListener('mousedown', listenForMove);
    document.removeEventListener('wheel', listenForMove);
  };

  document.addEventListener('mousedown', listenForMove, { once: true });
  document.addEventListener('wheel', listenForMove, { once: true });

  if (outputBox) {
    for (let i = 0; i < outputBox.length; i++) {
      outputBox[i].addEventListener('mouseover', () => {
        setInputHover(true);
      });
      outputBox[i].addEventListener('mouseout', () => {
        setInputHover(false);
      });
    }
  }

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
    if (!InputHover) {
      const mousePosDivByWindow = mousePos.y / window.innerHeight;
      const newSaturation = mousePosDivByWindow * 100;
      setSaturation(newSaturation);
    }
  }, [mousePos.y]);

  useEffect(() => {
    if (!InputHover) {
      const mousePosDivByWindow = mousePos.x / window.innerWidth;
      const newHue = mousePosDivByWindow * maxHue;
      setHue(newHue);
    }
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
    navigator.clipboard.writeText(e.current.innerHTML).then(
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
  let hsl = displayHSL();

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

        <div>
          {!hasMoved.current ? (
            <div className='infoMsg absolute disable-select'>
              Click and drag cursor to change the background color
            </div>
          ) : (
            <div
              id='colorProps'
              className='colorProps absolute disable-select cursor glass'
            >
              <span>
                <span>
                  <h2>HSL</h2>
                  <p ref={HSLRef} value='HSL'>
                    {hsl}
                  </p>
                </span>
                <Copy className='copyBtn' onClick={() => handleClick(HSLRef)} />
              </span>
              <div className='line'></div>
              <span>
                <span>
                  <h2>RGB</h2>
                  <p ref={RGBRef} value='RGB'>
                    {rgb}
                  </p>
                </span>
                <Copy className='copyBtn' onClick={() => handleClick(RGBRef)} />
              </span>
              <div className='line'></div>
              <span>
                <span>
                  <h2>HEX</h2>
                  <p ref={HEXRef} value='HEX'>
                    {hex}
                  </p>
                </span>
                <Copy className='copyBtn' onClick={() => handleClick(HEXRef)} />
              </span>
              <div className='line'></div>
              <div className='instructions'>
                <span>
                  <ChevronRight />
                  <p>Click and drag left and righ to change hue</p>
                </span>
                <span>
                  <ChevronRight />
                  <p>Click and drag up and down to change saturation</p>
                </span>
                <span>
                  <ChevronRight />
                  <p>Scroll to change lightness</p>
                </span>
              </div>
            </div>
          )}
        </div>
        <div
          id='copyPopup'
          className='copyPopup absolute disable-select cursor glass'
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
