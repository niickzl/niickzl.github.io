import PageIntro from '../components/PageIntro.jsx';
import { chessGames } from '../data.js';

export default function Chess() {
  return (
    <main id="main-content" className="page-shell">
      <PageIntro
        eyebrow="A long-running interest"
        title="Chess"
        description="I was introduced to chess in high school and have been hooked ever since."
      >
        <p className="page-description">
          Game titles show my rating first; I’m always playing from the bottom of the board.
        </p>
        <a
          className="text-link"
          href="https://www.chess.com/member/hiiamnick"
          target="_blank"
          rel="noreferrer"
        >
          Visit my Chess.com profile
        </a>
      </PageIntro>
      <section className="chess-grid" aria-label="Selected chess games">
        {chessGames.map((game) => (
          <article className="chess-card" key={game.image}>
            <h2>{game.title}</h2>
            <img
              src={`/personal/${game.image}`}
              alt={`Animated board from ${game.title}`}
              loading="lazy"
            />
            <a href={game.review} target="_blank" rel="noreferrer">
              Review this game
            </a>
          </article>
        ))}
      </section>
    </main>
  );
}
