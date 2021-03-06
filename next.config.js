/** @type {import('next').NextConfig} */
const { social_links } = require("./constants/default.json");

const socialRedirects = Object.entries(social_links).map(([s, l]) => {
  return {
    source: `/${s}`,
    destination: l,
    permanent: false,
  };
});

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["user-images.githubusercontent.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [...socialRedirects];
  },
};
