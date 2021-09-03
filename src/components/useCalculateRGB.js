export const useCalculateRGB = (e) => {
  if (!e) {
    return <p>Loading</p>;
  }

  const style = window
    .getComputedStyle(e, null)
    .getPropertyValue('background-color');

  return style;
};
