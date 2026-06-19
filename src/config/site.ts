/**
 * Single source of truth for site-wide configuration.
 * Update placeholders (marked TODO) before launch.
 */

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export const site = {
  name: 'Foundation for Innovation in Society',
  shortName: 'FFIS',
  /** Used for canonical + OG; keep in sync with `site` in astro.config.mjs. */
  url: 'https://foundationforinnovationinsociety.org',
  tagline:
    'Innovation is the process of creating value by applying novel solutions to meaningful problems.',
  description:
    'The Foundation for Innovation in Society is an Arizona 501(c)(3) nonprofit applying novel solutions to meaningful problems — starting with food resilience and a pay-it-forward meal program in the Phoenix Metro region.',

  contactEmail: 'innovationinsociety1@gmail.com',
  location: 'Phoenix Metro, Arizona',
  foundedYear: 2025,

  /**
   * Destination for the general "Donate" buttons (header, footer, mobile menu):
   * the every.org donation form. The `#/donate` suffix opens the form directly.
   * The "Donate a meal" buttons pin their own href to the pay-it-forward board.
   */
  donateUrl: 'https://www.every.org/foundation-for-innovation-in-society#/donate',
  donateIsExternal: true,

  /** IRS EIN — surfaces the EIN in the footer's tax-deductible legal line. */
  ein: '33-2320329' as string | null,

  /** The Foundation's first project. */
  pifUrl: 'https://pifboard.com',

  nav: [
    { label: 'Mission', href: '/#mission' },
    { label: 'Food Resilience', href: '/#food-resilience' },
    { label: 'Pay It Forward', href: '/#pay-it-forward' },
    { label: 'Get Involved', href: '/#get-involved' },
  ] as NavItem[],

  /** TODO(launch): add real handles, or leave empty to hide social row. */
  socials: [] as SocialLink[],
};

export type Site = typeof site;
