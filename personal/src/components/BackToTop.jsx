import { useEffect, useState } from 'react';
import FadeIn from './FadeIn.jsx';
import FadeOut from './FadeOut.jsx';

const visibilityThreshold = 400;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function updateVisibility() {
      setVisible(window.scrollY > visibilityThreshold);
    }

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });

    return () => window.removeEventListener('scroll', updateVisibility);
  }, []);

  return (
    <FadeOut
      visible={visible}
      className="back-to-top-container"
    >
      <FadeIn
        as="button"
        active
        className="back-to-top"
        type="button"
        aria-label="Back to top"
        title="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 14 6-6 6 6M12 8v12" />
        </svg>
      </FadeIn>
    </FadeOut>
  );
}
