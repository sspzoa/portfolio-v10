import { cssIdRE, defineConfig, presetWind3 } from "unocss";

const fillBoth = { "animation-fill-mode": "both" };

export default defineConfig({
  content: {
    filesystem: ["./src/**/*.tsx"],
    pipeline: { exclude: [cssIdRE, /node_modules/] },
  },
  presets: [presetWind3()],
  shortcuts: {
    "page-column": "mx-auto w-full max-w-reading px-6 max-sm:px-5",
    "tap-target": "inline-flex min-h-9 items-center py-1",
    "entry-title": "break-anywhere break-keep font-semibold text-copy text-ink tracking-[-0.015em]",
    disclosure: [
      "[&[open]>summary::before]:[transform:translateY(-2px)_rotate(45deg)] [&[open]>summary]:text-ink",
      "motion-safe:[&[open]>:not(summary)]:animate-disclosure-in",
    ],
    "disclosure-summary": [
      "flex w-fit cursor-pointer items-center gap-2 text-caption text-secondary hover:text-ink",
      "[transition:color_var(--duration-fast)] [&::-webkit-details-marker]:hidden",
      "before:mr-1 before:block before:size-1.5 before:shrink-0 before:border-current before:border-r before:border-b",
      "before:content-empty before:[transform:rotate(-45deg)] before:[transition:transform_var(--duration-fast)]",
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
      accent: "var(--accent)",
    },
    fontFamily: { mono: "var(--font-code)" },
    fontSize: {
      profile: ["var(--text-title)", "1.3", "-0.03em"],
      section: ["var(--text-heading)", "inherit"],
      copy: ["var(--text-body)", "inherit"],
      caption: ["var(--text-small)", "inherit"],
    },
    spacing: Object.fromEntries([1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 24].map((space) => [space, `var(--space-${space})`])),
    borderRadius: { ui: "var(--radius-control)" },
    maxWidth: { reading: "var(--content-width)" },
    breakpoints: { sm: "40rem" },
    supports: { timeline: "(animation-timeline: view())" },
    animation: {
      keyframes: {
        "logo-refine": "{from{transform:scale(1.4142)}to{transform:none}}",
        "section-rule": "{from{transform:scaleX(0)}to{transform:scaleX(1)}}",
        rise: "{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}",
        "disclosure-in": "{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}",
      },
      durations: {
        "logo-refine": "0.9s",
        "section-rule": "1ms",
        rise: "var(--duration-slow)",
        "disclosure-in": "var(--duration-base)",
      },
      timingFns: {
        "logo-refine": "var(--ease-out)",
        "section-rule": "linear",
        rise: "var(--ease-out)",
        "disclosure-in": "var(--ease-out)",
      },
      properties: {
        "logo-refine": fillBoth,
        "section-rule": {
          ...fillBoth,
          "animation-timeline": "--section",
          "animation-range": "cover 32px cover min(240px, 60svh)",
        },
        rise: fillBoth,
        "disclosure-in": fillBoth,
      },
    },
  },
  rules: [["section-timeline", { "view-timeline": "--section block" }]],
});
