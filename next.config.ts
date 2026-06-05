// import type { NextConfig } from "next";
// import withPWAInit from "next-pwa";

// const withPWA = withPWAInit({
//   dest: "public",
//   register: true,
//   skipWaiting: true,
// });

// const nextConfig: NextConfig = {
//   images: {
//     domains: [
//       "quotetobind-hxf4euawe9gbf0g3.centralindia-01.azurewebsites.net",
//       "images.unsplash.com",
//     ],
//   },
  
//   eslint: {
//     ignoreDuringBuilds: true,
//   },

// };

// export default withPWA(nextConfig as any);
// ``

import type { NextConfig } from "next";
import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  images: {
    domains: [
      "quotetobind-hxf4euawe9gbf0g3.centralindia-01.azurewebsites.net",
      "images.unsplash.com",
    ],
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate',
          },
        ],
      },
    ];
  },

};

export default withPWA(nextConfig as any);