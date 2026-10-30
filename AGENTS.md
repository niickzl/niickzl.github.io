# Repository Instructions

Begin every response with `Nickzl: `.

## Project context

- This repository hosts Nick's personal website and related portfolio pages, including projects, competitions, photography, chess, and about-me content.
- The root `index.html` is the site hub. `personal/` contains the published personal website and its static assets.
- The League of Legends draft app is a separate React app in `LoLDraftAppWeb/`; its built static site is published from `LolDraftAppWebDist/` under the same GitHub Pages domain.
- Keep these as static, client-side sites. There is no backend.
- The personal website's React source, assets, and Vite static build all live in `personal/`. It uses hash routes and remains hosted on GitHub Pages without a backend.

## Static pages and UI

- Make changes according to the task's requirements. Do not assume existing structure, naming, content, or visual design must be preserved; the site is being rebuilt.
- Prefer straightforward, readable JavaScript and React. Use semantic HTML and reusable components where they are useful; avoid unnecessary wrappers and abstractions.
- Use rem-based font sizes; do not scale font size with viewport width. Define or change design tokens as appropriate. Use `clamp()` only for bounded dimensions where specifically needed, not as a substitute for responsive layout.
- Keep layouts fluid and responsive. Prevent horizontal overflow on narrow screens and at 200% zoom.
- Meet WCAG 2.2 AA contrast: normal text must have at least 4.5:1 contrast; large text (at least 18 pt regular or 14 pt bold) must have at least 3:1. Meaningful control boundaries and icons must have at least 3:1 contrast against adjacent colors. Calculate contrast as `(L1 + 0.05) / (L2 + 0.05)`, where `L1` is the lighter relative luminance and `L2` is the darker.
- Check foreground/background contrast in both light and dark themes where both are supported. Do not rely on color alone to convey information.
- Make controls keyboard-operable, provide accessible names and visible focus indicators, and use meaningful alternative text. Respect reduced-motion preferences for nonessential animation.
- Choose visual treatments and organization that suit the requested outcome rather than matching the current site.
- Ensure links and assets work in the site's static hosting environment.
- Do not add backend services, API integrations, or backend-oriented loading and data-state patterns to these static pages.
