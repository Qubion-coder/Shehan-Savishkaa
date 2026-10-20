'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import InvitationPage from '@/components/InvitationPage';

// Older links used ?to=Name&t=Title; new links use /{guest} (see app/[guest]/page.tsx)
function HomeContent() {
  const searchParams = useSearchParams();

  const guestName = searchParams.get('to');
  const guestTitle = searchParams.get('t');
  const personalizedName = guestName ? `${guestTitle ? guestTitle + ' ' : ''}${guestName}` : '';

  return <InvitationPage guestName={personalizedName} />;
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-primary font-serif italic text-xl">Loading Invitation...</div>}>
      <HomeContent />
    </Suspense>
  );
}
