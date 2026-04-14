# Clean Shopper — Component Specification

All visual values reference tokens defined in `tailwind.config.js`. No hardcoded colors, font sizes, or spacing values appear anywhere in this document. Token reference summary at a glance:

**Colors:** `warm-white` · `linen` · `sage` · `sage-15` · `moss` · `clay` · `charcoal` · `stone` · `dune` · `garden` · `terracotta` · `terracotta-12`
**Font sizes:** `text-micro` · `text-label` · `text-body` · `text-heading-s` · `text-heading-m` · `text-heading-l`
**Font weights:** `font-normal` · `font-medium` · `font-semibold` · `font-bold`
**Spacing:** `sp-1` · `sp-2` · `sp-3` · `sp-4` · `sp-6` · `sp-8` · `sp-12` · `sp-16`
**Radius:** `rounded-none` · `rounded-tag` · `rounded-card` · `rounded-full`
**Shadow:** `shadow-none`

---

## 1. ProductCard

**Purpose:** Displays a single product recommendation with its safety rating, category, and a short description; the primary output unit of every AI-generated response.

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | ✓ | Product name |
| `safetyLevel` | `'clean' \| 'caution' \| 'avoid'` | ✓ | Drives badge color and grade letter |
| `category` | `string` | ✓ | Short certification or category label (e.g. "EWG Verified") |
| `description` | `string` | ✓ | One- to two-sentence product summary |
| `imageUrl` | `string \| null` | — | Product image URL; renders a 1:1 image zone above the card content when provided |
| `isBestMatch` | `boolean` | — | Renders the "✦ Best match" badge above the card when `true` |
| `preferenceNote` | `string` | — | Short preference match note shown below the description |
| `onClick` | `() => void` | — | Expands the card to full ingredient reasoning view |

### Visual Structure

```
[BestMatchBadge]                          ← only when isBestMatch = true

┌─────────────────────────────────────────┐
│  bg-warm-white  border border-dune      │
│  rounded-card  p-sp-6  shadow-none      │
│                                         │
│  ┌─────────────────────────────────┐    │ ← only when imageUrl is provided
│  │  aspect-square  w-full          │    │
│  │  bg-linen  rounded-tag          │    │
│  │  object-contain                 │    │
│  │  mix-blend-multiply             │    │
│  └─────────────────────────────────┘    │
│  mb-sp-4                                │
│                                         │
│  Product Name ············ [SafetyBadge]│
│  text-heading-s font-semibold           │
│  text-charcoal                          │
│                                         │
│  [CategoryTag]                          │
│  mt-sp-3                                │
│                                         │
│  Description copy                       │
│  mt-sp-3 text-body font-normal          │
│  text-stone                             │
│                                         │
│  ── Preference note (optional) ─────── │
│  mt-sp-3 text-label font-normal         │
│  text-stone border-l-2 border-sage      │
│  pl-sp-2                                │
└─────────────────────────────────────────┘
```

### States

**Default:** Warm White background, dune border, no shadow. Cards with an image show the 1:1 image zone above the content; cards without an image skip it entirely — no placeholder.

**Hover (clickable):** `cursor-pointer`. Background transitions to `bg-warm-white` (same as default; the hover effect is subtle). Border remains `border-dune`. No elevation change — the design avoids shadow for depth.

**Loading (skeleton):** Replace text content with animated placeholder bars using `bg-dune` rounded rectangles. Maintain identical card dimensions so layout does not shift on load.

**Best match:** `isBestMatch={true}` renders `<BestMatchBadge>` flush above the card with `mb-sp-2`. The card itself does not change visually.

### Usage Rules

- **Use** in search results, comparison view, and shopping cart.
- **Use** for every AI-surfaced product — never display a product without a SafetyBadge.
- **Do not use** as a navigation element or for non-product content (e.g., tips, preferences). Use `EmptyState` when there are no results.
- **Do not stack** more than three cards without a "show more" control. The design caps visible attribute tags at three with a "+N more" affordance.

---

## 2. SafetyBadge

