export const setConstraints = ({ props }) => {
  const { hue, setHue, saturation, setSaturation, lightness, setLightness } =
    props;

  if (hue > 360) {
    return setHue(360);
  }

  if (hue < 0) {
    return setHue(0);
  }

  if (saturation > 100) {
    return setSaturation(100);
  }

  if (saturation < 0) {
    return setSaturation(0);
  }

  if (lightness > 100) {
    return setLightness(100);
  }

  if (lightness < 0) {
    return setLightness(0);
  }
};
