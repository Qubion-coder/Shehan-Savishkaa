'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { EnvelopeOpener } from '@/components/envelope-opener';
import HeroSection from '@/components/sections/HeroSection';
import PersonalizedWelcome from '@/components/sections/PersonalizedWelcome';
import ParentsSection from '@/components/sections/ParentsSection';

import CeremonyDetails from '@/components/sections/CeremonyDetails';
import CountdownSection from '@/components/sections/CountdownSection';

import VenueLocation from '@/components/sections/VenueLocation';
import RSVPSection from '@/components/sections/RSVPSection';
import BlessingsSection from '@/components/sections/BlessingsSection';
import FooterSection from '@/components/sections/FooterSection';
import SimpleImageSection from '@/components/sections/SimpleImageSection';
import MusicPlayer from '@/components/MusicPlayer';
import RosePetals from '@/components/RosePetals';

function HomeContent() {
  const [isOpened, setIsOpened] = useState(false);
  const searchParams = useSearchParams();

  const guestName = searchParams.get('to');
  const guestTitle = searchParams.get('t');
  const personalizedName = guestName ? `${guestTitle ? guestTitle + ' ' : ''}${guestName}` : '';

  useEffect(() => {
    const html = document.documentElement;
    html.classList.add('scroll-smooth');
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden bg-background">
      {/* Persistent floating music player */}
      <MusicPlayer />

      {!isOpened ? (
        <EnvelopeOpener
          onEnvelopeOpen={() => setIsOpened(true)}
          guestName={personalizedName}
        />
      ) : (
        <>
          <RosePetals />
          <HeroSection />
          <PersonalizedWelcome guestName={personalizedName} />
          <ParentsSection />

          <CeremonyDetails />
          <SimpleImageSection imageSrc="/pre/5.jpeg" />
          <CountdownSection />
          <SimpleImageSection imageSrc="/pre/6.jpeg" />

          <VenueLocation />
          <RSVPSection guestName={personalizedName} />
          <SimpleImageSection imageSrc="/pre/4.jpeg" useFullImage />
          <BlessingsSection />
          <FooterSection />
        </>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-primary font-serif italic text-xl">Loading Invitation...</div>}>
      <HomeContent />
    </Suspense>
  );
}
