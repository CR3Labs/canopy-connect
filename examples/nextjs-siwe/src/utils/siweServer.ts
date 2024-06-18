import { configureServerSideSIWE } from 'canopy-connect-next-siwe';

export const siweServer = configureServerSideSIWE({
  session: {
    cookieName: 'canopy-connect-next-siwe',
    password: process.env.SESSION_SECRET,
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
});
