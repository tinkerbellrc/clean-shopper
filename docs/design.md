# Rayum Design System
**Version:** 1.0  |  **Date:** 2026-04-14  |  **Source:** Figma — Rayum_Design_System  |  **Platform:** Web

---

## Overview

Rayum is a comprehensive, production-ready design system built on a two-brand color architecture (green primary, blue secondary), a dark-anchored neutral scale, full light/dark mode support, and a clear token hierarchy. It is the visual foundation for Clean Shopper.

---

## Color Architecture

The color system has three layers:

1. **Color Primitives** — Raw hex values for every hue step. Never use directly in components.
2. **Semantic tokens** — Meaning-bearing aliases (`background/default`, `foreground/muted`, etc.). Use these in all component code.
3. **Component tokens** — Role-specific aliases tied to component states (`button/primary/bg`, etc.).

---

## Color Primitives

### Brand — Primary (Green)

| Variable | Hex |
|----------|-----|
| `--color-brand-primary-10` | `#f1fff4` |
| `--color-brand-primary-20` | `#c6ffd2` |
| `--color-brand-primary-30` | `#9cffb1` |
| `--color-brand-primary-40` | `#70fc8e` |
| `--color-brand-primary-50` | `#5cdf78` ← base |
| `--color-brand-primary-60` | `#4ac263` |
| `--color-brand-primary-70` | `#39a550` |
| `--color-brand-primary-80` | `#2b873f` |
| `--color-brand-primary-90` | `#1e6a2f` |
| `--color-brand-primary-100` | `#07200c` |

### Brand — Secondary (Blue)

| Variable | Hex |
|----------|-----|
| `--color-brand-secondary-10` | `#ebf0ff` |
| `--color-brand-secondary-20` | `#beceff` |
| `--color-brand-secondary-30` | `#92acff` |
| `--color-brand-secondary-40` | `#658aff` |
| `--color-brand-secondary-50` | `#3765f6` ← base |
| `--color-brand-secondary-60` | `#244fd4` |
| `--color-brand-secondary-70` | `#153bb2` |
| `--color-brand-secondary-80` | `#092a90` |
| `--color-brand-secondary-90` | `#011c6e` |
| `--color-brand-secondary-100` | `#011040` |

### Neutral

| Variable | Hex |
|----------|-----|
| `--color-neutral-10` | `#ffffff` |
| `--color-neutral-15` | `#f6f7f9` |
| `--color-neutral-20` | `#edf0f2` |
| `--color-neutral-25` | `#e1e5ea` |
| `--color-neutral-30` | `#d3dbe4` |
| `--color-neutral-35` | `#c3ced7` |
| `--color-neutral-40` | `#b0becb` |
| `--color-neutral-50` | `#929fb1` |
| `--color-neutral-60` | `#606e80` |
| `--color-neutral-70` | `#404b5a` |
| `--color-neutral-80` | `#2f3b4c` |
| `--color-neutral-85` | `#27313f` |
| `--color-neutral-90` | `#1f2633` |
| `--color-neutral-95` | `#181d25` |
| `--color-neutral-100` | `#0a0d11` |

### Functional

| Hue | 10 (tint) | 60 (base) | 100 (dark) |
|-----|-----------|-----------|------------|
| Blue (info) | `#e5f1ff` | `#0070f3` | `#002249` |
| Red (danger) | `#ffeded` | `#e53e3e` | `#450000` |
| Green (success) | `#effaf0` | `#60cc65` | `#0b310c` |
| Yellow (warning) | `#fffaea` | `#ffcb2c` | `#403000` |
| Orange (caution) | `#fff1e5` | `#f07000` | `#431f00` |

---

## Semantic Tokens

### Background

| Token | Light Mode → | Dark Mode → | Usage |
|-------|-------------|-------------|-------|
| `--bg-default` | `--color-neutral-10` | `--color-neutral-100` | Main page canvas |
| `--bg-muted` | `--color-neutral-15` | `--color-neutral-90` | Secondary surfaces |
| `--bg-inset` | `--color-neutral-15` | `--color-neutral-95` | Input fields, inset areas |
| `--bg-inverse` | `--color-neutral-95` | `--color-neutral-10` | Inverse surfaces |
| `--bg-overlay` | `--color-neutral-10` | `--color-neutral-90` | Modals, floating panels |
| `--bg-neutral-emphasis` | `--color-neutral-35` | `--color-neutral-80` | Neutral chips, tags |
| `--bg-neutral-muted` | `--color-neutral-25` | `--color-neutral-85` | Subtle neutral fills |
| `--bg-accent-emphasis` | `--color-brand-primary-40` | `--color-brand-primary-40` | Accent badges |
| `--bg-accent-muted` | `--color-brand-primary-10` | `--color-brand-primary-100` | Accent tint backgrounds |
| `--bg-brand-primary` | `--color-brand-primary-40` | `--color-brand-primary-40` | Brand-colored surfaces |
| `--bg-brand-secondary` | `--color-brand-secondary-50` | `--color-brand-secondary-40` | Secondary brand fills |
| `--bg-brand-tertiary` | `--color-brand-secondary-20` | `--color-brand-secondary-100` | Tertiary brand tints |

