/**
 * Reusable GSAP Animation Utilities
 * Used across all pages for consistent entrance animations
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Animate elements with a reveal-up effect on scroll
 */
export function animateReveal(
  selector: string | Element | Element[],
  options: {
    delay?: number;
    duration?: number;
    y?: number;
    stagger?: number;
    start?: string;
  } = {}
) {
  const {
    delay = 0,
    duration = 1,
    y = 40,
    stagger = 0.1,
    start = 'top 85%',
  } = options;

  gsap.fromTo(
    selector,
    { 
      opacity: 0, 
      y, 
      filter: 'blur(10px)',
      scale: 0.98
    },
    {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      duration,
      delay,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: typeof selector === 'string' ? selector : (selector as Element),
        start,
        toggleActions: 'play none none none',
      },
    }
  );
}

/**
 * Split text into characters and animate them
 */
export function splitTextReveal(element: HTMLElement, options: { delay?: number; duration?: number } = {}) {
  const { delay = 0, duration = 0.8 } = options;
  const text = element.textContent || '';
  element.textContent = '';
  element.style.visibility = 'visible';

  // Split into words first, then characters
  const words = text.split(' ');
  words.forEach((word, wordIndex) => {
    const wordSpan = document.createElement('span');
    wordSpan.style.display = 'inline-block';
    wordSpan.style.overflow = 'hidden';
    wordSpan.style.verticalAlign = 'top';

    const chars = word.split('');
    chars.forEach((char) => {
      const charSpan = document.createElement('span');
      charSpan.className = 'split-char';
      charSpan.textContent = char;
      wordSpan.appendChild(charSpan);
    });

    element.appendChild(wordSpan);

    // Add space between words
    if (wordIndex < words.length - 1) {
      const space = document.createElement('span');
      space.innerHTML = '&nbsp;';
      space.style.display = 'inline-block';
      element.appendChild(space);
    }
  });

  // Animate characters
  const allChars = element.querySelectorAll('.split-char');
  gsap.fromTo(
    allChars,
    { opacity: 0, y: '100%' },
    {
      opacity: 1,
      y: '0%',
      duration,
      delay,
      stagger: 0.03,
      ease: 'power3.out',
    }
  );
}

/**
 * Stagger children elements with scroll trigger
 */
export function staggerChildren(
  container: string | Element,
  childSelector: string,
  options: {
    duration?: number;
    stagger?: number;
    start?: string;
    y?: number;
  } = {}
) {
  const { duration = 0.8, stagger = 0.15, start = 'top 80%', y = 30 } = options;

  const parent = typeof container === 'string' ? document.querySelector(container) : container;
  if (!parent) return;

  const children = parent.querySelectorAll(childSelector);

  gsap.fromTo(
    children,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: parent as Element,
        start,
        toggleActions: 'play none none none',
      },
    }
  );
}

/**
 * Parallax effect for images
 */
export function parallaxImage(
  imageSelector: string,
  options: { speed?: number; start?: string; end?: string } = {}
) {
  const { speed = 50, start = 'top bottom', end = 'bottom top' } = options;

  gsap.to(imageSelector, {
    y: speed,
    ease: 'none',
    scrollTrigger: {
      trigger: imageSelector,
      start,
      end,
      scrub: true,
    },
  });
}

/**
 * Counter animation (for stats)
 */
export function animateCounter(
  element: HTMLElement,
  endValue: number,
  options: { duration?: number; suffix?: string; prefix?: string } = {}
) {
  const { duration = 2, suffix = '', prefix = '' } = options;

  const obj = { value: 0 };
  gsap.to(obj, {
    value: endValue,
    duration,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
    onUpdate: () => {
      element.textContent = `${prefix}${Math.round(obj.value)}${suffix}`;
    },
  });
}

/**
 * Horizontal marquee animation
 */
export function marqueeAnimation(containerSelector: string, options: { speed?: number; direction?: 'left' | 'right' } = {}) {
  const { speed = 30, direction = 'left' } = options;
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const inner = container.querySelector('.marquee-inner') as HTMLElement;
  if (!inner) return;

  const totalWidth = inner.scrollWidth / 2;
  const xFrom = direction === 'left' ? 0 : -totalWidth;
  const xTo = direction === 'left' ? -totalWidth : 0;

  gsap.fromTo(
    inner,
    { x: xFrom },
    {
      x: xTo,
      duration: speed,
      ease: 'none',
      repeat: -1,
    }
  );
}

/**
 * Kill all ScrollTrigger instances (for cleanup on page transition)
 */
export function killAllAnimations() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}
