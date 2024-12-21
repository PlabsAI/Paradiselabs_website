import React from 'react';

declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> { }
    interface ElementClass extends React.Component<any> {
      render(): React.ReactNode;
    }
    interface ElementAttributesProperty {
      props: {};
    }
    interface ElementChildrenAttribute {
      children: {};
    }
    interface IntrinsicAttributes extends React.Attributes {}
    interface IntrinsicClassAttributes<T> extends React.ClassAttributes<T> {}
    interface IntrinsicElements extends React.JSX.IntrinsicElements {}
  }
}

declare module 'react' {
  interface FunctionComponent<P = {}> {
    (props: P, context?: any): React.ReactElement<any, any> | null;
  }
  
  interface StrictMode extends React.PropsWithChildren<{}> {
    children: React.ReactNode;
  }

  namespace React {
    function createElement<P extends {}>(
      type: FunctionComponent<P> | ComponentClass<P> | string,
      props?: Attributes & P | null,
      ...children: ReactNode[]
    ): ReactElement<P>;
  }
}

declare module 'react-dom/client' {
  interface Root {
    render(children: React.ReactNode): void;
  }
  
  function createRoot(container: Element | null): Root;
}

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

  export interface GlobalStyleComponent<P, T> extends React.ComponentType<P> {
    (props: P): React.ReactElement<any, any>;
  }

  export interface ThemedGlobalStyledClassProps {
    suppressMultiMountWarning?: boolean;
    theme?: DefaultTheme;
  }

  export type GlobalStyleComponent<P, T> = React.ComponentType<P & ThemedGlobalStyledClassProps>;

  export function createGlobalStyle<P = {}>(
    first: TemplateStringsArray | CSSObject | InterpolationFunction<ThemedStyledProps<P, DefaultTheme>>,
    ...interpolations: Array<Interpolation<ThemedStyledProps<P, DefaultTheme>>>
  ): GlobalStyleComponent<P, DefaultTheme>;
}
