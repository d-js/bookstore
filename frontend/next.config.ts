import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
      },
      {
        protocol: "https",
        hostname: "www.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "http",
        hostname: "books.google.com",
        pathname: "/books/content/**",
      },
    ],
  },
};

export default nextConfig;
