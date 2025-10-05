import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "framework": '@storybook/nextjs',
  "staticDirs": [
    "../public"
  ]
};
export default config;