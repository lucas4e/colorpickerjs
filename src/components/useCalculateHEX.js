import React from 'react';

export const useCalculateHEX = (e) => {
  if (!e) {
    return <p>Loading</p>;
  }

  const RGBtoHEX = (rgb) => {
    const hex = `#${rgb
      .match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
      .slice(1)
      .map((n) => parseInt(n, 10).toString(16).padStart(2, '0'))
      .join('')}`;

    return hex;
  };

  const rgb = window
    .getComputedStyle(e, null)
    .getPropertyValue('background-color');

  const hex = RGBtoHEX(rgb);
  return hex;
};
