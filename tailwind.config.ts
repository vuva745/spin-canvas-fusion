import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        // Premium Gold System
        gold: {
          DEFAULT: "hsl(var(--gold))",
          bright: "hsl(var(--gold-bright))",
          muted: "hsl(var(--gold-muted))",
          glow: "hsl(var(--gold-glow))",
        },
        
        // 5D Sponsor Wall Colors
        slot: {
          background: "hsl(var(--slot-background))",
          hover: "hsl(var(--slot-background-hover))",
          border: "hsl(var(--slot-border))",
          text: "hsl(var(--slot-text))",
        },
        
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        // 5D Sponsor Wall Animations
        "subtle-spin": {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(1deg) translateX(1px)" },
          "50%": { transform: "rotate(0deg) translateX(0px)" },
          "75%": { transform: "rotate(-1deg) translateX(-1px)" },
          "100%": { transform: "rotate(0deg)" },
        },
        "gold-pulse": {
          "0%, 100%": { 
            boxShadow: "0 0 10px hsl(var(--gold-glow) / 0.3)"
          },
          "50%": { 
            boxShadow: "0 0 20px hsl(var(--gold-glow) / 0.6)"
          },
        },
        "float-gently": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-2px)" },
        },
        "fade-in-up": {
          "0%": { 
            opacity: "0", 
            transform: "translateY(20px)" 
          },
          "100%": { 
            opacity: "1", 
            transform: "translateY(0)" 
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // 5D Sponsor Wall Animations
        "subtle-spin": "subtle-spin 8s infinite ease-in-out",
        "gold-pulse": "gold-pulse 2s infinite ease-in-out",
        "float-gently": "float-gently 4s infinite ease-in-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "spin-float": "subtle-spin 3s infinite ease-in-out, float-gently 4s infinite ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
