import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

/** Moderate scale for font sizes — caps min/max so text stays readable on all phones. */
export function ms(size: number, factor = 0.6): number {
  const boosted = size * 1.08; // global 8% boost for bigger fonts
  const scale = SCREEN_WIDTH / BASE_WIDTH;
  const scaled = boosted + (scale - 1) * boosted * factor;
  const rounded = Math.round(PixelRatio.roundToNearestPixel(scaled));
  return Math.min(Math.max(rounded, boosted * 0.85), boosted * 1.2);
}

export function verticalScale(size: number): number {
  return Math.round((SCREEN_HEIGHT / BASE_HEIGHT) * size);
}

export { SCREEN_WIDTH, SCREEN_HEIGHT };
