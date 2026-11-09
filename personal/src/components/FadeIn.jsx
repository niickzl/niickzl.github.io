import { useEffect, useRef, useState } from 'react';
import './FadeIn.css';

export default function FadeIn({ as: Element = 'div', children, className = '', ...props }) {
  const elementRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return undefined;

    const element = elementRef.current;
    if (!element) return undefined;

    function checkVisibility() {
      const bounds = element.getBoundingClientRect();
      if (
        bounds.width > 0 &&
        bounds.height > 0 &&
        bounds.top < window.innerHeight &&
        bounds.bottom > 0 &&
        bounds.left < window.innerWidth &&
        bounds.right > 0
      ) {
        setVisible(true);
      }
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          setVisible(true);
          observer.disconnect();
        }
      });

      observer.observe(element);
      return () => observer.disconnect();
    }

    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility);
    checkVisibility();

    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, [visible]);

  return (
    <Element
      {...props}
      ref={elementRef}
      className={`fade-in${!visible ? ' fade-in-waiting' : ''}${className ? ` ${className}` : ''}`}
    >
      {children}
    </Element>
  );
}
