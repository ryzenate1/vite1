declare module 'locomotive-scroll' {
  export interface ILocomotiveScrollOptions {
    el?: HTMLElement;
    name?: string;
    offset?: [number, number];
    repeat?: boolean;
    smooth?: boolean;
    smoothMobile?: boolean;
    inertia?: number;
    class?: string;
    scrollbarClass?: string;
    scrollingClass?: string;
    draggingClass?: string;
    smoothClass?: string;
    initClass?: string;
    getSpeed?: boolean;
    getDirection?: boolean;
    scrollbarContainer?: HTMLElement;
    multiplier?: number;
    firefoxMultiplier?: number;
    touchMultiplier?: number;
    resetNativeScroll?: boolean;
    tablet?: {
      smooth?: boolean;
      breakpoint?: number;
    };
    smartphone?: {
      smooth?: boolean;
      breakpoint?: number;
    };
    reloadOnContextChange?: boolean;
    lerp?: number;
  }

  export default class LocomotiveScroll {
    constructor(options?: ILocomotiveScrollOptions);
    destroy(): void;
    update(): void;
    stop(): void;
    start(): void;
    scrollTo(target: string | number | HTMLElement, options?: object): void;
  }
} 