export const getColorFormatValues = (element) => {
  if (!element) {
    return null;
  }

  const rgb = window
    .getComputedStyle(element, null)
    .getPropertyValue('background-color');
  // const rgbNum = rgb.replace(/[^\d.-]/g, '');
  return rgb.toUpperCase();
};
