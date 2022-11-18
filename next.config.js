/** @type {import('next').NextConfig} */
const { social_links } = require("./constants/default.json");

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

const headers = [
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
];

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["user-images.githubusercontent.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [...socialRedirects, ...otherRedirects];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers,
      },
    ];
  },
};
