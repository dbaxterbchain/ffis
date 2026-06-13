export interface Quote {
  id: string;
  text: string;
  author: string;
  role?: string;
}

export const quotes: Quote[] = [
  {
    id: 'fuller',
    text: 'You never change things by fighting the existing reality. To change something, build a new model that makes the existing model obsolete.',
    author: 'R. Buckminster Fuller',
    role: 'Architect & systems theorist',
  },
  {
    id: 'szent-gyorgyi',
    text: 'Innovation is seeing what everybody has seen and thinking what nobody has thought.',
    author: 'Dr. Albert Szent-Györgyi',
    role: 'Nobel laureate in Medicine',
  },
  {
    id: 'mead',
    text: 'If the future is to remain open and free, we need people who can tolerate the unknown, who will not need the support of completely worked out systems or traditional blueprints from the past.',
    author: 'Margaret Mead',
    role: 'Cultural anthropologist',
  },
  {
    id: 'einstein',
    text: 'If at first the idea is not absurd, then there is no hope for it.',
    author: 'Albert Einstein',
    role: 'Theoretical physicist',
  },
];

/** Three quotes for the mission wall. */
export const missionQuotes = quotes.filter((q) => q.id !== 'einstein');

/** Reused as the full-width pull-quote divider in the Food Resilience section. */
export const einsteinQuote = quotes.find((q) => q.id === 'einstein')!;
