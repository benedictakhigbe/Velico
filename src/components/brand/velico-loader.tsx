import { VelicoMark } from "@/components/brand/velico-mark";

type VelicoLoaderProps = {
  label?: string;
  fullScreen?: boolean;
};

export function VelicoLoader({ label = "Loading Velico", fullScreen = false }: VelicoLoaderProps) {
  return (
    <div
      className={
        fullScreen
          ? "grid min-h-screen place-items-center bg-[var(--background)] px-4"
          : "grid min-h-[360px] place-items-center px-4 py-10"
      }
    >
      <div className="grid place-items-center gap-4 text-center">
        <div className="velico-loader-mark relative grid size-20 place-items-center rounded-[8px] bg-[var(--surface)] shadow-sm">
          <VelicoMark className="size-14" />
        </div>
        <p className="text-sm font-semibold text-[var(--muted)]">{label}</p>
      </div>
    </div>
  );
}
