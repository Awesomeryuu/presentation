/* =====================================================================
   MODEL — the data and state of the app. Never touches the DOM.
   Edit your content here: featured projects, skills, image overrides.
   ===================================================================== */

const Model = {

  githubUser: "Awesomeryuu",

  // Where the contact form delivers (via formsubmit.co relay)
  contactEmail: "mez.rahman777@gmail.com",

  // App state (read/written by the Controller, displayed by the View)
  state: {
    screen: "home",        // which screen is showing
    menuIndex: 0,          // selected item on the home menu
    reposLoaded: false,
    skillsBuilt: false,
  },

  // ---- Featured projects (hand-written, shown above the GitHub feed) ----
  featured: [
    {
      title: "So3 Narajo's desc",
      tag: "Video", color: "#FFFFFF", live: true,
      url: "https://vt.tiktok.com/ZSbqYtmTb/", cta: "Watch on Tiktok →",
      img: "assets/projects/bsl.png",
      desc: "Claudio Naranjo defined the Social Three (SO3) subtype which he named “Prestige”as an Enneagram Three whose core vanity and fixation on image are channeled through the social instinct to gain status, recognition, and group validation",
    },
    {
      title: "The Status Seeking Three",
      tag: "Article", color: "#FFFFFF",
      url: "https://www.enneagramentrepreneur.com/blog/enneagram-social-3",
      cta: "View on Entreprenuer →",
      img: "assets/projects/steam.png",
      desc: "The Social Three (SO3) has been nicknamed “Prestige,” a term used by Enneagram teacher Beatrice Chestnut in The Complete Enneagram, building on psychiatrist Claudio Naranjo’s early work with instincts. “Prestige” reflects this subtype’s focus on image, recognition, and social visibility as measures of success",
    },
    {
      title: "My song yo",
      tag: "Song", color: "#FFFFFF",
      url: "https://vt.tiktok.com/ZSbqBCKER/", cta: "Watch on Tiktok →",
      img: "assets/projects/downloadguard.png",
      desc: "Success for my buddies, success for my friends. Success is the only thing I understand Head back home to the place I grew up. Give my medals to the ones that I love.",
    },
  ],

  // Repos already shown in "featured" get hidden from the GitHub feed
  featuredRepoNames: [
    "BritishFingerSpellingAI",
    "Granular-Sentiment-Pipeline-Class-Weighted-Transformers-for-Steam-Reviews",
    "DownloadGuard",
    "organsmnist-cnn-classification",
  ],

  // Shown if the GitHub API can't be reached
  fallbackRepos: [
    {
      name: "crime-analysis-montgomery-county", language: "Jupyter Notebook", stargazers_count: 0,
      html_url: "https://github.com/Omicron69/crime-analysis-montgomery-county",
      description: "Ten years of Montgomery County crime data, taken from a messy 90 MB government CSV to ten answered analytical questions, geospatial hotspot maps and a district safety ranking.",
    },
    {
      name: "asthma-worsening-prediction", language: "MATLAB", stargazers_count: 0,
      html_url: "https://github.com/Omicron69/asthma-worsening-prediction",
      description: "Predicting worsening asthma symptoms from NHS primary-care data with SQL and MATLAB, following CRISP-DM. Compares four models on a heavily imbalanced clinical dataset.",
    },
    {
      name: "Chronic-Kideney-Disease-Analyzer", language: "PHP", stargazers_count: 0,
      html_url: "https://github.com/Omicron69/Chronic-Kideney-Disease-Analyzer",
      description: "A healthcare tracking web app. I led the front-end and requirements analysis in a multidisciplinary team, and our solution improved patient diagnostics by 25%.",
    },
    {
      name: "MSc-Washington-Crime-Analysis-with-Pandas", language: "Jupyter Notebook", stargazers_count: 0,
      html_url: "https://github.com/Omicron69/MSc-Washington-Crime-Analysis-with-Pandas",
      description: "Crime trend analysis of Washington D.C. public data. Reproducible Pandas notebooks with visual summaries written for people who do not code.",
    },
  ],

  // Optional thumbnail overrides: repo name → image path.
  // Anything not listed is looked up at assets/projects/<RepoName>.png
  projectImages: {
    // "DownloadGuard": "assets/projects/downloadguard.png",
  },

  langColors: {
    JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
    PHP: "#4F5D95", CSS: "#663399", HTML: "#e34c26",
    "Jupyter Notebook": "#DA5B0B", MATLAB: "#e16737", Java: "#b07219", C: "#555", "C++": "#f34b7d",
  },

  // ---- Skills screen ----
  skills: [
    { group: "Based on RL", items: [
      ["Social Strategy", 92], ["Image Crafting", 88],
      ["Impression Management", 86], ["Charismatic Presence", 98],
      ["Ambition Mapping", 82], ["Regocnition Drive", 86],
    ]},
    { group: "FACTSSS", items: [
      ["Aura maxxing", 100], ["Social Awareness", 99],
      ["Green", 70], ["Autistic", 0],
      ["Image Continuity", 86], ["Spotlight Navigation", 82],
    ]},
    { group: "Sx5 shit", items: [
      ["Stalker", 20], ["PDF", 30],
      ["Stinky", 0], ["Yandere", 50],
      ["Boring Intj", 1], ["Love fool", 15],
    ]},
    
  ],

  // ---- Data fetching ----
  async fetchRepos() {
    const skip = new Set(this.featuredRepoNames);
    try {
      const res = await fetch(
        `https://api.github.com/users/${this.githubUser}/repos?per_page=100&sort=updated`
      );
      if (!res.ok) throw new Error(res.status);
      const repos = (await res.json()).filter(r => !r.fork && !skip.has(r.name));
      return { repos, live: true };
    } catch {
      return { repos: this.fallbackRepos.filter(r => !skip.has(r.name)), live: false };
    }
  },
};
