/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL("https://www.hitachimoneyspotatm.com/**"),
      new URL("https://toppng.b-cdn.net/**"),
      new URL(
        "https://silver-broccoli-7xqj6567jgvcxv55-4000.app.github.dev/**"
      ),
    ],
  },
};

export default nextConfig;
