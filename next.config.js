/** @type {import('next').NextConfig} */
const { social_links } = require("./src/constants/default.json");

const socialRedirects = Object.entries(social_links).map(([s, l]) => {
  return {
    source: `/${s}`,
    destination: l,
    permanent: false,
  };
});

const otherRedirects = [
  { source: "/about-us", destination: "/about", permanent: true },
  { source: "/contact-us", destination: "/contact", permanent: true },
];

module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "user-images.githubusercontent.com",
      "https://akulsr0-visitor-badge.glitch.me/",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [...socialRedirects, ...otherRedirects];
  },
};
