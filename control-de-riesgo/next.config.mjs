/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/users/getUsuariosByType2or3",
        destination: "/api/users/GET2",
      },
      {
        source: "/api/users/getUsuariosByType4or5",
        destination: "/api/users/GET3",
      },
    ];
  },
};

export default nextConfig;
