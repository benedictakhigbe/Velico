import { Card } from "@/components/ui/card";

type WorkingSectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function WorkingSection({ title, description, children }: WorkingSectionProps) {
  return (
    <Card data-velico-animate data-velico-hover className="min-w-0 p-4 sm:p-5">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-[var(--heading)]">{title}</h2>
        {description ? <p className="mt-1 text-sm text-[var(--muted)]">{description}</p> : null}
      </div>
      {children}
    </Card>
  );
}

export function DataTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: Array<Record<string, string | number>>;
}) {
  function formatColumnLabel(column: string) {
    return column.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
  }

  function isStatusColumn(column: string) {
    return column.toLowerCase().includes("status") || column.toLowerCase().includes("mode");
  }

  return (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[540px] text-left text-xs sm:min-w-[640px] sm:text-sm">
        <thead className="border-b border-[var(--border)] text-[0.7rem] uppercase tracking-[0.12em] text-[var(--muted)] sm:text-xs">
          <tr>
            {columns.map((column) => (
              <th key={column} className="px-2 py-3 font-semibold sm:px-3">
                {formatColumnLabel(column)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border)]">
          {rows.length > 0 ? (
            rows.map((row, index) => (
              <tr key={index} className="transition hover:bg-[var(--surface-muted)]">
                {columns.map((column) => (
                  <td key={column} className="px-2 py-4 text-[var(--foreground)] sm:px-3">
                    {isStatusColumn(column) ? (
                      <span className="inline-flex h-7 items-center rounded-[8px] border border-[var(--border)] bg-[var(--brand-soft)] px-2 text-xs font-semibold text-[var(--brand-blue)]">
                        {row[column]}
                      </span>
                    ) : (
                      row[column]
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-3 py-8 text-center text-sm text-[var(--muted)]" colSpan={columns.length}>
                No records yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export function StatGrid({
  stats,
}: {
  stats: Array<{ label: string; value: string; detail?: string }>;
}) {
  return (
    <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          data-velico-animate
          data-velico-hover
          className="velico-card min-w-0 rounded-[8px] border border-[var(--border)] bg-[var(--surface-muted)] p-4"
        >
          <p className="text-sm text-[var(--muted)]">{stat.label}</p>
          <p className="mt-2 break-words text-xl font-semibold text-[var(--heading)] sm:text-2xl">{stat.value}</p>
          {stat.detail ? <p className="mt-2 text-xs text-[var(--muted)]">{stat.detail}</p> : null}
        </div>
      ))}
    </div>
  );
}
