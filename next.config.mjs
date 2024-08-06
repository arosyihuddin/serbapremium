import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: "removeViewBox",
                  active: false,
                },
              ],
            },
          },
        },
      ],
    });

    // Tambahkan alias resolusi
    config.resolve.alias = {
      ...config.resolve.alias,
      components: path.resolve("components"),
      data: path.resolve("data"),
      hooks: path.resolve("hooks"),
      styles: path.resolve("styles"),
    };

    return config;
  },
};

export default nextConfig;
