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
    "rail-grid": "lg:grid lg:grid-cols-rail lg:gap-x-12",
    "tap-target": "inline-flex min-h-9 items-center py-1",
    "button-primary": [
      "group inline-flex min-h-12 items-center gap-2 rounded-ui bg-ink px-5 font-semibold text-canvas no-underline",
      "[transition:background-color_var(--duration-fast),color_var(--duration-fast)] hover:bg-accent hover:text-on-accent",
    ],
    "entry-title": "break-anywhere break-keep font-semibold text-copy text-ink tracking-[-0.015em]",
    reveal: "motion-safe:supports-timeline:animate-reveal",
    disclosure: [
      "[&[open]>summary::before]:[transform:translateY(-2px)_rotate(45deg)] [&[open]>summary]:text-ink",
      "motion-safe:[&[open]>:not(summary)]:animate-disclosure-in",
    ],
    "disclosure-summary": [
      "flex cursor-pointer items-center gap-2 text-secondary hover:text-ink",
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
      tile: { DEFAULT: "var(--tile)", line: "var(--tile-line)" },
      accent: "var(--accent)",
      "on-accent": "var(--on-accent)",
    },
    fontFamily: { mono: "var(--font-code)" },
    fontSize: {
      display: ["var(--text-display)", "1.1", "-0.045em"],
      profile: ["var(--text-title)", "1.3", "-0.03em"],
      lead: ["var(--text-lead)", "1.6"],
      section: ["var(--text-heading)", "inherit"],
      copy: ["var(--text-body)", "inherit"],
      caption: ["var(--text-small)", "inherit", "0"],
    },
    spacing: Object.fromEntries([1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 24].map((space) => [space, `var(--space-${space})`])),
    borderRadius: { ui: "var(--radius-control)", tile: "var(--radius-tile)" },
    maxWidth: { reading: "var(--content-width)", wide: "var(--wide-width)" },
    gridTemplateColumn: { rail: "var(--rail-width) minmax(0, 1fr)" },
    breakpoints: { sm: "40rem", lg: "64rem" },
    supports: { timeline: "(animation-timeline: view())" },
    animation: {
      keyframes: {
        "logo-refine": "{from{transform:scale(1.4142)}to{transform:none}}",
        "section-rule": "{from{transform:scaleX(0)}to{transform:scaleX(1)}}",
        reveal: "{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}",
        rise: "{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}",
        "disclosure-in": "{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}",
      },
      durations: {
        "logo-refine": "0.9s",
        "section-rule": "1ms",
        reveal: "1ms",
        rise: "var(--duration-slow)",
        "disclosure-in": "var(--duration-base)",
      },
      timingFns: {
        "logo-refine": "var(--ease-out)",
        "section-rule": "linear",
        reveal: "var(--ease-out)",
        rise: "var(--ease-out)",
        "disclosure-in": "var(--ease-out)",
      },
      properties: {
        "logo-refine": { "animation-fill-mode": "backwards" },
        "section-rule": {
          ...fillBoth,
          "animation-timeline": "--section",
          "animation-range": "cover 32px cover min(240px, 60svh)",
        },
        reveal: {
          ...fillBoth,
          "animation-timeline": "view()",
          "animation-range": "entry 0px entry 120px",
        },
        rise: fillBoth,
        "disclosure-in": fillBoth,
      },
    },
  },
  rules: [["section-timeline", { "view-timeline": "--section block" }]],
});
