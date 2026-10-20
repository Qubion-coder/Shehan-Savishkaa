// Couple details shared by the invitation site and the /admin link generator
export const COUPLE = {
  groomName: 'Shehan',
  brideName: 'Savishkaa',
};

export const PREFIXES = ['Mr.', 'Mrs.', 'Miss', 'Mr. & Mrs.', 'Family', 'Dear'] as const;
export type Prefix = (typeof PREFIXES)[number];

// "Dear" is a greeting style, not part of the name, so it adds nothing here;
// the greeting itself always supplies the single "Dear".
export function buildDisplayName(prefix: Prefix, guestName: string): string {
  const name = guestName.trim().replace(/\s+/g, ' ');
  if (!name) return '';

  switch (prefix) {
    case 'Family':
      return `${name} and Family`;
    case 'Dear':
      return name;
    default:
      return `${prefix} ${name}`;
  }
}

export function buildGreeting(displayName: string): string {
  return `Dear ${displayName} ❤️`;
}

export function buildInvitationLink(baseUrl: string, displayName: string): string {
  return `${baseUrl.replace(/\/+$/, '')}/${encodeURIComponent(displayName)}`;
}

export function buildInvitationMessage(displayName: string, link: string): string {
  return `${buildGreeting(displayName)}

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${link}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ ${COUPLE.groomName} & ${COUPLE.brideName}`;
}

// Reads a guest name back out of a URL path segment
export function decodeGuestSegment(segment: string | undefined): string {
  if (!segment) return '';
  let value = segment;
  try {
    value = decodeURIComponent(segment);
  } catch {
    // Already decoded, or contains a stray "%": use as-is
  }
  return value.replace(/\s+/g, ' ').trim().slice(0, 80);
}
