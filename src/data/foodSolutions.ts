export interface FoodSolution {
  title: string;
  detail: string;
  /** Optional reference to a proven model elsewhere. */
  refModel?: string;
}

export const foodSolutions: FoodSolution[] = [
  {
    title: 'Grow more food, locally',
    detail:
      'Dedicate land and labor to production so that far more than 1% of what the Valley eats is actually grown in the Valley.',
  },
  {
    title: 'Design out the waste',
    detail:
      'Capture the food currently lost at every stage of the system before it ever becomes waste.',
  },
  {
    title: 'Adapt proven models',
    detail:
      'Build on programs already working in other cities and tailor them to the realities of the Valley.',
    refModel: 'Denver, CO · Portland, OR',
  },
];
