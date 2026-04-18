# Design System: Clean Shopper (Seed)
**Source:** Extracted from seed.com  
**Date:** 2026-04-14  |  **Version:** 2.0  |  **Branch:** design/extracted

> This is the canonical token reference. For design rationale and component patterns, see `design.md`. For visual preview, open `design-system.html` in a browser.

---

## Design Direction

Premium, minimal, and nature-forward. Deep forest green (`#1c3a13`) on layered off-whites. Light optical weight typography with tight tracking on large sizes. Buttons are always pill-shaped. Sections are full-bleed with generous vertical rhythm. No drop shadows — depth comes from surface layering only.

---

## Color Tokens

### Primitive Colors

```css
--color-primary-seed-green:       #1c3a13;
--color-primary-soft-green:       #3d5b34;
--color-primary-snow-white:       #fcfcf7;
--color-primary-white:            #ffffff;

--color-neutral-cool-neutral-20:  #f9f9f9;
--color-neutral-cool-neutral-40:  #efefef;
--color-neutral-cool-neutral-60:  #e6e6e6;
--color-neutral-faded-green-20:   #d2d8d0;
--color-neutral-faded-green-40:   #a4b0a1;
--color-neutral-faded-green-60:   #778971;
--color-neutral-foam-white:       #eff1e4;
--color-neutral-yellowish-white:  #f6f7ef;
--color-micronav-green:           #58644c;

--color-guidance-bright-green:    #d3fa99;
--color-guidance-lemongrass:      #e9f0ca;
--color-guidance-error:           #eb5757;
--color-guidance-warning:         #ebb057;
```

### Opacity Variants

```css
--color-primary-seed-green-05:    rgba(28, 58, 19, 0.05);
--color-primary-seed-green-10:    rgba(28, 58, 19, 0.1);
--color-primary-seed-green-15:    rgba(28, 58, 19, 0.15);
--color-primary-seed-green-20:    rgba(28, 58, 19, 0.2);
--color-primary-seed-green-50:    rgba(28, 58, 19, 0.5);
--color-primary-seed-green-70:    rgba(28, 58, 19, 0.7);

--color-neutral-frosted-glass-08: rgba(87, 94, 85, 0.08);
--color-neutral-frosted-glass-35: rgba(87, 94, 85, 0.35);

--color-dark-30:                  rgba(0, 0, 0, 0.3);
--color-light-10:                 rgba(255, 255, 255, 0.1);
```

### Semantic Tokens

```css
--text-primary:            var(--color-primary-seed-green);       /* #1c3a13 */
--text-secondary:          var(--color-primary-seed-green-70);    /* rgba(28,58,19,0.7) */
--text-inverse-primary:    var(--color-primary-snow-white);       /* #fcfcf7 */
--text-inverse-secondary:  rgba(252, 252, 247, 0.7);
--text-disabled:           var(--color-primary-seed-green-50);
--text-error:              var(--color-guidance-error);           /* #eb5757 */
--text-warning:            var(--color-guidance-warning);         /* #ebb057 */

--fill-brand:          var(--color-primary-seed-green);
--fill-brand-subtle:   var(--color-primary-soft-green);
--fill-bright:         var(--color-primary-white);
--fill-primary:        var(--color-primary-snow-white);           /* default surface */
--fill-secondary:      var(--color-neutral-yellowish-white);      /* #f6f7ef */
--fill-tertiary:       var(--color-neutral-foam-white);           /* #eff1e4 */
--fill-neutral-light:  var(--color-neutral-cool-neutral-20);
--fill-neutral-medium: var(--color-neutral-cool-neutral-40);
--fill-neutral-dark:   var(--color-neutral-cool-neutral-60);

--stroke-default: 0.0625rem;  /* 1px */
```

### Surface Hierarchy

Depth is expressed through background tone, never shadows:

| Layer | Token | Value |
|---|---|---|
| 1 (brightest) | `--fill-bright` | `#ffffff` |
| 2 | `--fill-primary` | `#fcfcf7` — default page bg |
| 3 | `--fill-secondary` | `#f6f7ef` |
| 4 | `--fill-tertiary` | `#eff1e4` |

---

## Typography Tokens

### Font Families

```css
--font-family-sans: Inter, Helvetica, system-ui, sans-serif;
--font-family-mono: 'JetBrains Mono', ui-monospace, monospace;
```

> Seed.com uses a proprietary typeface (Seed Sans, weight axis 300–500 with a custom 350 stop). Inter is the closest freely available substitute.

### Font Size Scale

