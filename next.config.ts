
import withPWA from "next-pwa";

const withPWAConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "quotetobind-hxf4euawe9gbf0g3.centralindia-01.azurewebsites.net",
      "images.unsplash.com"
    ],
  },
};

export default withPWAConfig(nextConfig);