### Foreground

| Token | Light Mode → | Dark Mode → | Usage |
|-------|-------------|-------------|-------|
| `--fg-default` | `--color-neutral-100` | `--color-neutral-20` | Primary text |
| `--fg-muted` | `--color-neutral-60` | `--color-neutral-50` | Secondary text, captions |
| `--fg-inverse` | `--color-neutral-10` | `--color-neutral-95` | Text on dark surfaces |
| `--fg-accent` | `--color-brand-primary-50` | `--color-brand-primary-40` | Accent text |
| `--fg-brand-primary` | `--color-brand-primary-60` | `--color-brand-primary-40` | Brand text |
| `--fg-brand-secondary` | `--color-brand-secondary-60` | `--color-brand-secondary-40` | Secondary brand text |

### Border

| Token | Light Mode → | Dark Mode → | Usage |
|-------|-------------|-------------|-------|
| `--border-default` | `--color-neutral-35` | `--color-neutral-80` | Standard borders |
| `--border-muted` | `--color-neutral-50` | `--color-neutral-80` | Subtle borders |
| `--border-muted-input` | `--color-neutral-30` | `--color-neutral-85` | Input field borders |
| `--border-accent` | `--color-brand-primary-40` | `--color-brand-primary-40` | Focus rings, accents |
| `--border-brand-secondary` | `--color-brand-secondary-50` | `--color-brand-secondary-40` | Brand borders |

### Action States

#### Primary Button

| State | BG | Border | FG |
|-------|----|--------|----|
| Default | `neutral-95` | `neutral-95` | `neutral-10` |
| Hover | `neutral-90` | `neutral-90` | `neutral-10` |
| Pressed | `neutral-100` | `neutral-100` | `neutral-10` |
| Disabled | `neutral-35` | `neutral-35` | `neutral-60` |

#### Secondary Button

| State | BG | Border | FG |
|-------|----|--------|----|
| Default | transparent | `neutral-40` | `neutral-95` |
| Hover | alpha-black/4 | `neutral-40` | `neutral-95` |
| Pressed | transparent | `neutral-60` | `neutral-100` |
| Disabled | transparent | `neutral-35` | `neutral-60` |

#### Tertiary / Ghost Button

| State | BG | FG |
|-------|----|----|
| Default | transparent | `neutral-95` |
| Hover | alpha-black/4 | `neutral-95` |
| Pressed | transparent | `neutral-100` |
| Disabled | transparent | `neutral-60` |

#### Danger Button

| State | BG | FG |
|-------|----|----|
| Default | `red-60` | `neutral-10` |
| Hover | `red-70` | `neutral-10` |
| Pressed | `red-60` | `neutral-10` |

### Focus

| Token | Value |
|-------|-------|
| `--focus-ring` | `--color-brand-primary-40` `#70fc8e` |
| `--focus-center` | Light: `--color-brand-primary-10` / Dark: `--color-brand-primary-100` |

### Feedback / Support

| Role | Emphasis BG | Muted BG (light) | Muted BG (dark) | FG (light) | FG (dark) |
|------|------------|-----------------|-----------------|------------|-----------|
| Info | `blue-60` `#0070f3` | `blue-10` `#e5f1ff` | `blue-100` `#002249` | `blue-50` `#2e8eff` | `blue-40` `#5ca7ff` |
| Success | `green-60` `#60cc65` | `green-10` `#effaf0` | `green-100` `#0b310c` | `green-70` `#4caf50` | `green-60` `#60cc65` |
| Warning | `orange-60` `#f07000` | `orange-10` `#fff1e5` | `orange-100` `#431f00` | `orange-60` `#f07000` | `orange-50` `#ff902e` |
| Danger | `red-60` `#e53e3e` | `red-10` `#ffeded` | `red-100` `#450000` | `red-60` `#e53e3e` | `red-50` `#ff5252` |

---

## Typography

### Font Families

