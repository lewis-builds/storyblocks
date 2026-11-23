/* Gift-a-journal state — phase 1 is updated by hand here, then redeployed.
   There is no live counter yet (that's phase 2). After orders come in, bump
   `current`. When it reaches `target` (30), reset `current` to 0 and add the
   finished classroom to DELIVERED_CLASSROOMS. */

export const GIFT_PRICE = 8.5;          // £ per journal
export const CLASSROOM_SIZE = 30;       // journals per classroom

/* The classroom currently filling. */
export const GIFT_PROGRESS = {
  current: 4,                           // journals gifted so far toward the next classroom
  target: CLASSROOM_SIZE,
  startedNote: 'Blocks Publishing started this classroom off',
};

/* Completed classrooms, delivered to a confirmed school. Newest first.
   Add one when a classroom fills: { school, town, month, photo? } */
export const DELIVERED_CLASSROOMS = [
  // { school: 'Oakfield Primary School', town: 'Rugby', month: 'December 2026', photo: 'assets/...' },
];
