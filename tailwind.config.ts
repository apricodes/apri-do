import type { Config } from "tailwindcss";
import daisyui from 'daisyui';

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {},

  },
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#0083ff",

          "secondary": "#0096ff",

          "accent": "#7a8f00",

          "neutral": "#0d0a0e",

          "base-100": "#ffffff",

          "info": "#22c3ff",

          "success": "#28af30",

          "warning": "#e2a000",

          "error": "#ed0041",
        },
      },
    ],
  },

  plugins: [daisyui],
} as Config;
