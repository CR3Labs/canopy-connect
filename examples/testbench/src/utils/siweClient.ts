import { configureClientSIWE } from 'canopy-connect-next-siwe';

export const siweClient = configureClientSIWE({
  apiRoutePrefix: '/api/siwe',
  statement: 'fam token wen',
});
