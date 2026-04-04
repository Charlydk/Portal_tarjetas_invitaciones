# Proposal: Segment-Based Invitation Redesign

## Goal
Transition the invitation portal from a technical selection model (Skeleton-first) to a business-oriented selection model (Segment-first) to improve user experience and clarity for potential customers.

## Why
Currently, users are asked to choose a "Skeleton" (Layout 1, Layout 2, etc.) and then a "Variant". This forces them to understand the technical structure before the aesthetic/category. It's more intuitive to choose a category (e.g., "Bodas") and then a pre-built design ("Golden Wedding").

## What
- Introduce a **Segment-first** hierarchy: Segment > Template.
- A **Template** is a predefined combination of a `skeletonComponent` and a `variant`.
- Add a **"Contact Advisor"** link for users who prefer manual service over self-editing.
- Group the homepage display by these segments.

## Segments
- **15 Años**: Pink variants, fancy skeletons.
- **18 Años**: Modern, dynamic skeletons.
- **Mis Dulces 16**: (New category).
- **Bodas**: Classical, elegant skeletons.
- **Sociales**: Corporate/General events.

## Data Structure Change
Create `src/data/segments.js`:
```javascript
export const segments = [
  {
    id: 'bodas',
    name: 'Bodas',
    templates: [
      { id: 'wedding-gold', modelId: 'skeleton1', variantId: 'wedding-classic', name: 'Boda Gold' },
      // ...
    ]
  },
  // ...
]
```

## Affected Files
- `src/data/models.js`: Keep as the source of truth for base skeletons/styles.
- `src/data/segments.js`: (New) Primary business categorization.
- `src/features/preview/ControlPanel.jsx`: Update Wizard to follow the new flow.
- `src/components/organisms/TemplatesSection.jsx`: Update Home Page display.

## Risks
- Breaking the existing Wizard's state management during the transition.
- Ensuring the "Contact Advisor" link doesn't cannibalize the self-service flow too much.

## Rollback Plan
Revert to the Skeleton-based selection in `ControlPanel.jsx` and keep `segments.js` as an unused data file.
