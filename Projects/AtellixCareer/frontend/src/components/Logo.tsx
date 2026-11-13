import Link from "next/link";

export default function Logo({
  dark = false,
  className = "",
  href = "/",
}: {
  dark?: boolean;
  className?: string;
  href?: string;
}) {
  return (
    <Link href={href} className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="AtellixCareer logo"
        className={`h-9 w-9 object-contain ${dark ? "brightness-0 invert" : ""}`}
      />
      <span className={`font-display text-lg font-bold tracking-tight ${dark ? "text-white" : "text-ink-950"}`}>
        AtellixCareer
      </span>
    </Link>
  );
}