**Purpose:** Communicates a product's safety level at a glance as a letter grade inside a color-coded circular badge; appears in the top-right corner of every ProductCard.

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `level` | `'clean' \| 'caution' \| 'avoid'` | ✓ | Maps to grade letter and background color |
| `size` | `'default' \| 'sm'` | — | `default` = `w-sp-12 h-sp-12`; `sm` = `w-sp-8 h-sp-8` for compact contexts |

### Visual Structure

```
○  w-sp-12 h-sp-12  rounded-full
   flex items-center justify-center

   Grade letter: text-label font-semibold text-warm-white

   Level → bg color mapping:
     clean   → bg-garden   → "A"
     caution → bg-clay     → "C"
     avoid   → bg-terracotta → "D"
```

### States

**Default:** Solid background color per level, warm-white letter.

**sm size:** Same colors and proportions at `w-sp-8 h-sp-8`. Use `text-micro font-semibold` for the grade letter at this size.

No hover, loading, or error states — the badge is always read-only.

### Usage Rules

- **Use** inside ProductCard (top-right, `shrink-0` to resist flex compression).
- **Use** at `sm` size in cart line items where vertical space is limited.
- **Do not use** as a standalone status indicator for anything other than product safety — Garden and Terracotta are reserved for safety scoring only per the design rules.
- **Do not** substitute a numeric score or icon for the letter grade in V1.

---

## 3. SearchBar

**Purpose:** The primary input through which users describe what they are looking for; triggers the AI research flow on submit.

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `value` | `string` | ✓ | Controlled input value |
| `onChange` | `(value: string) => void` | ✓ | Called on every keystroke |
| `onSubmit` | `() => void` | ✓ | Called when the send button is pressed or Enter is hit |
| `placeholder` | `string` | — | Defaults to `"What are you looking for today?"` |
| `isLoading` | `boolean` | — | Disables input and shows ThinkingIndicator in place of send button |
| `disabled` | `boolean` | — | Disables interaction entirely |

### Visual Structure

```
┌──────────────────────────────────── [○] ┐
│  bg-linen  border border-dune           │
│  rounded-full  px-sp-6 py-sp-3          │
│  w-full  flex items-center gap-sp-3     │
│                                         │
│  <input>                                │
│    text-body font-normal text-charcoal  │
│    placeholder:text-stone               │
│    bg-transparent  flex-1  outline-none │
│                                         │
│  [Send button]                          │
│    w-sp-8 h-sp-8  rounded-full          │
│    bg-sage  flex items-center justify-center │
│    shrink-0                             │
└─────────────────────────────────────────┘
```

### States

**Default:** Linen background, dune border, charcoal text.

**Focus:** `border-sage` replaces `border-dune`. No other change — keep the transition subtle.

**Loading (`isLoading=true`):** Input becomes `disabled`. Send button is replaced by `<ThinkingIndicator>` at the same position. Border remains `border-dune`.

**Disabled:** `opacity-50 cursor-not-allowed` on the entire container.

**Error:** Border becomes `border-terracotta`. Add `text-micro text-terracotta` error message below the bar. Applies if the AI call fails and the user must retry.

### Usage Rules

- **Use** only at the bottom of the conversation view, full-width, fixed to the viewport bottom on mobile.
- **Do not use** for preference input or free-form filtering elsewhere — use `InputField` for those contexts.
- **Do not** allow submission of an empty string; keep the send button `disabled` when `value.trim()` is empty.

---

## 4. CategoryTag

**Purpose:** A compact pill label that identifies a product certification, ingredient attribute, or user preference; used wherever attributes need to be communicated at a glance.

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `label` | `string` | ✓ | Short text (e.g. "EWG Verified", "Fragrance-free") |
| `variant` | `'default' \| 'flagged'` | — | `default` = sage tint; `flagged` = terracotta tint with flag prefix |
| `onRemove` | `() => void` | — | When provided, renders an × button; used in preference management |

### Visual Structure

```
Default variant:
  inline-flex items-center gap-sp-1
  bg-sage-15  text-moss
  rounded-tag  px-sp-2 py-sp-1
  text-label font-medium

Flagged variant:
  bg-terracotta-12  text-terracotta
  rounded-tag  px-sp-2 py-sp-1
  text-label font-medium
  Prefix: "⚑ " prepended to label text

With onRemove:
  Append  ×  button: text-stone hover:text-charcoal  ml-sp-1
```

