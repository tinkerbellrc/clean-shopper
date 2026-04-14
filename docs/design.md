# Clean Shopper — Design

## Visual Design System

### Design Intent

Clean Shopper's visual language should feel like a knowledgeable friend who's already done the research — warm, unhurried, and trustworthy. Every visual choice reinforces two things: this product is grounded in nature, and it gives you exactly what you need to make a confident decision, nothing more.

---

### Color Palette

| Role | Name | Value | Usage |
|---|---|---|---|
| Background | Linen | `#F5F2EC` | App background |
| Surface | Warm White | `#FAFAF7` | Cards, sidebars, input fields |
| Primary | Sage | `#7A9E7E` | Primary actions, active states, links |
| Deep | Moss | `#4E7055` | Hover states, emphasis, "Best match" badge |
| Accent | Clay | `#B87A5A` | Warnings, highlights, secondary CTAs |
| Text Primary | Charcoal | `#2C2C2A` | Body copy, headings |
| Text Secondary | Stone | `#6B6B68` | Supporting labels, timestamps, preference notes |
| Border | Dune | `#D4D0C8` | Dividers, card borders, input outlines |
| Success | Garden | `#5E8C61` | Safety score high, confirmed preferences |
| Error | Terracotta | `#C0614A` | Safety score low, flagged ingredients |

**Rules:**
- Sage is the primary action color — buttons, links, active nav. Use it sparingly so it always signals something to do.
- Clay appears only for secondary emphasis and warnings — never compete with Sage.
- App background is always Linen (`#F5F2EC`). Cards and surfaces use Warm White (`#FAFAF7`). No pure white (#FFFFFF), no cool grays.
- Functional colors (Garden/Terracotta) are reserved for safety scoring only — don't repurpose them for decoration.

---

### Typography

**Typeface:** DM Sans (Google Fonts, free)

| Level | Size | Weight | Usage |
|---|---|---|---|
| Heading L | 32px | 700 | Page titles, empty states |
| Heading M | 24px | 600 | Section headers, product names in expanded view |
| Heading S | 18px | 600 | Card product names, modal titles |
| Body | 16px | 400 | Conversational AI responses, descriptions |
| Label | 14px | 500 | Attribute tags, form labels, nav items |
| Micro | 12px | 400 | Timestamps, legal copy, secondary metadata |

**Rules:**
- Hierarchy through size and weight only — no decorative underlines or italic for emphasis.
- Line height: 1.5 for body, 1.2 for headings.
- Maximum line length: 64 characters for conversational AI responses.
- Preference match notes use 14px / 400 weight / Stone (`#6B6B68`) — clearly secondary, never competing with the product name.

---

### Spacing System

Base unit: **4px**

Scale: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64`

| Token | Value | Usage |
|---|---|---|
| sp-1 | 4px | Tag inner vertical padding |
| sp-2 | 8px | Tag inner horizontal padding, icon gaps |
| sp-3 | 12px | Tight component stacking |
| sp-4 | 16px | Card internal sections |
| sp-6 | 24px | Default card padding |
| sp-8 | 32px | Conversational message group separation |
| sp-12 | 48px | Section separation minimum |
| sp-16 | 64px | Page-level vertical rhythm |

**Rules:**
- Lean toward more space, not less. When in doubt, step up the scale.

---

### Component Patterns

**Product Recommendation Card**

Richer card with enforced hierarchy. Three visual zones:
1. *Top*: Product name (Heading S / Charcoal) + brand (Label / Stone) + Safety Score badge (right-aligned, circular, color-coded Garden→Terracotta)
2. *Middle*: Attribute tags — EWG Verified, fragrance-free, USDA Organic, etc. Small pills, sage background (`#7A9E7E` at 15% opacity), moss text. Max 3 visible, rest behind "+2 more."
3. *Bottom*: One-line preference match note in Stone. "Matches your fragrance-free preference." Tap the card to expand for full ingredient reasoning.

Card background: Warm White (`#FAFAF7`). App background behind cards: Linen (`#F5F2EC`). Border: 1px Dune. Border-radius: 12px. No drop shadow — separation through color contrast between card and page background, not elevation.

**Safety Score Badge**

Circular badge, 44px. Letter grade (A–D). Color maps to: Garden (A/high), Clay (B–C/moderate), Terracotta (D/low). Appears top-right of every product card.

**Attribute Tags**

Pill shape, 6px border-radius. Sage background at 15% opacity, Moss text, Label size (13px/500). Flagged ingredients use Terracotta background at 12% opacity, Terracotta text, with a flag prefix. Never more than 3 visible without expansion.

**Best Match Badge**

Moss background, white text, 12px/600, 6px border-radius. Appears above the leading card only when the AI is confident. "✦ Best match."

**AI Conversation**

No chat bubbles. AI responses appear as clean body text in a warm white (`#FAFAF7`) container with 24px padding. Feels like reading, not messaging. User input sits in a linen input bar at the bottom, full-width, 16px body text, Dune border. Send button: 36px circle, Sage background, Moss on hover.

**Comparison View**

Side-by-side cards (stacked on mobile) with Best Match badge above the top recommendation. Cards share identical visual structure so the eye can scan differences without re-learning layout.

---

### AI State Patterns

| State | Visual Signal |
|---|---|
| **Thinking** | Three sage dots, soft pulse animation. No spinner. Appears below the last message, not full-screen. |
| **Suggesting** | Product cards fade in sequentially (100ms stagger). Feels deliberate, not instant-dump. |
| **Confident** | "Best match" badge in Moss on the leading recommendation. |
| **Uncertain** | No "Best match" badge. Intro copy shifts: "Here are a few options worth considering." No visual alarm — just honest framing. |
| **Preference applied** | Small Stone label with sage left border above the recommendation: "Based on your fragrance-free preference." Quiet acknowledgment that the system is paying attention. |
| **Flagged ingredient** | Terracotta tag on the relevant attribute. Tapping it shows the ingredient and why it's flagged. Never alarming — informative. |

---

### Still to decide

- Safety score: letter grade (A–D) vs. numeric (1–10). Letter grade used in this spec as the default.
- Body weight for conversational AI responses: 400 used throughout. May want 300 (light) for a softer feel in longer responses.
