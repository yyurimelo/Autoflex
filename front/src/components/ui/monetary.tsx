"use client";

import { Group, Input, NumberField } from "react-aria-components";

type MonetaryProps = {
  name?: string;
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
};

export function Monetary({
  name,
  value,
  onChange,
  className,
  disabled,
  placeholder,
}: MonetaryProps) {
  const handleChange = (newValue: unknown) => {
    if (typeof newValue === 'number') {
      onChange(newValue);
    } else if (typeof newValue === 'string') {
      // Tenta converter string para número
      const parsed = parseFloat(newValue.replace(/\./g, '').replace(',', '.'));
      onChange(isNaN(parsed) ? undefined : parsed);
    } else {
      onChange(undefined);
    }
  };

  return (
    <NumberField
      name={name}
      aria-label={name}
      value={value}
      onChange={handleChange}
      isDisabled={disabled}
      formatOptions={{
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }}
      className={className}
    >
      <div className="*:not-first:mt-2">
        <Group className="border-input outline-none data-[focus-within]:border-ring data-[focus-within]:ring-ring/50 relative inline-flex h-10 w-full items-center overflow-hidden rounded-md border text-sm shadow-xs">

          {/* Prefixo fixo */}
          <span className="pl-3 text-muted-foreground select-none">
            R$
          </span>

          <Input
            placeholder={placeholder}
            disabled={disabled}
            className="bg-background text-foreground flex-1 px-2 py-2 tabular-nums border-0 focus-visible:ring-0 focus-visible:outline-none"
          />
        </Group>
      </div>
    </NumberField>

  );
}
