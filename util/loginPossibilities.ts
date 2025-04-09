// types of institutions and logins
export type institution = 'WO' | 'HBO' | 'MBO';
export type adminLevel = 'Institution' | 'Issuergroup' | 'Issuer' | 'Badgeclass';

// list of possible institutions
export const institutions: institution[] = ['WO', 'HBO', 'MBO'];

// lists of accounts
export const allAccounts: adminLevel[] = ['Institution', 'Issuergroup', 'Issuer', 'Badgeclass'];
export const issuerAndAbove: adminLevel[] = ['Institution', 'Issuergroup', 'Issuer'];
export const groupAndAbove: adminLevel[] = ['Institution', 'Issuergroup'];
export const institutionAndAbove: adminLevel[] = ['Institution'];

// negative list of accounts, used to test impossibilities
export const groupAndBelow: adminLevel[] = ['Issuergroup', 'Issuer', 'Badgeclass'];
export const issuerAndBelow: adminLevel[] = ['Issuer', 'Badgeclass'];
export const badgeAndBelow: adminLevel[] = ['Badgeclass'];