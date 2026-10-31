import { useEffect, useRef, useState } from 'react';
import './FadeIn.css';

export default function FadeIn({ as: Element = 'div', children, className = '', active, ...props }) {
  const elementRef = useRef(null);
  const [visible, setVisible] = useState(
    () => typeof window === 'undefined' || !('IntersectionObserver' in window),
  );

  useEffect(() => {
    if (active !== undefined || visible) return undefined;

    const element = elementRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    });

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

    observer.observe(element);
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility);
    checkVisibility();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, [active, visible]);

  return (
    <Element
      {...props}
      ref={elementRef}
      className={`fade-in${active === undefined && !visible ? ' fade-in-waiting' : ''}${active ? ' fade-in-active' : ''}${className ? ` ${className}` : ''}`}
    >
      {children}
    </Element>
  );
}
