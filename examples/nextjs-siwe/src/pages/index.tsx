import { CanopyConnectButton, useSIWE } from 'canopy-connect';

export default function Home({ address }: { address?: string }) {
  const { data, isSignedIn, signOut, signIn } = useSIWE();
  console.log({ data, isSignedIn, signOut, signIn });
  return (
    <div className="flex items-center justify-center min-h-screen py-2">
      <CanopyConnectButton />
    </div>
  );
}
