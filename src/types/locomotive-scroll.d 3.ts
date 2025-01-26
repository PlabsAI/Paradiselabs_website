declare module 'locomotive-scroll' {
  export interface LocomotiveScrollOptions {
    el: HTMLElement;
    smooth?: boolean;
    multiplier?: number;
    lerp?: number;
    getDirection?: boolean;
    getSpeed?: boolean;
    class?: string;
    initPosition?: { x: number; y: number };
    reloadOnContextChange?: boolean;
    touchMultiplier?: number;
    smoothMobile?: boolean;
    smartphone?: {
      smooth?: boolean;
      multiplier?: number;
      lerp?: number;
    };
    tablet?: {
      smooth?: boolean;
      multiplier?: number;
      lerp?: number;
    };
    firefoxMultiplier?: number;
  }

  export default class LocomotiveScroll {
    constructor(options: LocomotiveScrollOptions);
    destroy(): void;
    update(): void;
    stop(): void;
    start(): void;
    scrollTo(target: string | HTMLElement | number, options?: any): void;
  }
}
