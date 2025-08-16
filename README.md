# Nick's Website Hub

This repository contains multiple websites that can be deployed on GitHub Pages.

## Structure

```
niickzl.github.io/
├── index.html                 # Main hub page
├── PersonalWeb/              # Personal website
│   ├── home.html             # Personal website home page
│   ├── aboutMe.html          # About me page
│   ├── projects.html         # Projects page
│   ├── competitions.html     # Competitions page
│   ├── photography.html      # Photography page
│   ├── chess.html           # Chess page
│   ├── stylesHome.css       # Main stylesheet
│   ├── stylesAboutMe.css    # About me styles
│   ├── stylesProjects.css   # Projects styles
│   ├── stylesCompetitions.css # Competitions styles
│   ├── stylesPhotography.css # Photography styles
│   ├── stylesChess.css      # Chess styles
│   ├── images/              # Image assets
│   ├── gifs/                # GIF assets
│   └── files/               # PDF files
├── LoLDraftAppWeb/          # React development folder
│   ├── src/                 # React source code
│   ├── package.json         # Dependencies
│   └── dist/                # Built files (copied to PersonalProjects)
└── PersonalProjects/        # LoL Drafter App (deployed)
    ├── index.html           # Built React app
    └── assets/              # Built assets
```

## Deployment

### Main Hub (Current Repository)
- **URL**: `https://niickzl.github.io`
- **Source**: Root directory
- **Purpose**: Hub page to navigate between different projects

### Personal Website
- **URL**: `https://niickzl.github.io/PersonalWeb/`
- **Source**: PersonalWeb directory
- **Purpose**: Personal portfolio and information

### LoL Drafter App
- **URL**: `https://niickzl.github.io/PersonalProjects/`
- **Source**: PersonalProjects directory (built from LoLDraftAppWeb)
- **Purpose**: League of Legends champion drafting tool built with React

## How to Add New Projects

1. Create a new folder in the root directory (e.g., `NewProject/`)
2. Add an `index.html` file in the new folder
3. Update the main `index.html` hub page to include a link to your new project
4. The new project will be accessible at `https://niickzl.github.io/NewProject/`

## Alternative: Separate Repositories

For completely independent projects, you can:

1. Create a new repository (e.g., `my-new-project`)
2. Copy the project files to the new repository
3. Enable GitHub Pages in the repository settings
4. The project will be accessible at `https://yourusername.github.io/my-new-project`

## File Structure Notes

- All hrefs in HTML files use relative paths
- Images and assets are organized in subdirectories
- CSS files are kept separate for each page for better organization
- The main hub page provides easy navigation between projects

## Contact

- **Email**: 20051024nick@gmail.com
- **LinkedIn**: [Nick Lei](https://www.linkedin.com/in/nickl24/)
- **GitHub**: [niickzl](https://github.com/niickzl)