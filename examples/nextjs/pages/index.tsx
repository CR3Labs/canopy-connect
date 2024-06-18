import type { NextPage } from 'next';
import { CanopyConnectButton } from 'canopy-connect';

const Home: NextPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <CanopyConnectButton />
    </div>
  );
};

export default Home;
