export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>Thanks for visiting. Feel free to reach out.</p>
      <nav className="social-links" aria-label="Contact and social links">
        <a href="mailto:20051024nick@gmail.com" aria-label="Email" title="Email">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
        </a>
        <a href="https://www.linkedin.com/in/nickl24/" target="_blank" rel="noreferrer" aria-label="LinkedIn" title="LinkedIn">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M8 10v7m0-10h.01M12 17v-7m0 3a3 3 0 0 1 6 0v4" />
          </svg>
        </a>
        <a href="https://github.com/niickzl" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-4 1-4-2-5-2m10 4v-3.1c0-.9.1-1.3-.4-1.8 3.1-.3 6.4-1.5 6.4-6.9a5.4 5.4 0 0 0-1.5-3.8 5 5 0 0 0-.1-3.8s-1.2-.4-3.9 1.5a13.4 13.4 0 0 0-7.1 0C4.7 1.2 3.5 1.6 3.5 1.6a5 5 0 0 0-.1 3.8A5.4 5.4 0 0 0 2 9.2c0 5.4 3.3 6.6 6.4 6.9-.4.4-.5.9-.4 1.8V21" transform="translate(1 1) scale(.92)" />
          </svg>
        </a>
        <a href="https://www.youtube.com/@nickzl24" target="_blank" rel="noreferrer" aria-label="YouTube" title="YouTube">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="5" width="20" height="14" rx="4" />
            <path d="m10 9 5 3-5 3z" />
          </svg>
        </a>
        <a
          href="https://open.spotify.com/user/a8996u4euvbxavuwz3ugsc93i?si=c2d7bf6e778441d8"
          target="_blank"
          rel="noreferrer"
          aria-label="Spotify"
          title="Spotify"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M6.5 9.2c3.8-1.2 8.2-.8 11.4 1.1M7.1 12.2c3.1-1 6.7-.7 9.5 1M7.7 15c2.4-.7 5.2-.5 7.4.8" />
          </svg>
        </a>
        <a href="https://www.chess.com/member/hiiamnick" target="_blank" rel="noreferrer" aria-label="Chess.com" title="Chess.com">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="6" r="3" />
            <path d="M8 21h8m-9-3h10l-1 3H8l-1-3Zm1-3c1.5-1.5 2-3.5 2-6h4c0 2.5.5 4.5 2 6l1 3H7l1-3Z" />
          </svg>
        </a>
      </nav>
      <small>© 2026 Nick Lei</small>
    </footer>
  );
}
