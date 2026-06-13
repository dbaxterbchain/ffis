export interface FoodFactor {
  /** Optional headline figure rendered large (e.g. ">10%"). */
  figure?: string;
  label: string;
  detail: string;
}

export const foodFactors: FoodFactor[] = [
  {
    figure: '>10%',
    label: 'Live below the poverty line',
    detail:
      'More than one in ten people across Metro Phoenix falls below the federal poverty line.',
  },
  {
    figure: '<1%',
    label: 'Of Valley food is grown here',
    detail:
      'Less than 1% of the food consumed in the Valley is grown in the Valley — too little land and labor are dedicated to production.',
  },
  {
    label: 'Food deserts',
    detail:
      'Whole areas of the Valley lack retail outlets, or any access to food banks that provide food for free.',
  },
  {
    label: 'Waste at every stage',
    detail:
      'Edible food is lost at every point in the system — plowed back into fields, rejected as unmarketable, expired on shelves, or over-purchased and stockpiled.',
  },
];