```css
--font-size-250:  0.625rem;   /*  10px */
--font-size-300:  0.75rem;    /*  12px — eyebrow / label */
--font-size-350:  0.875rem;   /*  14px — small body, nav */
--font-size-400:  1rem;       /*  16px — body */
--font-size-450:  1.125rem;   /*  18px */
--font-size-500:  1.25rem;    /*  20px */
--font-size-600:  1.5rem;     /*  24px — sub-heading */
--font-size-800:  2rem;       /*  32px — heading S */
--font-size-1000: 2.5rem;     /*  40px — heading M */
--font-size-1200: 3rem;       /*  48px — heading L / display */
--font-size-1600: 4rem;       /*  64px — hero display */
```

### Font Weights

```css
--font-weight-300: 300;   /* light */
--font-weight-350: 350;   /* default — body and headings */
--font-weight-400: 400;   /* regular — nav, UI labels */
--font-weight-500: 500;   /* medium — eyebrows, emphasized labels */
```

### Heading Specs

| Level | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|
| Display / H1 | 48px | 350 | 1.1 | -0.025em |
| H2 | 40px | 350 | 1.1 | -0.01em |
| H3 | 32px | 350 | 1.1 | -0.0125em |
| H4 / Sub-heading | 24px | 350 | 1.2 | -0.015em |
| Eyebrow | 12px | 500 | 1.1 | 0.08em + uppercase |

### Body Text

```
font-size:      16px
font-weight:    350
line-height:    1.3
letter-spacing: -0.01em
color:          var(--text-primary)
```

---

## Spacing Tokens

### Base Scale

```css
--size-025:  0.0625rem;  /*   1px */
--size-050:  0.125rem;   /*   2px */
--size-100:  0.25rem;    /*   4px */
--size-200:  0.5rem;     /*   8px */
--size-300:  0.75rem;    /*  12px */
--size-400:  1rem;       /*  16px */
--size-600:  1.5rem;     /*  24px */
--size-800:  2rem;       /*  32px */
--size-1000: 2.5rem;     /*  40px */
--size-1200: 3rem;       /*  48px */
--size-1400: 3.5rem;     /*  56px */
--size-1600: 4rem;       /*  64px */
--size-1800: 4.5rem;     /*  72px */
--size-2000: 5rem;       /*  80px */
--size-2500: 6.25rem;    /* 100px */
```

### Named Aliases

```css
--spacing-4:  4px    --spacing-8:  8px    --spacing-16: 16px
--spacing-24: 24px   --spacing-32: 32px   --spacing-40: 40px
--spacing-48: 48px   --spacing-56: 56px   --spacing-64: 64px
--spacing-80: 80px
```

### Component Spacing

```css
--nav-height:         3rem;    /*  48px */
--page-grid-margin:   1rem;    /*  16px */
--space-gutter:       1.25rem; /*  20px */
--section-padding-y:  3.5rem;  /*  56px */
--section-padding-y-lg: 5rem;  /*  80px */
--card-padding:       2.5rem;  /*  40px */
```

---

## Border Radius Tokens

```css
--radius-xs:   4px;    /* small UI elements */
--radius-sm:   8px;    /* tags, chips */
--radius-md:   16px;   /* cards */
--radius-lg:   24px;   /* large cards */
--radius-xl:   32px;   /* section top corners */
--radius-full: 999px;  /* buttons, badges — pill */
```

**Rules:** Buttons are always `--radius-full`. Cards use `--radius-md`. Section stack effect: `border-radius: 32px 32px 0 0` (top only).

---

## Button Tokens

| Variant | Background | Text | Padding | Font Size |
|---|---|---|---|---|
| Primary large | `#1c3a13` | `#fcfcf7` | `16px 24px` | 16px / 350 |
| Primary small | `#1c3a13` | `#fcfcf7` | `10px 16px` | 14px / 350 |
| Inverse | `#fcfcf7` | `#1c3a13` | `16px 24px` | 16px / 350 |
| Ghost / Frosted | `rgba(87,94,85,0.35)` | `#fcfcf7` | `6px 12px` | 16px / 400 |
| Dark overlay | `rgba(0,0,0,0.3)` | `#fcfcf7` | `16px 24px` | 16px / 350 |

No border/outline buttons. No square buttons.

---

## Layout

```
Grid:          4-column fluid
Gutter:        20px
Page margin:   16px
Nav height:    48px
Content width: ~1032px
```

Full-bleed sections. Stacked card effect via `border-radius: 32px 32px 0 0`. No `box-shadow` tokens in the system.
