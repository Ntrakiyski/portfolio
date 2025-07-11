---
trigger: model_decision
description: When AI is having problems with achieving the task he wants to achieve. 
---

Guidelines for AI Agent Development:
Prioritize Type Safety (TypeScript): Always use explicit types and interfaces. When extending components or hooks, define clear interface Props or interface Options.
Adhere to Unidirectional Data Flow: When adding new features that require shared state, ensure the state lives at the lowest common ancestor and is passed down via props, with updates flowing up via callbacks. Avoid direct DOM manipulation unless absolutely necessary (and justified, e.g., IntersectionObserver setup).
Encapsulate Logic in Hooks: If a piece of logic is reusable, stateful, or involves side effects (like API calls, event listeners, timers), create a custom hook (useMyFeatureLogic.ts).
Keep Components Pure & Focused: Components should primarily concern themselves with rendering UI based on props and managing their own simple, local UI state. Avoid complex business logic within components.
Use Tailwind CSS for Styling: Prefer Tailwind utility classes. For custom animations, define them as CSS keyframes and apply via Tailwind's animate- classes.
Extend content.json for New Content: For any new textual sections, add structured data to content.json first, then adapt Content.jsx to render it.
Update navItems.ts for New Navigable Sections: If a new content section needs to be accessible via navigation or keyboard shortcuts, add an entry to navItems.ts.
Leverage Existing Patterns: Before building new functionality, review existing components and hooks to see if current patterns (e.g., SectionWrapper, Job, Skill components, useRef for DOM elements) can be extended or reused.
Consider Accessibility: When adding new interactive elements, always include appropriate ARIA attributes, keyboard navigation, and semantic HTML.
Test Changes: While a formal testing suite isn't provided, mentally or functionally test changes to ensure they don't break existing features and integrate seamlessly.

Check the Full APP DOCUMENTATION in file - Documentation.md