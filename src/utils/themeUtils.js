const destinationThemes = [
  {
    test: /france|paris|lyon|nice|marseille/i,
    name: "France",
    region: "Europe",
    gradient: "from-sky-500 via-white to-red-500",
    accent: "bg-blue-500/10",
    emoji: "🇫🇷",
  },
  {
    test: /japan|tokyo|kyoto|osaka/i,
    name: "Japan",
    region: "Asia",
    gradient: "from-red-500 via-white to-blue-500",
    accent: "bg-red-500/10",
    emoji: "🇯🇵",
  },
  {
    test: /brazil|rio|sao paulo|salvador/i,
    name: "Brazil",
    region: "South America",
    gradient: "from-yellow-400 via-amber-200 to-green-500",
    accent: "bg-emerald-500/10",
    emoji: "🇧🇷",
  },
  {
    test: /india|delhi|mumbai|goa|bangalore/i,
    name: "India",
    region: "Asia",
    gradient: "from-amber-500 via-orange-200 to-rose-500",
    accent: "bg-amber-500/10",
    emoji: "🇮🇳",
  },
  {
    test: /usa|united states|new york|los angeles|miami/i,
    name: "USA",
    region: "North America",
    gradient: "from-sky-600 via-white to-red-500",
    accent: "bg-slate-700/10",
    emoji: "🇺🇸",
  },
];

const defaultTheme = {
  name: "Global",
  region: "World",
  gradient: "from-violet-500 via-fuchsia-400 to-rose-500",
  accent: "bg-violet-500/10",
  emoji: "🌍",
};

export const getDestinationTheme = (destination) => {
  if (!destination || typeof destination !== "string") {
    return defaultTheme;
  }

  const theme = destinationThemes.find((entry) => entry.test.test(destination));
  return theme ?? defaultTheme;
};
