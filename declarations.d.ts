declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare global {
  interface Window {

    gsap: any;
    ScrollToPlugin: any;
    umami: {
      track: (eventName: string, data?: object) => void;
    };
  }
}
