/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "image.tmdb.org",
      },
    ],
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    MOVIEDB_API_KEY: process.env.MOVIEDB_API_KEY,
  },
};

module.exports = nextConfig;
