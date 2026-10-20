'use client';

import { useParams } from 'next/navigation';
import InvitationPage from '@/components/InvitationPage';
import { decodeGuestSegment } from '@/lib/invitation';

// Personalized invitation: /{display name}, e.g. /Mr.%20%26%20Mrs.%20Perera
export default function GuestInvitation() {
  const params = useParams<{ guest: string }>();
  const guestName = decodeGuestSegment(params?.guest);

  return <InvitationPage guestName={guestName} />;
}
