# Nick's Personal Website & Projects

This repository contains Nick's personal website, related portfolio pages, and the League of Legends draft app. The personal website and draft app are static client-side sites hosted under the same GitHub Pages domain; neither requires a separate host or backend.

## Project Structure

```
niickzl.github.io/
├── index.html               # Main website hub
├── personal/                # Personal website and its published static assets
├── LoLDraftAppWeb/          # React + Vite source for the League draft app
└── LolDraftAppWebDist/      # Published static build of the League draft app
```

## Projects

### Personal Website and Portfolios

- **URL**: [https://niickzl.github.io/personal/](https://niickzl.github.io/personal/)
- **Stack**: React, React Router, and Vite, built to static files for GitHub Pages.
- **Navigation**: hash routes such as `/personal/#/projects`; no server rewrites are needed.

To build the personal website:

```powershell
cd personal
npm install
npm run build
```

The React source, site assets, and generated static build all live in `personal/`. Commit the generated `index.html` and `assets/` bundle with the source changes for GitHub Pages deployment.
For local development, run `npm run dev` in `personal/` and open `http://localhost:5173/personal/`. Run `npm run preview` after a build to view the published static output at the same URL. Stop the development server before starting the preview (or vice versa), since both use port 5173.

### LoL Draft App

- **URL**: [https://niickzl.github.io/LolDraftAppWebDist/](https://niickzl.github.io/LolDraftAppWebDist/)
- **Stack**: React, Vite, and JavaScript.

## Contact

- Email: 20051024nick@gmail.com
- LinkedIn: [Nick Lei](https://www.linkedin.com/in/nickl24/)
- GitHub: [niickzl](https://github.com/niickzl)

## License

This project is open source and available under the [MIT License](LICENSE).