| Role | Family | CSS Stack |
|------|--------|-----------|
| Sans (primary) | Inter | `'Inter', system-ui, -apple-system, sans-serif` |
| Serif (editorial) | Playfair | `'Playfair', 'Playfair Display', Georgia, serif` |
| Mono (data) | Roboto Mono | `'Roboto Mono', ui-monospace, monospace` |

### Type Scale

| Style name | px | Weight | Letter spacing | Usage |
|------------|-----|--------|----------------|-------|
| Title Hero | 72 | 500 Medium | −4px | Hero headlines |
| Title Page Large | 64 | 500 | −4px | Large page titles |
| Title Page Base | 48 | 500 | −4px | Standard page titles |
| Title Page Small | 40 | 500 | −4px | Compact page titles |
| Heading Large | 40 | 600 SemiBold | −1.2px | Section headings |
| Heading Base | 32 | 600 | −1.2px | Standard headings |
| Heading Small | 28 | 600 | −1.2px | Subsection headings |
| Subheading Large | 24 | 500 | −0.8px | Large subheadings |
| Subheading Base | 20 | 500 | −0.8px | Standard subheadings |
| Subheading Small | 18 | 500 | −0.8px | Small subheadings |
| Body Large | 18 | 400 | 0 | Large body copy |
| Body Base | 16 | 400 | 0 | Standard body |
| Body Small | 14 | 400 | 0 | Secondary text |
| Label Large | 16 | 500 | 0 | Large labels |
| Label Base | 14 | 500 | 0 | Standard labels |
| Label Small | 12 | 500 | 0 | Badges, tags, metadata |

### Font Weight Reference

`100 · 200 · 300 · 400 · 500 · 600 · 700 · 800 · 900`

---

## Spacing

**Base unit: 2px.** Named by scale number × 50.

| Token | px | CSS var |
|-------|----|---------|
| 0 | 0 | `--space-0` |
| 50 | 2 | `--space-px` |
| 100 | 4 | `--space-1` |
| 150 | 6 | `--space-1-5` |
| 200 | 8 | `--space-2` |
| 250 | 10 | `--space-2-5` |
| 300 | 12 | `--space-3` |
| 400 | 16 | `--space-4` |
| 500 | 20 | `--space-5` |
| 600 | 24 | `--space-6` |
| 700 | 28 | `--space-7` |
| 800 | 32 | `--space-8` |
| 1000 | 40 | `--space-10` |
| 1200 | 48 | `--space-12` |
| 1400 | 56 | `--space-14` |
| 1600 | 64 | `--space-16` |
| 2400 | 96 | `--space-24` |
| 4000 | 160 | `--space-40` |

### Component Size Tokens

| Component token | Resolves to | px |
|----------------|-------------|-----|
| Button height — Large | space/1200 | 48 |
| Button height — Medium | space/1000 | 40 |
| Button height — Small | space/800 | 32 |
| Button padding — XL | space/600 | 24 |
| Button padding — LG | space/500 | 20 |
| Button padding — MD | space/400 | 16 |
| Button padding — SM | space/300 | 12 |
| Card padding | space/500 | 20 |
| Card large padding | space/800 | 32 |
| Input padding (H) | space/500 | 20 |
| Icon — Large | space/600 | 24 |
| Icon — Medium | space/500 | 20 |
| Icon — Small | space/400 | 16 |

---

## Shape

### Border Radius

| Token | px | Usage |
|-------|----|-------|
| `radius/0` | 0 | No radius |
| `radius/50` | 2 | Hairline rounding |
| `radius/100` | 4 | Small elements |
| `radius/200` | 8 | Inputs, small buttons |
| `radius/300` | 12 | Inner card radius |
| `radius/400` | 16 | Cards, panels |
| `radius/600` | 24 | Buttons, pills, inputs |
| `radius/800` | 32 | Large card outer radius |
| `radius/Full` | 9999 | Avatars, fully rounded |

### Stroke Weights

| Token | px | Usage |
|-------|----|-------|
| `stroke/0` | 0 | No border |
| `stroke/5` | 0.5 | Hairline |
| `stroke/10` | 1 | Default border |
| `stroke/15` | 1.5 | Medium emphasis |
| `stroke/20` | 2 | Focus rings, strong emphasis |

---

## Breakpoints

| Name | Width | Height (min) |
|------|-------|-------------|
| Mobile | 402px | 874px |
| Tablet | 1194px | 834px |
| Desktop | 1440px | 1024px |

---

## Tailwind v4 Theme

See `src/rayum-theme.css` for the complete `@theme` block to import alongside Tailwind v4.

Usage:
```css
/* In your main CSS entry */
@import "tailwindcss";
@import "./rayum-theme.css";
```
