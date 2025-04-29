declare module 'konami' {
  export default class Konami {
    constructor(callback: () => void);
    disable(): void;
    enable(): void;
  }
} 