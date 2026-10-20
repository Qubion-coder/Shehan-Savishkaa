interface MonogramProps {
  className?: string;
}

// Text-based "S & S" monogram in the script face, used for crests and seals
export default function Monogram({ className = '' }: MonogramProps) {
  return (
    <span className={`inline-flex items-baseline font-script leading-none ${className}`}>
      <span>S</span>
      <span className="mx-[0.08em] text-[0.55em] text-[#c9a24a]">&amp;</span>
      <span>S</span>
    </span>
  );
}
