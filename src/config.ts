import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://astro-paper.pages.dev/", // replace this with your deployed domain
  author: "Yug Jadvani",
  profile: "https://yugjadvani.vercel.app/",
  desc: "A minimal, responsive and SEO-friendly Astro blog theme.",
  title: "DevInsight",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 3,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/yugjadvani-dev",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/yug.jadvani.1",
    linkTitle: `${SITE.title} on Facebook`,
    active: true,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/yugjadvani_09",
    linkTitle: `${SITE.title} on Instagram`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/yug-jadvani",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:yugjadvani@gmail.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: false,
  },
  {
    name: "Twitter",
    href: "https://x.com/jadvani_yug",
    linkTitle: `${SITE.title} on Twitter`,
    active: false,
  },
  // {
  //   name: "Twitch",
  //   href: "",
  //   linkTitle: `${SITE.title} on Twitch`,
  //   active: false,
  // },
  // {
  //   name: "YouTube",
  //   href: "",
  //   linkTitle: `${SITE.title} on YouTube`,
  //   active: false,
  // },
  // {
  //   name: "WhatsApp",
  //   href: "",
  //   linkTitle: `${SITE.title} on WhatsApp`,
  //   active: false,
  // },
  // {
  //   name: "Snapchat",
  //   href: "",
  //   linkTitle: `${SITE.title} on Snapchat`,
  //   active: false,
  // },
  // {
  //   name: "Pinterest",
  //   href: "",
  //   linkTitle: `${SITE.title} on Pinterest`,
  //   active: false,
  // },
  // {
  //   name: "TikTok",
  //   href: "",
  //   linkTitle: `${SITE.title} on TikTok`,
  //   active: false,
  // },
  {
    name: "CodePen",
    href: "https://codepen.io/yug-jadvani",
    linkTitle: `${SITE.title} on CodePen`,
    active: false,
  },
  {
    name: "Discord",
    href: "",
    linkTitle: `${SITE.title} on Discord`,
    active: false,
  },
  {
    name: "GitLab",
    href: "",
    linkTitle: `${SITE.title} on GitLab`,
    active: false,
  },
  {
    name: "Reddit",
    href: "https://www.reddit.com/user/Level_Painting_666/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button",
    linkTitle: `${SITE.title} on Reddit`,
    active: false,
  },
  // {
  //   name: "Skype",
  //   href: "",
  //   linkTitle: `${SITE.title} on Skype`,
  //   active: false,
  // },
  // {
  //   name: "Steam",
  //   href: "",
  //   linkTitle: `${SITE.title} on Steam`,
  //   active: false,
  // },
  // {
  //   name: "Telegram",
  //   href: "",
  //   linkTitle: `${SITE.title} on Telegram`,
  //   active: false,
  // },
  // {
  //   name: "Mastodon",
  //   href: "",
  //   linkTitle: `${SITE.title} on Mastodon`,
  //   active: false,
  // },
];
