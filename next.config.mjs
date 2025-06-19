/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL("https://www.hitachimoneyspotatm.com/**"), new URL("https://toppng.b-cdn.net/**")],
  },
};

export default nextConfig;
