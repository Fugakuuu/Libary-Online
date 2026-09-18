---
name: react-bits
description: "Expert patterns for high-fidelity React components from reactbits.dev, optimized for tactical and premium UI design."
risk: safe
source: "https://github.com/DavidHDev/react-bits"
date_added: "2026-04-21"
---

# React Bits Skill

This skill provides patterns and instructions for integrating high-fidelity motion components from **React Bits**. These components are specifically chosen to enhance the "Dark Forest" / "Virtual Stream Deck" aesthetic.

## Installation Patterns

React Bits follows a "copy-paste" or CLI-first approach. Use the following commands to add components to the project.

### CLI (Recommended)

Add components directly via `npx shadcn@latest` or `jsrepo`:

```bash
# General Pattern
npx shadcn@latest add @react-bits/[Component]-TS-TW
```

## Curated "Premium Tactical" Components

Use these components to elevate the Virtual Stream Deck UI:

| Component            | Use Case                 | VSD Application                                                       |
| :------------------- | :----------------------- | :-------------------------------------------------------------------- |
| **Decrypted Text**   | Initialization / Loading | Boot-up sequence for Dashboards or Overlay triggers.                  |
| **Star Border**      | Tactical High-Light      | Glowing borders for Search bars, active Assets, or critical Buttons.  |
| **Magnet Lines**     | Interaction Layer        | Interactive backdrop for empty Dashboard states.                      |
| **Glass Surface**    | Material UI              | Foundational glassmorphism for control panels and the Capsule Header. |
| **Pixel Transition** | Scene Change             | High-tech visual feedback when switching between Deck profiles.       |
| **Click Spark**      | Haptic Visuals           | Intense visual confirmation for button presses on the VSD Overlay.    |

## Implementation Guidelines

### 1. Motion Synergy

Always combine `react-bits` components with our existing `framer-motion` config in `src/lib/motion-config.ts`.

- **Damping**: 20–30 (for weight)
- **Stiffness**: 100 (for smoothness)

### 2. Thematic Colors

Ensure all `react-bits` components use the project's tactical palette:

- **Neon Green**: `#00ed64`
- **Forest Black**: `#040d0e`
- **Glow Shadow**: `0 0 15px rgba(0, 237, 100, 0.4)`

### 3. Layout Integration

- Preferred **Corner Radius**: `10px` (matches VSD hardware buttons).
- Use `backdrop-blur-xl` on all glassmorphic components to maintain visual consistency.

## Usage Example: Decrypted Text

```tsx
import DecryptedText from "./DecryptedText";

<DecryptedText
  text="SYSTEM INITIALIZED"
  speed={100}
  maxIteration={20}
  characters="ABCD1234!@#$"
  className="font-mono text-neon-green"
  parentClassName="all-caps"
  animateOn="view"
/>;
```

## Troubleshooting

- **Flickering**: Ensure `AnimatePresence` is used if components are swapped dynamically.
- **Hydration**: React Bits components often use `useEffect` for randomization; wrap in a `Mounted` check if necessary.
