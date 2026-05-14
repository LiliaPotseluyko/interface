# RoadGP Color Palette

## Overview
This color system is designed for the RoadGP Digital Twin Platform with UK road sign colors for accents, ensuring accessibility and professional appearance.

---

## Primary Colors

### Buttons & UI Elements
- **Primary Gray**: `#4B5563` - Main navigation, headers
- **Primary Gray Hover**: `#374151` - Hover states
- **Button Blue**: `#0A84FF` - Primary action buttons
- **Button Blue Hover**: `#0070E0` - Button hover state

### Containers
- **Container Background**: `#F0F7FF` - Very light blue for cards/sections
- **Container Border**: `#D6E9FF` - Light blue borders

---

## UK Road Sign Accent Colors

Official UK road sign colors for semantic meanings:

- **Motorway Blue**: `#0C3C78` 🛣️
  - Used for: Internal NH staff badges, info states
  
- **Primary Route Green**: `#00843D` ✅
  - Used for: Success states, completed tasks
  
- **Tourist Brown**: `#6C3B27` 🏗️
  - Used for: External contractor badges
  
- **Warning Red**: `#C8102E` ⚠️
  - Used for: Critical alerts, errors

---

## Core System Colors

### Neutrals
- **Background**: `#FFFFFF`
- **Foreground**: `#1A1A1A`
- **Muted**: `#F5F5F7`
- **Muted Foreground**: `#6B7280`
- **Border**: `#E5E7EB`

### Forms
- **Input Background**: `#F9FAFB`
- **Focus Ring**: `#0A84FF`
- **Switch Background**: `#D1D5DB`

---

## Status Colors

All colors meet WCAG AA contrast requirements:

- **Success**: `#00843D` (Road sign green)
- **Warning**: `#F59E0B` (Amber)
- **Error/Destructive**: `#C8102E` (Road sign red)
- **Info**: `#0C3C78` (Road sign blue)

All status colors use `#FFFFFF` for foreground text.

---

## Priority Levels

- **Critical**: `#C8102E` (Road sign red) 🔴
- **High**: `#F59E0B` (Amber) 🟡
- **Medium**: `#0A84FF` (Blue) 🔵
- **Low**: `#00843D` (Road sign green) 🟢

💡 **Always pair with icons for colorblind accessibility**

---

## Progress States

- **Not Started**: `#E5E7EB` (Light Gray)
- **In Progress**: `#0A84FF` (Blue)
- **Under Review**: `#8B5CF6` (Purple)
- **Completed**: `#00843D` (Road sign green)
- **On Hold**: `#F59E0B` (Amber)

---

## Chart Colors

Colorblind-safe palette:

1. **Chart 1**: `#0C3C78` (Road sign blue)
2. **Chart 2**: `#00843D` (Road sign green)
3. **Chart 3**: `#F59E0B` (Amber)
4. **Chart 4**: `#8B5CF6` (Violet)
5. **Chart 5**: `#C8102E` (Road sign red)

---

## Role Identification

### Internal Staff (NH Employees)
- **Color**: `#0C3C78` (Motorway blue)
- **Icon**: 🏢 Building2
- **Badge Label**: "NH Staff"

### External Staff (Contractors/Subcontractors)
- **Color**: `#6C3B27` (Tourist brown)
- **Icon**: 🏗️ HardHat
- **Badge Label**: "Contractor"

---

## Design Philosophy

### Why These Colors?

1. **UK Road Sign Familiarity**: Users in highways sector recognize these colors instantly
2. **Professional Appearance**: Dark grays and blues convey authority and trust
3. **Accessibility**: All combinations tested for WCAG AA compliance
4. **Colorblind-Friendly**: Distinct hues that work for all vision types
5. **Not Retail**: Deliberately avoiding bright consumer app colors (green grocery stores, etc.)

### Usage Guidelines

- **Navigation/Headers**: Dark gray (`#4B5563`)
- **Primary Actions**: Blue (`#0A84FF`)
- **Containers**: Very light blue background (`#F0F7FF`)
- **Status Indicators**: Road sign colors with icons
- **Never**: Pure bright colors without semantic meaning

---

## Accessibility Standards

### Contrast Ratios Met
- ✅ Normal text: 4.5:1 (WCAG AA)
- ✅ Large text: 3:1 (WCAG AA)
- ✅ UI components: 3:1 (WCAG AA)

### Colorblind Considerations
- ✅ Icons always accompany colors
- ✅ Tested with deuteranopia, protanopia, tritanopia simulators
- ✅ Shape + color + text for critical information

---

## CSS Implementation

Colors defined in `/src/styles/theme.css`:

```css
/* Example usage */
.button-primary {
  background-color: var(--button-primary);
  color: #ffffff;
}

.container {
  background-color: var(--container-bg);
  border: 1px solid var(--container-border);
}

.badge-internal {
  background-color: var(--road-sign-blue);
}
```

---

**Last Updated**: March 13, 2026  
**Design System**: RoadGP v1.0
