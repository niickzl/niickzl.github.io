# Frontend Agent Rules & Animation Guidelines

## 1. General Engineering & Architecture
* Make changes according to the task's requirements. Do not assume existing structure, naming, content, or visual design must be preserved; the site is being rebuilt.
* Prefer straightforward, readable JavaScript and React. Use semantic HTML and reusable components where they are useful; avoid unnecessary wrappers and abstractions.
* Ensure links and assets work in the site's static hosting environment.
* Do not add backend services, API integrations, or backend-oriented loading and data-state patterns to these static pages.
* Choose visual treatments and organization that suit the requested outcome rather than matching the current site.

## 2. Coding & Implementation Principles
* List your assumptions first; if something is unclear, stop and ask.
* Write the minimum, nothing you didn't ask for. If 200 lines could be 50, rewrite them.
* Touch only the lines this needs.
* When debugging, write a test that reproduces it, then make it pass.

## 3. Layout, Styling & Typography
* Use rem-based font sizes; do not scale font size with viewport width. Define or change design tokens as appropriate. Use `clamp()` only for bounded dimensions where specifically needed, not as a substitute for responsive layout.
* Keep layouts fluid and responsive. Prevent horizontal overflow on narrow screens and at 200% zoom.

## 4. Accessibility (WCAG 2.2 AA) & Responsiveness
* Meet WCAG 2.2 AA contrast: normal text must have at least 4.5:1 contrast; large text (at least 18 pt regular or 14 pt bold) must have at least 3:1. Meaningful control boundaries and icons must have at least 3:1 contrast against adjacent colors. Calculate contrast as `(L1 + 0.05) / (L2 + 0.05)`, where `L1` is the lighter relative luminance and `L2` is the darker.
* Check foreground/background contrast in both light and dark themes where both are supported. Do not rely on color alone to convey information.
* Make controls keyboard-operable, provide accessible names and visible focus indicators, and use meaningful alternative text.

## 5. Animation & Motion Design Principles
1. Ease-out for entrances
2. Dropdowns at 150–250ms
3. Stagger list rows by 30ms
4. Scale to 0.97 on press
5. Stretch moving knobs 12%
6. Stagger as details settle
7. Arcs for object movement
8. Pulse to confirm success
9. Ease-in-out for moves
10. Start popovers at 0.95
11. Enter from the trigger
12. Exit to the trigger
13. No bounce on everyday UI
14. Don't tween while held
15. Make exits 20% shorter
16. Overlap old & new states
17. Masks for reveals & colour
18. Crossfade icons + blur
19. Rubber band past bounds
20. Reuse the same layoutId
