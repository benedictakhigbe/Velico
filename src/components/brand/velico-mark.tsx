import { cn } from "@/lib/utils";

type VelicoMarkProps = {
  className?: string;
  label?: string;
};

export function VelicoMark({ className, label = "Velico" }: VelicoMarkProps) {
  return (
    <div
      aria-label={label}
      className={cn(
        "grid size-10 place-items-center",
        className,
      )}
    >
      <svg viewBox="0 0 128 128" className="size-full" role="img" aria-hidden="true">
        <defs>
          <linearGradient id="velico-symbol" x1="18" x2="112" y1="87" y2="33">
            <stop offset="0" stopColor="var(--brand-cyan)" />
            <stop offset="0.48" stopColor="var(--brand-sky)" />
            <stop offset="1" stopColor="var(--brand-deep)" />
          </linearGradient>
        </defs>
        <path
          d="M60.8 55.7c0-2 1-3.8 2.7-4.9l17.8-11.9c2.7-1.8 6.3.1 6.3 3.4v21.6c0 6 4.8 10.8 10.8 10.8h17.8c4 0 7.2 3.2 7.2 7.2s-3.2 7.2-7.2 7.2H97c-13.7 0-25.6 9.5-28.6 22.8l-.2.7a6 6 0 0 1-11.7 0l-.2-.7c-3-13.3-14.9-22.8-28.6-22.8H11.8c-4 0-7.2-3.2-7.2-7.2s3.2-7.2 7.2-7.2h16.8c12.1 0 21.9-9.8 21.9-21.9v-7.4c0-2 1-3.8 2.7-4.9L71 28.6c2.7-1.8 6.3.1 6.3 3.4v31.9c0 4.9 4 8.9 8.9 8.9h.4V57.9c0-2 1-3.8 2.7-4.9l17.8-11.9c2.7-1.8 6.3.1 6.3 3.4v28.3h2.8c5 0 9.1 4.1 9.1 9.1s-4.1 9.1-9.1 9.1H96.8c-11.9 0-22.1 8.4-24.4 20.1l-.2.8a10.2 10.2 0 0 1-19.9 0l-.2-.8C49.8 99.4 39.6 91 27.7 91H11.8C6.8 91 2.7 86.9 2.7 81.9s4.1-9.1 9.1-9.1h16.8c11 0 19.9-8.9 19.9-19.9v-7.4c0-2.7 1.3-5.2 3.6-6.7l17.8-11.9c5.1-3.4 12 .2 12 6.4v30.6c0 2.4 1.9 4.3 4.3 4.3h.4V57.9c0-2.7 1.3-5.2 3.6-6.7L108 39.3c5.1-3.4 12 .2 12 6.4v27.1h-6.6V45.7c0-.7-.8-1.1-1.4-.7L94.2 56.9c-.6.4-1 1.1-1 1.8v5.2c0 8.5-6.9 15.4-15.4 15.4s-17-6.9-17-15.4v-8.2Z"
          fill="url(#velico-symbol)"
        />
        <path
          d="M64 72.5c2.3 5.1 6.2 9 11.3 11.3-5.1 2.3-9 6.2-11.3 11.3-2.3-5.1-6.2-9-11.3-11.3 5.1-2.3 9-6.2 11.3-11.3Z"
          fill="var(--surface)"
        />
        <path
          d="M63.7 7.5c1.5 7.4 5.8 11.7 13.2 13.2-7.4 1.5-11.7 5.8-13.2 13.2-1.5-7.4-5.8-11.7-13.2-13.2 7.4-1.5 11.7-5.8 13.2-13.2Z"
          fill="url(#velico-symbol)"
        />
      </svg>
    </div>
  );
}
