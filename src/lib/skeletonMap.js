import { lazy } from 'react';

/**
 * Templates are loaded on demand.
 *
 * These used to be static imports, which meant every visitor to the landing
 * page downloaded all sixteen templates plus their CSS before anything could
 * paint — the blank screen at startup. A guest opens exactly one card, so only
 * that one should travel.
 *
 * Consumers must render these inside a <Suspense> boundary.
 */
export const SKELETON_MAP = {
  // Data-driven renderer. Designs built on it live in src/allegories/ and add no
  // entry here — one component serves every allegory.
  'AllegoryCard': lazy(() => import('../features/invitation/AllegoryCard')),

  'Skeleton1':  lazy(() => import('../templates/Skeleton1/Skeleton1')),
  'Skeleton2':  lazy(() => import('../templates/Skeleton2/Skeleton2')),
  'Skeleton3':  lazy(() => import('../templates/Skeleton3/Skeleton3')),
  'Skeleton4':  lazy(() => import('../templates/Skeleton4/Skeleton4')),
  'Skeleton5':  lazy(() => import('../templates/Skeleton5/Skeleton5')),
  'Skeleton6':  lazy(() => import('../templates/Skeleton6/Skeleton6')),
  'Skeleton7':  lazy(() => import('../templates/Skeleton7/Skeleton7')),
  'Skeleton8':  lazy(() => import('../templates/Skeleton8/Skeleton8')),
  'Skeleton9':  lazy(() => import('../templates/Skeleton9/Skeleton9')),
  'Skeleton10': lazy(() => import('../templates/Skeleton10/Skeleton10')),
  'Skeleton11': lazy(() => import('../templates/Skeleton11/Skeleton11')),
  'Skeleton12': lazy(() => import('../templates/Skeleton12/Skeleton12')),
  'Skeleton13': lazy(() => import('../templates/Skeleton13/Skeleton13')),
  'Skeleton14': lazy(() => import('../templates/Skeleton14/Skeleton14')),
  'Skeleton15': lazy(() => import('../templates/Skeleton15/Skeleton15')),
  'Tarjeta4':   lazy(() => import('../templates/Tarjeta4/Tarjeta4')),
};
