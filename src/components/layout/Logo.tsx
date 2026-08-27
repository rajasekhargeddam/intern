import { Link } from "react-router-dom";

type LogoProps = {
  className?: string;
  showWordmark?: boolean;
};

const Logo = ({ className = "", showWordmark = true }: LogoProps) => {
  return (
    <Link
      to="/"
      aria-label="Orbit home"
      className={`inline-flex min-w-0 items-center gap-2 text-slate-900 transition hover:opacity-90 ${className}`}
    >
      <span className="relative flex h-8 w-8 shrink-0 items-center justify-center">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          aria-hidden
        >
          <circle cx="16" cy="16" r="4" className="fill-blue-600" />
          <ellipse
            cx="16"
            cy="16"
            rx="12"
            ry="7"
            className="stroke-blue-600"
            strokeWidth="2"
            transform="rotate(-35 16 16)"
          />
          <circle cx="25.5" cy="10.5" r="2" className="fill-blue-500" />
        </svg>
      </span>

      {showWordmark && (
        <span className="truncate text-lg font-bold tracking-tight sm:text-xl">
          Orbit
        </span>
      )}
    </Link>
  );
};

export default Logo;
