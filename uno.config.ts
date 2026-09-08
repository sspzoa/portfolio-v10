import { defineConfig, presetWind3 } from "unocss";

export default defineConfig({
  content: {
    filesystem: ["./src/**/*.{html,js,ts,jsx,tsx}", "!./src/**/*.test.{ts,tsx}"],
  },
  presets: [presetWind3()],
  theme: {
    colors: {
      canvas: "var(--canvas)",
      ink: "var(--ink)",
      secondary: "var(--secondary)",
      muted: "var(--muted)",
      line: "var(--line)",
      surface: "var(--surface)",
      "brand-image": "var(--brand-image-canvas)",
      accent: "var(--accent)",
      selection: "var(--selection)",
    },
    fontFamily: {
      sans: "var(--font-body)",
      mono: "var(--font-code)",
    },
    fontSize: {
      profile: ["var(--text-title)", "inherit"],
      section: ["var(--text-heading)", "inherit"],
      copy: ["var(--text-body)", "inherit"],
      caption: ["var(--text-small)", "inherit"],
    },
    spacing: Object.fromEntries(
      [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24].map((space) => [space, `var(--space-${space})`]),
    ),
    borderRadius: { ui: "var(--radius-control)" },
    maxWidth: { reading: "var(--content-width)" },
  },
  rules: [["wrap-anywhere", { "overflow-wrap": "anywhere" }]],
});