### States

**Default:** Sage-tinted background, moss text.

**Flagged:** Terracotta-tinted background, terracotta text, flag prefix. Never use this variant for decoration — only for ingredients the AI has identified as potentially problematic.

**Removable (preference context):** Adds a close button. The tag itself has no hover state; only the × button changes to `text-charcoal` on hover.

No loading or error states.

### Usage Rules

- **Use** in ProductCard for certifications and attribute tags (max 3 visible, rest behind "+N more").
- **Use** in the preference management screen to show saved preferences — `onRemove` enables deletion.
- **Use** `flagged` variant only for AI-identified ingredient concerns on the expanded product card.
- **Do not** use more than 3 default tags in a single ProductCard without a "+N more" control.
- **Do not** use for navigation, status messages, or anything outside product/ingredient attribution.

---

## 5. NavBar

**Purpose:** Persistent top navigation that orients the user and provides access to the cart and saved preferences from any screen.

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `cartCount` | `number` | — | Number of items in cart; renders a count badge when > 0 |
| `activeView` | `'search' \| 'preferences' \| 'cart'` | ✓ | Drives active indicator on nav items |
| `onNavigate` | `(view: 'search' \| 'preferences' \| 'cart') => void` | ✓ | Called when a nav item is tapped |

### Visual Structure

```
┌─────────────────────────────────────────┐
│  bg-warm-white  border-b border-dune    │
│  px-sp-6 py-sp-4                        │
│  flex items-center justify-between      │
│                                         │
│  "Clean Shopper"                        │
│  text-heading-s font-semibold           │
│  text-charcoal                          │
│                                         │
│  Nav items (right-aligned):             │
│    text-label font-medium               │
│    Active:  text-sage                   │
│    Inactive: text-stone                 │
│    gap-sp-6 between items               │
│                                         │
│  Cart item (if cartCount > 0):          │
│    Count badge: bg-sage text-warm-white │
│    text-micro font-semibold rounded-full│
│    w-sp-4 h-sp-4 (inline, top-right)   │
└─────────────────────────────────────────┘
```

### States

**Default:** Warm-white background, stone nav items, active item in sage.

**Active item:** `text-sage font-semibold`. No underline, no pill — color alone signals selection.

**Cart with items:** Cart nav label shows a sage count badge. Badge disappears when `cartCount` is 0.

No loading or error states for the nav itself.

### Usage Rules

- **Use** once, at the top of the app shell — not inside individual screens.
- **Do not** add more than three nav destinations in V1 (Search, Preferences, Cart).
- **Do not** use the NavBar inside modals or expanded card views.

---

## 6. Button

**Purpose:** Triggers a user-initiated action; comes in `primary` (sage-filled) and `secondary` (outlined) variants that signal relative importance.

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `label` | `string` | ✓ | Button text |
| `variant` | `'primary' \| 'secondary'` | ✓ | Visual style |
| `onClick` | `() => void` | ✓ | Action handler |
| `disabled` | `boolean` | — | Prevents interaction |
| `isLoading` | `boolean` | — | Shows inline spinner, disables click |
| `size` | `'default' \| 'sm'` | — | `default` uses standard padding; `sm` uses reduced padding |

### Visual Structure

```
Primary:
  bg-sage  text-warm-white  font-semibold  text-label
  px-sp-6 py-sp-3  rounded-full
  hover: bg-moss
  disabled: opacity-50 cursor-not-allowed

Secondary:
  bg-transparent  text-sage  font-semibold  text-label
  border border-sage
  px-sp-6 py-sp-3  rounded-full
  hover: border-moss text-moss
  disabled: opacity-50 cursor-not-allowed

sm size modifier:
  px-sp-4 py-sp-2  (both variants)
```

### States

**Default:** Per variant above.

**Hover — primary:** `bg-moss`. Background darkens; no border appears.

**Hover — secondary:** `border-moss text-moss`. Border and text darken together.

**Loading:** Label replaced by a `ThinkingIndicator` (three dots) or a simple spinner at `text-label` scale. Width is held fixed with `min-w` equal to the label's natural width so the button does not resize.

**Disabled:** `opacity-50 cursor-not-allowed` on both variants. Do not change colors — opacity communicates unavailability without introducing new values.

