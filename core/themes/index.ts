'use client';

import {
  createTheme,
  darken,
  defaultVariantColorsResolver,
  parseThemeColor,
  rem,
  rgba,
} from '@mantine/core';

const ERROR_STYLES = {
  error: {
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    borderRadius: '0.375rem',
  },
};

const isIPhone = typeof window !== 'undefined' ? /iPhone|iPod/.test(navigator.userAgent) : false;

export const theme = createTheme({
  variantColorResolver: (input) => {
    const defaultResolvedColors = defaultVariantColorsResolver(input);
    const parsedColor = parseThemeColor({
      color: input.color || input.theme.primaryColor,
      theme: input.theme,
    });

    if (parsedColor.isThemeColor && parsedColor.color === 'lime' && input.variant === 'filled') {
      return {
        ...defaultResolvedColors,
        color: 'var(--mantine-color-black)',
        hoverColor: 'var(--mantine-color-black)',
      };
    }

    if (input.variant === 'light') {
      return {
        background: rgba(parsedColor.value, 0.1),
        hover: rgba(parsedColor.value, 0.15),
        border: `${rem(1)} solid ${parsedColor.value}`,
        color: darken(parsedColor.value, 0.1),
      };
    }

    if (input.variant === 'danger') {
      return {
        background: 'var(--mantine-color-red-9)',
        hover: 'var(--mantine-color-red-8)',
        color: 'var(--mantine-color-white)',
        border: 'none',
      };
    }

    return defaultResolvedColors;
  },
  fontFamily: 'var(--cropx-font-body)',
  headings: {
    fontFamily: 'var(--cropx-font-heading)',
    fontWeight: '700',
    sizes: {
      h1: { fontSize: 'var(--cropx-text-display)', lineHeight: '1.12', fontWeight: '700' },
      h2: { fontSize: 'var(--cropx-text-h2)', lineHeight: '1.2', fontWeight: '700' },
      h3: { fontSize: 'var(--cropx-text-h3)', lineHeight: '1.3', fontWeight: '600' },
    },
  },
  primaryColor: 'primary',
  defaultRadius: 'md',
  shadows: {
    md: '0 1px 3px rgba(12, 31, 20, 0.06)',
    xl: '0 8px 24px rgba(12, 31, 20, 0.08)',
  },
  other: {
    cream: '#f7f4ee',
    borderWarm: '#e8e4dc',
    ink: '#0c1f14',
    contentMaxWidth: 1200,
    sectionPy: 'clamp(3.5rem, 6vw, 5.5rem)',
    scrimBottom:
      'linear-gradient(to top, rgba(12, 31, 20, 0.92) 0%, rgba(12, 31, 20, 0.65) 35%, rgba(12, 31, 20, 0.15) 70%, rgba(12, 31, 20, 0) 100%)',
    scrimFull: 'linear-gradient(to top, rgba(12, 31, 20, 0.88) 0%, rgba(12, 31, 20, 0.55) 100%)',
    scrimSide:
      'linear-gradient(to right, rgba(12, 31, 20, 0.9) 0%, rgba(12, 31, 20, 0.6) 45%, rgba(12, 31, 20, 0.1) 100%)',
  },
  colors: {
    primary: [
      '#e8f5ee',
      '#c5e6d4',
      '#9fd4b8',
      '#6fbf96',
      '#3da872',
      '#1a8f57',
      '#006838',
      '#005a30',
      '#004a28',
      '#003a1f',
    ],
    accent: [
      '#fdf6e3',
      '#f9e9bf',
      '#f4d98f',
      '#eec95e',
      '#e8bb38',
      '#d9a520',
      '#bd8b13',
      '#966c0d',
      '#6f4f09',
      '#4a3405',
    ],
    cream: [
      '#fdfcfa',
      '#f7f4ee',
      '#f0ebe3',
      '#e8e2d8',
      '#dfd8cc',
      '#d5cdc0',
      '#cbc3b4',
      '#c1b8a8',
      '#b7ad9c',
      '#ada290',
    ],
    'text-color': [
      '#7E7E80',
      '#aab0b5',
      '#808991',
      '#56626c',
      '#667085',
      '#62738D',
      '#01101c',
      '#010d17',
      '#010a11',
      '#00060b',
      '#000407',
    ],
    'error-color': [
      '#9E2B25',
      '#9E2B25',
      '#9E2B25',
      '#9E2B25',
      '#9E2B25',
      '#9E2B25',
      '#9E2B25',
      '#9E2B25',
      '#9E2B25',
      '#9E2B25',
    ],
    'border-color': [
      '#EDEDF4',
      '#EDEDF4',
      '#EDEDF4',
      '#EDEDF4',
      '#EDEDF4',
      '#EDEDF4',
      '#EDEDF4',
      '#EDEDF4',
      '#EDEDF4',
      '#EDEDF4',
    ],
  },
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
        fw: 600,
      },
      styles: {
        root: {
          '&:active': {
            transform: 'none',
          },
        },
      },
    },
    Card: {
      defaultProps: {
        radius: 'md',
        withBorder: true,
      },
      styles: {
        root: {
          borderColor: 'var(--cropx-border-warm)',
          boxShadow: 'none',
        },
      },
    },
    Title: {
      styles: {
        root: {
          letterSpacing: '-0.02em',
        },
      },
    },
    TextInput: {
      defaultProps: {
        radius: 'md',
        fontSize: '16px',
      },
      styles: {
        ...ERROR_STYLES,
        label: {
          fontWeight: 500,
          color: '#3C3C3D',
          fontSize: '14px',
          marginBottom: '0.3rem',
        },
        input: {
          fontSize: isIPhone ? '1rem' : '0.9375rem',
          borderColor: 'var(--cropx-border-warm) !important',
        },
      },
    },
    Select: {
      defaultProps: {
        radius: 'md',
        fontSize: '16px',
      },
      styles: {
        ...ERROR_STYLES,
        label: {
          fontWeight: 500,
          color: '#3C3C3D',
          fontSize: '14px',
          marginBottom: '0.3rem',
        },
        input: {
          fontSize: isIPhone ? '1rem' : '0.9375rem',
          borderColor: 'var(--cropx-border-warm) !important',
        },
      },
    },
    NumberInput: {
      defaultProps: {
        radius: 'md',
      },
      styles: {
        label: {
          fontWeight: 500,
          fontSize: '14px',
        },
        input: {
          borderColor: 'var(--cropx-border-warm) !important',
        },
      },
    },
    Text: {
      styles: {
        root: {
          lineHeight: 1.6,
        },
      },
    },
    Drawer: {
      defaultProps: {
        position: 'right',
      },
    },
  },
});
