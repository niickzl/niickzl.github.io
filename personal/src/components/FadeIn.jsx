import { useEffect, useRef, useState } from 'react';
import './FadeIn.css';

export default function FadeIn({ as: Element = 'div', children, className = '', active, ...props }) {
  const elementRef = useRef(null);
  const [visible, setVisible] = useState(
    () => typeof window === 'undefined' || !('IntersectionObserver' in window),
  );

  useEffect(() => {
    if (active !== undefined || visible) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    });

    observer.observe(elementRef.current);
    return () => observer.disconnect();
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
