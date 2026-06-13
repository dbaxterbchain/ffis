export interface FoodChallenge {
  /** Key into the icon set in ChallengeList.astro. */
  icon: 'transport' | 'health' | 'kitchen' | 'support';
  label: string;
  detail: string;
}

export const foodChallenges: FoodChallenge[] = [
  {
    icon: 'transport',
    label: 'No transportation',
    detail: 'Unable to reach retail outlets or food banks.',
  },
  {
    icon: 'health',
    label: 'Unable to prepare food',
    detail: 'Disability or illness can make cooking impossible.',
  },
  {
    icon: 'kitchen',
    label: 'No kitchen facility',
    detail: 'Nowhere to safely store or prepare a meal.',
  },
  {
    icon: 'support',
    label: 'Gaps in public support',
    detail: 'Government entities cannot always provide the help that is needed.',
  },
];
