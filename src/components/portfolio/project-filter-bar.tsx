"use client";

import { useState, useCallback } from "react";
import type { ProjectFilters, ProjectTypology, ProjectService } from "@/types";

const TYPOLOGIES: { value: ProjectTypology; label: string }[] = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "government", label: "Government" },
  { value: "hospitality", label: "Hospitality" },
  { value: "interiors", label: "Interiors" },
];

const SERVICES: { value: ProjectService; label: string }[] = [
  { value: "architecture", label: "Architecture" },
  { value: "interiors", label: "Interiors" },
  { value: "engineering", label: "Engineering" },
  { value: "project-management", label: "Project Management" },
  { value: "supervision", label: "Supervision" },
];

const LOCATIONS = ["Doha", "Lusail", "Al Wakrah", "Al Khor", "Muscat", "Riyadh"];

const YEARS = [2024, 2023, 2022, 2021, 2020];

interface FilterGroupProps {
  label: string;
  options: { value: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
}

function FilterGroup({ label, options, selected, onToggle }: FilterGroupProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-widest border transition-colors ${
          selected.length > 0
            ? "border-charcoal bg-charcoal text-offwhite"
            : "border-border text-muted hover:border-charcoal hover:text-charcoal"
        }`}
      >
        {label}
        {selected.length > 0 && (
          <span className="inline-flex items-center justify-center w-4 h-4 text-[10px] bg-offwhite text-charcoal rounded-full">
            {selected.length}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 min-w-[180px] bg-offwhite border border-border shadow-sm">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onToggle(opt.value)}
              className={`block w-full text-left px-3 py-2 text-xs hover:bg-charcoal/5 transition-colors ${
                selected.includes(opt.value) ? "text-charcoal font-medium" : "text-muted"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProjectFilterBar({
  activeFilters,
  onFilterChange,
}: {
  activeFilters: ProjectFilters;
  onFilterChange: (filters: ProjectFilters) => void;
}) {
  const toggleInArray = useCallback(
    (key: keyof ProjectFilters, value: string) => {
      const current = (activeFilters[key] as string[] | undefined) ?? [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      onFilterChange({ ...activeFilters, [key]: updated.length > 0 ? updated : undefined });
    },
    [activeFilters, onFilterChange]
  );

  const activeTags: { key: keyof ProjectFilters; value: string; label: string }[] = [];

  (activeFilters.typology ?? []).forEach((v) =>
    activeTags.push({ key: "typology", value: v, label: TYPOLOGIES.find((t) => t.value === v)?.label ?? v })
  );
  (activeFilters.services ?? []).forEach((v) =>
    activeTags.push({ key: "services", value: v, label: SERVICES.find((s) => s.value === v)?.label ?? v })
  );
  if (activeFilters.location) {
    activeTags.push({ key: "location", value: activeFilters.location, label: activeFilters.location });
  }
  (activeFilters.year ?? []).forEach((v) =>
    activeTags.push({ key: "year", value: String(v), label: String(v) })
  );

  const hasActive = activeTags.length > 0;

  return (
    <div className="w-full border-b border-border py-3">
      <div className="flex flex-wrap items-center gap-2">
        <FilterGroup
          label="Typology"
          options={TYPOLOGIES}
          selected={(activeFilters.typology ?? []) as string[]}
          onToggle={(v) => toggleInArray("typology", v)}
        />
        <FilterGroup
          label="Service"
          options={SERVICES}
          selected={(activeFilters.services ?? []) as string[]}
          onToggle={(v) => toggleInArray("services", v)}
        />
        <FilterGroup
          label="Location"
          options={LOCATIONS.map((l) => ({ value: l, label: l }))}
          selected={activeFilters.location ? [activeFilters.location] : []}
          onToggle={(v) =>
            onFilterChange({
              ...activeFilters,
              location: activeFilters.location === v ? undefined : v,
            })
          }
        />
        <FilterGroup
          label="Year"
          options={YEARS.map((y) => ({ value: String(y), label: String(y) }))}
          selected={(activeFilters.year ?? []).map(String)}
          onToggle={(v) => {
            const num = Number(v);
            const current = activeFilters.year ?? [];
            const updated = current.includes(num)
              ? current.filter((y) => y !== num)
              : [...current, num];
            onFilterChange({ ...activeFilters, year: updated.length > 0 ? updated : undefined });
          }}
        />

        {hasActive && (
          <div className="flex flex-wrap items-center gap-1.5 ml-auto">
            {activeTags.map((tag) => (
              <span
                key={`${tag.key}-${tag.value}`}
                className="inline-flex items-center gap-1 px-2 py-0.5 text-xs border border-charcoal text-charcoal"
              >
                {tag.label}
                <button
                  type="button"
                  onClick={() => {
                    if (tag.key === "location") {
                      onFilterChange({ ...activeFilters, location: undefined });
                    } else {
                      toggleInArray(tag.key, tag.value);
                    }
                  }}
                  className="text-muted hover:text-charcoal ml-0.5"
                  aria-label={`Remove ${tag.label}`}
                >
                  &times;
                </button>
              </span>
            ))}
            <button
              type="button"
              onClick={() => onFilterChange({})}
              className="text-xs text-muted hover:text-charcoal underline underline-offset-2 ml-1"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
