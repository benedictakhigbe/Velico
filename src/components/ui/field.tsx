"use client";

import {
  Children,
  ComponentPropsWithoutRef,
  KeyboardEvent,
  ReactElement,
  ReactNode,
  isValidElement,
  useId,
  useState,
} from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type FieldProps = ComponentPropsWithoutRef<"input"> & {
  label: string;
  hint?: string;
};

export function Field({ className, label, hint, id, ...props }: FieldProps) {
  const inputId = id ?? props.name;

  return (
    <label className="grid gap-2 text-sm font-medium text-[var(--foreground)]" htmlFor={inputId}>
      <span>{label}</span>
      <input
        id={inputId}
        className={cn(
          "h-11 rounded-[8px] border border-[var(--border)] bg-[var(--surface)] px-3 text-base text-[var(--foreground)] shadow-sm transition placeholder:text-[var(--muted)] hover:border-[var(--border-strong)] focus:border-[var(--brand-blue)]",
          className,
        )}
        {...props}
      />
      {hint ? <span className="text-xs font-normal text-[var(--muted)]">{hint}</span> : null}
    </label>
  );
}

type SelectFieldProps = ComponentPropsWithoutRef<"select"> & {
  label: string;
};

function getOptions(children: ReactNode) {
  return Children.toArray(children)
    .filter(isValidElement)
    .map((child) => {
      const option = child as ReactElement<ComponentPropsWithoutRef<"option">>;
      const value = String(option.props.value ?? option.props.children ?? "");

      return {
        value,
        label: option.props.children,
        disabled: option.props.disabled,
      };
    })
    .filter((option) => option.value.length > 0);
}

export function SelectField({
  className,
  label,
  id,
  children,
  value,
  defaultValue,
  onChange,
  disabled,
  name,
  required,
  ...props
}: SelectFieldProps) {
  const generatedId = useId();
  const inputId = id ?? name ?? generatedId;
  const listboxId = `${inputId}-listbox`;
  const options = getOptions(children);
  const firstEnabledOption = options.find((option) => !option.disabled);
  const initialValue = String(value ?? defaultValue ?? firstEnabledOption?.value ?? "");
  const [internalValue, setInternalValue] = useState(initialValue);
  const [isOpen, setIsOpen] = useState(false);
  const selectedValue = String(value ?? internalValue);
  const selectedOption = options.find((option) => option.value === selectedValue) ?? firstEnabledOption;

  function selectValue(nextValue: string) {
    const nextOption = options.find((option) => option.value === nextValue);

    if (!nextOption || nextOption.disabled || disabled) {
      return;
    }

    setInternalValue(nextValue);
    setIsOpen(false);
    onChange?.({
      target: { value: nextValue, name },
      currentTarget: { value: nextValue, name },
    } as unknown as Parameters<NonNullable<typeof onChange>>[0]);
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const enabledOptions = options.filter((option) => !option.disabled);
    const currentIndex = enabledOptions.findIndex((option) => option.value === selectedValue);

    if (event.key === "Escape") {
      setIsOpen(false);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setIsOpen((current) => !current);
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      const nextIndex =
        currentIndex === -1
          ? 0
          : (currentIndex + direction + enabledOptions.length) % enabledOptions.length;

      selectValue(enabledOptions[nextIndex]?.value ?? selectedValue);
      setIsOpen(true);
    }
  }

  return (
    <div
      className="grid gap-2 text-sm font-medium text-[var(--foreground)]"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsOpen(false);
        }
      }}
    >
      <span id={`${inputId}-label`}>{label}</span>
      <div className="group relative">
        <select
          id={inputId}
          name={name}
          value={selectedValue}
          onChange={(event) => selectValue(event.target.value)}
          disabled={disabled}
          required={required}
          tabIndex={-1}
          aria-hidden="true"
          className="sr-only"
          {...props}
        >
          {children}
        </select>
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={`${inputId}-label`}
          aria-controls={listboxId}
          disabled={disabled}
          onClick={() => setIsOpen((current) => !current)}
          onKeyDown={onKeyDown}
          className={cn(
            "flex h-11 w-full items-center justify-between gap-3 rounded-[8px] border border-[var(--border)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--surface)_98%,var(--brand-soft)),var(--surface))] px-3 text-left text-base font-semibold text-[var(--heading)] shadow-sm transition hover:border-[var(--border-strong)] hover:bg-[var(--surface-muted)] focus:border-[var(--brand-blue)] disabled:cursor-not-allowed disabled:opacity-60",
            className,
          )}
        >
          <span className="min-w-0 flex-1 truncate">{selectedOption?.label}</span>
          <span
            aria-hidden="true"
            className="flex size-7 shrink-0 items-center justify-center rounded-[8px] border border-[var(--border)] bg-[var(--brand-soft)] text-[var(--brand-blue)] shadow-sm transition group-hover:border-[var(--border-strong)]"
          >
            <ChevronDown className={cn("size-4 transition", isOpen ? "rotate-180" : "")} />
          </span>
        </button>

        {isOpen ? (
          <div
            id={listboxId}
            role="listbox"
            aria-labelledby={`${inputId}-label`}
            className="absolute z-40 mt-2 max-h-72 w-full overflow-y-auto rounded-[8px] border border-[var(--border)] bg-[var(--surface)] p-1 shadow-2xl"
          >
            {options.map((option) => {
              const isSelected = option.value === selectedValue;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  disabled={option.disabled}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => selectValue(option.value)}
                  className="flex min-h-10 w-full items-center gap-3 rounded-[8px] px-3 py-2 text-left text-sm font-semibold text-[var(--foreground)] transition hover:bg-[var(--brand-soft)] hover:text-[var(--heading)] disabled:cursor-not-allowed disabled:opacity-50 aria-selected:bg-[var(--brand-soft)] aria-selected:text-[var(--brand-blue)]"
                >
                  <span className="flex size-5 shrink-0 items-center justify-center rounded-[6px] border border-[var(--border)] bg-[var(--surface-muted)] text-[var(--brand-blue)]">
                    {isSelected ? <Check className="size-3.5" aria-hidden="true" /> : null}
                  </span>
                  <span className="min-w-0 flex-1 truncate">{option.label}</span>
                </button>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}
