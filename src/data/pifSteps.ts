export interface PifStep {
  n: number;
  title: string;
  detail: string;
}

export const pifSteps: PifStep[] = [
  {
    n: 1,
    title: 'Donors pay it forward',
    detail:
      'Supporters purchase healthy meals that will be served to people experiencing homelessness.',
  },
  {
    n: 2,
    title: 'Restaurants provide',
    detail:
      'Local restaurants join the program as meal providers, preparing nourishing food.',
  },
  {
    n: 3,
    title: 'Partners distribute',
    detail:
      'Community organizations act as distribution centers, getting meals to people on the street.',
  },
];
