import { colors } from '../constants/colors';

const colorsList = [
  [colors.darkBlueGradient, colors.lightBlueGradient],
  [colors.darkGreenGradient, colors.lightGreenGradient],
  [colors.darkAzureGradient, colors.lightAzureGradient],
  [colors.lightPurpleGradient, colors.darkPurpleGradient],
  [colors.lightRedGradient, colors.darkRedGradient],
];

export const getGradientColors = () => {
  const index = Math.ceil(Math.random() * (colorsList.length - 1));
  return colorsList[index];
};
