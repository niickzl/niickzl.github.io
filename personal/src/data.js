export const projects = [
  {
    number: '01',
    title: 'YouTube Comment Analyzer',
    category: 'AI Chrome Extension',
    date: 'Mar – Apr 2026',
    repository: 'https://github.com/niickzl/CMPT310---YouTube-Comment-Analyzer',
    background:
      'Creators have no quick way to learn about their audience across hundreds of comments; YTCA automates that.',
    stack: 'Python, FastAPI, HuggingFace Transformers, scikit-learn, SpaCy, and JavaScript.',
    features: [
      'Sentiment analysis with Twitter-trained RoBERTa and a sarcasm detection model.',
      'K-Means clustering on TF-IDF vectors groups comments into Content, Technical, and General categories.',
      'An interactive PCA cluster map visualizes comment groups and previews comments on hover.',
      'SpaCy keyword extraction adds clickable comment filters.',
      'PDF export creates a report with video thumbnail, statistics, keywords, and top comments.',
    ],
  },
  {
    number: '02',
    title: "Nick's LoL Drafter",
    category: 'Web App',
    date: 'Sep 2025',
    repository: 'https://github.com/niickzl/niickzl.github.io/tree/main/LoLDraftAppWeb',
    live: 'https://niickzl.github.io/LolDraftAppWebDist/index.html',
    background:
      "A League of Legends draft tool combining years of game knowledge with a custom team-composition recommendation system.",
    stack: 'React, JavaScript, and JSON.',
    features: [
      'Add and remove champions from selection and ban slots.',
      'Switch between pick and ban modes and swap between Blue and Red team perspectives.',
      'Search champions and filter by role.',
      'See each champion’s recommendation score update during the draft.',
    ],
  },
  {
    number: '03',
    title: 'EasyChart',
    category: 'Web App',
    date: 'Aug 2025',
    repository: 'https://github.com/CMPT-276-SUMMER-2025/final-project-5-lakes',
    live: 'https://easychart-omega.vercel.app/',
    demo: 'https://www.youtube.com/watch?v=mYPEXPJwkJY',
    background:
      'A web app for quick data visualization: upload data and generate editable, exportable graphs.',
    stack: 'Node.js, React, DeepSeek R1T2 Chimera, and Chart.js.',
    features: [
      'Extract data from uploaded files and edit it in a table.',
      'Recommend graph types and summarize trends in the data.',
      'Customize graph visuals and export in multiple formats.',
    ],
  },
  {
    number: '04',
    title: 'YouTube Audio Discord Bot',
    category: 'Python Project',
    date: 'Feb 2025',
    repository: 'https://github.com/niickzl/YT-DISC-BOT',
    background:
      'A private music bot built as a challenge after YouTube rate limits affected Discord audio bots.',
    features: [
      'Responds to @zlbot and !!! command prefixes.',
      'Provides join, leave, play, skip, and help commands.',
      'Streams YouTube audio from a link and maintains a song queue.',
    ],
  },
  {
    number: '05',
    title: 'User Information Storage Program',
    category: 'Python Project',
    date: 'May – Jun 2024',
    repository: 'https://github.com/niickzl/USER-INFO-PROGRAM',
    background:
      'A Tkinter program inspired by customer information software used by a family business.',
    features: [
      'Store, retrieve, search, and edit user information.',
      'Organize data by date in structured files for easy access.',
    ],
  },
];

export const competitions = [
  {
    number: '01',
    title: 'SillyHacks Hackathon',
    organization: 'SFU Surge',
    date: 'Apr 2026',
    repository: 'https://github.com/niickzl/Aura-Monitor',
    background:
      "A 12-hour hackathon celebrating April Fools' Day with a deliberately silly project.",
    idea: 'Aura Monitor',
    features: [
      'A browser extension classifies the “aura” of text using a tailored natural-language model.',
      'Negative aura triggers a random image and sound effect.',
      'Gemini generates a humorous roast, spoken with an ElevenLabs voice.',
    ],
  },
  {
    number: '02',
    title: 'Mountain Madness Hackathon',
    organization: 'CSSS, SFU',
    date: 'Mar 2026',
    repository: 'https://github.com/niickzl/RBC',
    background:
      'A 24-hour hackathon hosted by the Computing Science Student Society. Our team built for the RBC Personal Finance Platforms track.',
    idea: 'RBC (Rational Budgeting Calendar)',
    features: [
      'Connects calendars and bank accounts to create adaptive daily spending limits.',
      'Classifies income and spending, splits budgets by event, and redistributes unused limits.',
      'Includes goals, daily streaks, friend leaderboards, and savings-efficiency ranks.',
    ],
  },
  {
    number: '03',
    title: 'SAP Concur Case Competition',
    organization: 'Pivot, CaseIT',
    date: 'Feb 2025',
    document: 'files/pivot.pdf',
    background:
      "Our team created a strategic plan to optimize SAP Concur's features and growth.",
    features: [
      'Redesign the NewGen UI with online banking connections and AI voice detection.',
      'Establish secure data privacy with physical servers at client headquarters.',
      'Tailor payment and travel integrations for North American clients in Asia.',
    ],
  },
  {
    number: '04',
    title: 'Forward Vision Pitch Competition',
    organization: 'Enactus',
    date: 'Feb 2025',
    document: 'files/enactus.pdf',
    background:
      'Forward Vision develops ideas inspired by the United Nations Sustainable Development Goals.',
    idea: "Let's Go Doggo!",
    features: [
      'A multi-purpose app to raise awareness of local dog shelters and support existing dog owners.',
      'Connects people with their dogs and supports Goals 3, 11, and 16.',
    ],
  },
];

export const photographs = [
  { image: 'images/sunset.webp', alt: 'Sunset in Burnaby, Canada', location: 'Burnaby, Canada' },
  { image: 'images/yongshun.webp', alt: 'Scenery in Yongshun, China', location: 'Yongshun, China' },
  { image: 'images/zhangjiajie.webp', alt: 'Scenery in Zhangjiajie, China', location: 'Zhangjiajie, China' },
  { image: 'images/toronto.webp', alt: 'Scenery in Toronto, Canada', location: 'Toronto, Canada' },
];

export const chessGames = [
  {
    image: 'gifs/chessLeftOne.webp',
    title: '(1620) vs (1593) · Rapid',
    review: 'https://www.chess.com/analysis/game/live/123368152778?tab=review',
  },
  {
    image: 'gifs/chessLeftTwo.webp',
    title: '(1631) vs (1624) · Rapid',
    review: 'https://www.chess.com/analysis/game/live/123558032818?tab=review',
  },
  {
    image: 'gifs/chessRightOne.webp',
    title: '(1574) vs (1643) · Rapid',
    review: 'https://www.chess.com/analysis/game/live/126155373007?tab=review',
  },
  {
    image: 'gifs/chessRightTwo.webp',
    title: '(1542) vs (1542) · Rapid',
    review: 'https://www.chess.com/analysis/game/live/125663367031?tab=review',
  },
];
