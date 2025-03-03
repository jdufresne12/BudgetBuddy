// src/theme/typography.js
import { Platform } from 'react-native';

export const typography: any = {
  fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
  fontWeights: {
    tiny: '300',
    regular: '400',
    medium: '500',
    bold: '600',
    heavy: '700',
    heavier: '800',
  },
  sizes: {
    tiny: 10,
    small: 12,
    medium: 14,
    body: 16,
    title: 18,
    header: 22,
    moneyLarge: 30
  }
};

export const colors: any = {
  primary: '#32cbed',
  secondary: '#e9f5f9',
  white: '#FFFFFF',
  black: '#080808',
  inactive: '#7d7d7d',
  empty: '#e4e4e4',
  error_red: '#fc212f',
  remove: '#ff4262',
  income_green: "#178a36",
  expense_red: "#EA4D3D"
};