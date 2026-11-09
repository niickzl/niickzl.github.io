import { useEffect, useState } from 'react';
import './FadeOut.css';

const fadeOutDuration = 320;

export default function FadeOut({
  as: Element = 'div',
  children,
  className = '',
  visible,
  ...props
}) {
  const [mounted, setMounted] = useState(visible);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      return undefined;
    }

    if (!mounted) return undefined;

    const timeout = window.setTimeout(() => setMounted(false), fadeOutDuration);
    return () => window.clearTimeout(timeout);
  }, [mounted, visible]);

  if (!mounted) return null;

  return (
    <Element
      {...props}
      aria-hidden={!visible}
      inert={!visible}
      className={`fade-out ${visible ? 'fade-out-visible' : 'fade-out-hidden'}${className ? ` ${className}` : ''}`}
    >
      {children}
    </Element>
  );
}
