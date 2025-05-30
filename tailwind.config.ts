import tailwindTypography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx,module.css}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '475px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      fontSize: {
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        sm: '0 5px 10px rgba(0, 0, 0, 0.12)',
        md: '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
      typography: (theme: any) => ({
        dark: {
          css: {
            color: theme('colors.slate.400'),
            '[class~="lead"]': {
              color: theme('colors.gray.400'),
            },
            a: {
              color: theme('colors.slate.400'),
            },
            strong: {
              color: theme('colors.slate.400'),
            },
            h1: {
              color: theme('colors.slate.400'),
            },
            h2: {
              color: theme('colors.slate.400'),
            },
            h3: {
              color: theme('colors.slate.400'),
            },
            h4: {
              color: theme('colors.slate.400'),
            },
            h5: {
              color: theme('colors.slate.400'),
            },
            h6: {
              color: theme('colors.slate.400'),
            },
            // ...other styles adjustments if needed
          },
        },
      }),
    },
  },
  plugins: [tailwindTypography],
};

export default config;
