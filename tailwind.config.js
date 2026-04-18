/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      // Primitive palette
      'seed-green':        '#1c3a13',
      'soft-green':        '#3d5b34',
      'snow-white':        '#fcfcf7',
      'white':             '#ffffff',
      'cool-neutral-20':   '#f9f9f9',
      'cool-neutral-40':   '#efefef',
      'cool-neutral-60':   '#e6e6e6',
      'faded-green-20':    '#d2d8d0',
      'faded-green-40':    '#a4b0a1',
      'faded-green-60':    '#778971',
      'foam-white':        '#eff1e4',
      'yellowish-white':   '#f6f7ef',
      'micronav-green':    '#58644c',
      'bright-green':      '#d3fa99',
      'lemongrass':        '#e9f0ca',
      'error':             '#eb5757',
      'warning':           '#ebb057',

      // Opacity variants (seed green)
      'seed-green-05':  'rgba(28, 58, 19, 0.05)',
      'seed-green-10':  'rgba(28, 58, 19, 0.1)',
      'seed-green-15':  'rgba(28, 58, 19, 0.15)',
      'seed-green-20':  'rgba(28, 58, 19, 0.2)',
      'seed-green-50':  'rgba(28, 58, 19, 0.5)',
      'seed-green-70':  'rgba(28, 58, 19, 0.7)',

      // Frosted glass
      'frosted-08': 'rgba(87, 94, 85, 0.08)',
      'frosted-35': 'rgba(87, 94, 85, 0.35)',

      // Dark / light overlays
      'dark-30':  'rgba(0, 0, 0, 0.3)',
      'light-10': 'rgba(255, 255, 255, 0.1)',

      // Utilities
      transparent: 'transparent',
      current: 'currentColor',
    },

    fontFamily: {
      sans: ['Inter', 'Helvetica', 'system-ui', 'sans-serif'],
      mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
    },

    fontSize: {
      '250': ['0.625rem',  { lineHeight: '1.1' }],            // 10px
      '300': ['0.75rem',   { lineHeight: '1.1' }],            // 12px
      '350': ['0.875rem',  { lineHeight: '1.3' }],            // 14px
      '400': ['1rem',      { lineHeight: '1.3', letterSpacing: '-0.01em' }], // 16px body
      '450': ['1.125rem',  { lineHeight: '1.3' }],            // 18px
      '500': ['1.25rem',   { lineHeight: '1.2' }],            // 20px
      '600': ['1.5rem',    { lineHeight: '1.2', letterSpacing: '-0.015em' }], // 24px
      '800': ['2rem',      { lineHeight: '1.1', letterSpacing: '-0.0125em' }], // 32px
      '1000': ['2.5rem',   { lineHeight: '1.1', letterSpacing: '-0.01em' }],  // 40px
      '1200': ['3rem',     { lineHeight: '1.1', letterSpacing: '-0.015em' }], // 48px
      '1600': ['4rem',     { lineHeight: '1.05', letterSpacing: '-0.025em' }], // 64px
    },

    fontWeight: {
      light:   '300',
      default: '350',
      normal:  '400',
      medium:  '500',
    },

    spacing: {
      0:    '0px',
      px:   '1px',
      '025': '0.0625rem',  //  1px
      '050': '0.125rem',   //  2px
      '100': '0.25rem',    //  4px
      '200': '0.5rem',     //  8px
      '300': '0.75rem',    // 12px
      '400': '1rem',       // 16px
      '600': '1.5rem',     // 24px
      '800': '2rem',       // 32px
      '1000': '2.5rem',    // 40px
      '1200': '3rem',      // 48px
      '1400': '3.5rem',    // 56px
      '1600': '4rem',      // 64px
      '1800': '4.5rem',    // 72px
      '2000': '5rem',      // 80px
      '2500': '6.25rem',   // 100px
    },

    borderRadius: {
      none: '0px',
      xs:   '4px',
      sm:   '8px',
      md:   '16px',
      lg:   '24px',
      xl:   '32px',
      full: '999px',
    },

    boxShadow: {
      none: 'none',
    },

    extend: {
      maxWidth: {
        content: '1032px',
      },
      height: {
        nav: '48px',
      },
    },
  },
};
