import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: [
    'zenshil.nulltf.dev',
    '192.168.3.106',
    '*.local',
    '*.ngrok-free.app',
    '*.trycloudflare.com',
  ],
};

export default nextConfig;
