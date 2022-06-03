import { gradientColors } from '../constants/gradientColors';

const colorsList = [
  [gradientColors.darkBlueGradient, gradientColors.lightBlueGradient],
  [gradientColors.darkGreenGradient, gradientColors.lightGreenGradient],
  [gradientColors.darkAzureGradient, gradientColors.lightAzureGradient],
  [gradientColors.lightPurpleGradient, gradientColors.darkPurpleGradient],
  [gradientColors.lightRedGradient, gradientColors.darkRedGradient],
];

export const getGradientColors = () => {
  const index = Math.ceil(Math.random() * (colorsList.length - 1));
  return colorsList[index] || colorsList[0];
};
