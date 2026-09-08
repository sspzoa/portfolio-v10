import { defineConfig, presetWind3 } from "unocss";

export default defineConfig({
  content: {
    filesystem: ["./src/**/*.{html,js,ts,jsx,tsx}", "!./src/**/*.test.{ts,tsx}"],
  },
  presets: [presetWind3()],
  shortcuts: {
    "disclosure-summary": [
      "flex w-fit cursor-pointer items-center gap-2 rounded-ui",
      "text-caption text-secondary [transition:color_var(--duration-fast)] before:mr-1 before:block before:size-1.5",
      "before:shrink-0 before:border-current before:border-r before:border-b before:content-empty hover:text-ink",
      "before:[transform:rotate(-45deg)] before:[transition:transform_var(--duration-fast)] [&::-webkit-details-marker]:hidden",
    ],
  },
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
