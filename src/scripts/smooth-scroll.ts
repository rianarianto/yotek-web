/**
 * Smooth Scroll — Lenis + GSAP ScrollTrigger Sync
 * Initialized globally and re-initialized on View Transitions
 */
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export function initSmoothScroll(): Lenis {
  // Cleanup previous instance if exists
  if (lenisInstance) {
    lenisInstance.destroy();
    gsap.ticker.remove(tickerCallback);
  }

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    touchMultiplier: 2,
  });

  // Sync Lenis scroll position with GSAP ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update);

  // Use GSAP ticker for Lenis RAF
  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

function tickerCallback(time: number) {
  lenisInstance?.raf(time * 1000);
}

export function destroySmoothScroll() {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
    gsap.ticker.remove(tickerCallback);
  }
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}
