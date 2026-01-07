import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: number;
}

export function Logo({ className, showText = true, size = 32 }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Background - uses card color */}
        <rect width="32" height="32" fill="hsl(var(--card))" rx="6" />

        {/* A symbol - bold red color */}
        <path
          d="M16 6L7 26H10.5L12.5 20.5H19.5L21.5 26H25L16 6ZM13.5 18L16 10.5L18.5 18H13.5Z"
          fill="#ef4444"
          stroke="#ef4444"
          strokeWidth="1"
        />
      </svg>
      {showText && <span className="text-xl font-bold">Open Audit</span>}
    </div>
  );
}
