import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ── TIPOGRAFÍA ──────────────────────────────────────────
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
        hero: ["clamp(2.5rem, 6vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.04em" }],
        "hero-sm": ["clamp(1.75rem, 4vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.03em",
        tight: "-0.02em",
      },

      // ── COLORES ──────────────────────────────────────────────
      colors: {
        // Neutros base (warm cream — estilo referencia)
        sr: {
          white: "#FFFFFF",
          cream: "#FAF7F2",
          "cream-dark": "#F0EAE0",
          "gray-50": "#F5F0EA",
          "gray-100": "#EAE3D9",
          "gray-200": "#D8CEBC",
          "gray-300": "#B8A98E",
          "gray-400": "#9A8A72",
          "gray-500": "#6B5E4A",
          "gray-600": "#4A3F31",
          "gray-700": "#3A3128",
          "gray-800": "#2A231B",
          "gray-900": "#1C1612",
          black: "#000000",

          // Acento — naranja cálido (estilo referencia)
          accent: "#D97230",
          "accent-light": "#F0945A",
          "accent-dark": "#B85C20",
          "accent-glow": "rgba(217, 114, 48, 0.25)",
          "accent-bg": "rgba(217, 114, 48, 0.08)",

          // Secundario — tierra / dorado
          gold: "#C4972A",
          "gold-light": "#E8BA50",

          // Estado
          success: "#34D399",
          warning: "#FBBF24",
          error: "#F87171",
        },
      },

      // ── SPACING / SIZING ─────────────────────────────────────
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
        "section": "7rem",
        "section-sm": "4rem",
      },
      maxWidth: {
        "8xl": "90rem",
        "9xl": "100rem",
      },

      // ── BORDER RADIUS ────────────────────────────────────────
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      // ── SOMBRAS ──────────────────────────────────────────────
      boxShadow: {
        "card": "0 2px 20px rgba(0, 0, 0, 0.06)",
        "card-hover": "0 8px 40px rgba(0, 0, 0, 0.12)",
        "accent": "0 0 30px rgba(217, 114, 48, 0.20)",
        "accent-lg": "0 0 60px rgba(217, 114, 48, 0.30)",
        "glass": "0 4px 30px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255,255,255,0.7)",
        "warm": "0 4px 24px rgba(93, 64, 30, 0.10)",
      },

      // ── BLUR ─────────────────────────────────────────────────
      backdropBlur: {
        xs: "2px",
        "2xl": "40px",
      },

      // ── ANIMACIONES ──────────────────────────────────────────
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "fade-up": "fadeUp 0.7s ease-out",
        "slide-in-left": "slideInLeft 0.5s ease-out",
        "slide-in-right": "slideInRight 0.5s ease-out",
        "scale-in": "scaleIn 0.4s ease-out",
        "float": "float 3s ease-in-out infinite",
        "gradient-x": "gradientX 4s ease infinite",
        "shimmer": "shimmer 2s infinite linear",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          from: { opacity: "0", transform: "translateX(-30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(30px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.9)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        gradientX: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(124, 58, 237, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(124, 58, 237, 0.6)" },
        },
      },

      // ── TRANSICIONES ─────────────────────────────────────────
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
      },
      transitionTimingFunction: {
        "apple": "cubic-bezier(0.25, 0.1, 0.25, 1)",
        "apple-out": "cubic-bezier(0, 0, 0.3, 1)",
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
