import { configureServerSideSIWE } from 'canopy-connect-next-siwe';

export const siweServer = configureServerSideSIWE({
  options: {
    afterLogout: async () => console.log('afterLogout'),
    afterNonce: async () => console.log('afterNonce'),
    afterSession: async () => console.log('afterSession'),
    afterVerify: async () => console.log('afterVerify'),
  },
});
