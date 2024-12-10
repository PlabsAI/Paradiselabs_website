import 'styled-components';

// Extend the DefaultTheme interface
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      logoAnimation: string;
      headerText: string;
      gradientStart: string;
      gradientEnd: string;
      textPrimary: string;
      textSecondary: string;
      textTertiary: string;
      neonPrimary: string;
      neonSecondary: string;
      glassBg: string;
      glassBorder: string;
      glassShine: string;
    };
    fonts: {
      primary: string;
      secondary: string;
      mono: string;
      display: string;
    };
    fontSizes: {
      xs: string;
      sm: string;
      base: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
      '5xl': string;
    };
    fontWeights: {
      thin: number;
      extralight: number;
      light: number;
      regular: number;
      medium: number;
      semibold: number;
      bold: number;
      extrabold: number;
      black: number;
    };
    lineHeights: {
      none: number;
      tight: number;
      snug: number;
      normal: number;
      relaxed: number;
      loose: number;
    };
    letterSpacing: {
      tighter: string;
      tight: string;
      normal: string;
      wide: string;
      wider: string;
      widest: string;
    };
  }
}
