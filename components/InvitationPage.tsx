'use client';

import { useState, useEffect } from 'react';
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

export default function InvitationPage({ guestName = '' }: { guestName?: string }) {
  const [isOpened, setIsOpened] = useState(false);

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
          guestName={guestName}
        />
      ) : (
        <>
          <RosePetals />
          <HeroSection />
          <PersonalizedWelcome guestName={guestName} />
          <ParentsSection />

          <CeremonyDetails />
          <SimpleImageSection imageSrc="/pre/5.jpeg" />
          <CountdownSection />
          <SimpleImageSection imageSrc="/pre/6.jpeg" useFullImage />

          <VenueLocation />
          <RSVPSection guestName={guestName} />
          <SimpleImageSection imageSrc="/pre/4.jpeg" useFullImage />
          <BlessingsSection />
          <FooterSection />
        </>
      )}
    </div>
  );
}