### Usage Rules

- **Use** `primary` for the single most important action on a screen (e.g., "Add to cart", "Compare").
- **Use** `secondary` for supplementary actions alongside a primary (e.g., "Save preference", "Dismiss").
- **Do not** place two primary buttons side by side — one action per screen should be primary.
- **Do not** use Button for navigation between screens; use NavBar nav items instead.
- **Do not** use Clay for any button variant — Clay is reserved for warnings and secondary emphasis, not actions.

---

## 7. InputField

**Purpose:** A labeled single-line text input for structured data entry; used in preference management for adding ingredients to avoid, trusted brands, or certification filters.

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `label` | `string` | ✓ | Visible label above the field |
| `value` | `string` | ✓ | Controlled value |
| `onChange` | `(value: string) => void` | ✓ | Change handler |
| `placeholder` | `string` | — | Placeholder text |
| `error` | `string` | — | Error message shown below the field |
| `hint` | `string` | — | Helper text shown below the field when no error |
| `disabled` | `boolean` | — | Disables interaction |

### Visual Structure

```
Label
  text-label font-medium text-charcoal
  mb-sp-1

┌─────────────────────────────────────────┐
│  bg-linen  border border-dune           │
│  rounded-card  px-sp-4 py-sp-3          │
│  w-full                                 │
│                                         │
│  <input>                                │
│    text-body font-normal text-charcoal  │
│    placeholder:text-stone               │
│    bg-transparent  outline-none  w-full │
└─────────────────────────────────────────┘

Hint (optional, no error):
  mt-sp-1 text-micro font-normal text-stone

Error message:
  mt-sp-1 text-micro font-normal text-terracotta
```

### States

**Default:** Linen background, dune border, charcoal text.

**Focus:** `border-sage` replaces `border-dune`. Background stays linen.

**Error:** `border-terracotta`. Error message appears below in `text-terracotta text-micro`. Background stays linen — do not use terracotta as a fill.

**Disabled:** `opacity-50 cursor-not-allowed` on the entire field including its label.

**Filled (has value):** No visual change from default — the content is sufficient feedback.

### Usage Rules

- **Use** for structured preference entry (ingredient names, brand names, certification keywords).
- **Do not use** for the main conversational AI input — use `SearchBar` for that.
- **Do not** use `InputField` for multi-line content; the design does not define a textarea variant in V1.
- Always pair with a visible `label` — do not rely on placeholder text alone for accessibility.

---

## 8. EmptyState

**Purpose:** Fills the main content area when there are no search results, no cart items, or no saved preferences; gives the user clear context and a path forward.

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `context` | `'search' \| 'cart' \| 'preferences'` | ✓ | Determines the message and CTA shown |
| `headline` | `string` | — | Overrides the default headline for the context |
| `body` | `string` | — | Overrides the default body copy for the context |
| `action` | `{ label: string; onClick: () => void }` | — | Renders a primary `Button` if provided |

### Default copy by context

| Context | Headline | Body |
|---|---|---|
| `search` | "What are you looking for?" | "Describe a product and I'll research safe options for you." |
| `cart` | "Your cart is empty" | "Add products from your search results to save them here." |
| `preferences` | "No preferences saved yet" | "Tell me what to avoid and I'll apply it to every recommendation." |

### Visual Structure

```
Centered vertically and horizontally in the content area:

  flex flex-col items-center gap-sp-4
  text-center  px-sp-8  max-w-[480px]  mx-auto

  Headline:
    text-heading-m font-semibold text-charcoal

  Body:
    text-body font-normal text-stone
    (max ~64 characters per line per design line-length rule)

  [Button] (primary, if action provided)
    mt-sp-2
```

### States

**Default:** Static — no loading, hover, or error states on the container itself. The action Button inherits its own states.

### Usage Rules

- **Use** whenever a list or grid view has zero items to show — search results, cart, preferences list.
- **Do not** use EmptyState inside a card or modal. It is a full content-area component.
- **Do not** show EmptyState while a search is still loading — show the `ThinkingIndicator` instead and replace with EmptyState only if the AI returns zero results.
- Keep body copy under 64 characters per line (design spec constraint for conversational text).
