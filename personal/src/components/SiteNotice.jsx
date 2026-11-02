export default function SiteNotice() {
  return (
    <aside className="site-notice" aria-label="Website update notice">
      <div className="site-notice-inner">
        <p>
          This website isn't regularly updated. For recent
          updates,{' '}
          <a
            href="https://www.linkedin.com/in/nickl24/"
            target="_blank"
            rel="noopener noreferrer"
          >
            check LinkedIn
          </a>
          .
          Last updated:{' '}
          <time dateTime="2026-11-02">November 2, 2026</time>.
        </p>
      </div>
    </aside>
  );
}
