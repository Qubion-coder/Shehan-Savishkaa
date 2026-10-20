interface MonogramProps {
  className?: string;
}

// "S & S" monogram artwork, used for crests and seals
export default function Monogram({ className = '' }: MonogramProps) {
  return (
    <img
      src="/mono.png"
      alt="Shehan & Savishkaa monogram"
      className={`object-contain ${className}`}
    />
  );
}
