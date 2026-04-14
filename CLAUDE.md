## Skill References

- Use `/project-context` to generate a structured Project Context Document from any project input (PRD, brief, bullet points, notes, screenshots). Produces nine sections: problem, ICP, pain points, solution, success metrics, design constraints, user research insights, open questions, and gaps. Also captures project owner, product owner, and design owner.
- Use `/prompt-optimizer` to evaluate and refine instructions before sending them.
- Use `/design-system-generator` to define a product's visual language through a guided conversation. Asks feeling-oriented questions across two phases (vision/feel and visual territory), then generates two outputs: `docs/design-system.html` (visual artifact) and `docs/design-system.md` (structured documentation). No component-specific outputs — those come from a separate skill.

## Design System

This project has a defined design system. Reference these files when building any UI:
- **Visual artifact:** `docs/design-system.html` — open in a browser to preview colors, typography, spacing, and shape
- **Documentation & tokens:** `docs/design-system.md` — full design rationale, all token values, and CSS custom properties

Always use the design tokens defined in the design system when writing styles. Do not hard-code colors, font sizes, spacing, or border-radius values — use the corresponding CSS custom property from the token system.
