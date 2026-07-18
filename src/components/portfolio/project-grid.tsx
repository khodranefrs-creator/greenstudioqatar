"use client";

import { useState, useCallback, useMemo } from "react";
import type { Project, ProjectFilters } from "@/types";
import ProjectFilterBar from "@/components/portfolio/project-filter-bar";
import ProjectTile from "@/components/portfolio/project-tile";

interface ProjectGridProps {
  projects: Project[];
  locale: string;
}

export default function ProjectGrid({ projects, locale }: ProjectGridProps) {
  const [filters, setFilters] = useState<ProjectFilters>({});

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      if (filters.typology?.length && !filters.typology.includes(project.typology as never)) {
        return false;
      }
      if (filters.services?.length) {
        const projectServices = project.services ?? [];
        if (!filters.services.some((s) => projectServices.includes(s))) {
          return false;
        }
      }
      if (filters.location) {
        const loc = locale === "ar" ? project.locationCityAr : project.locationCity;
        if (loc !== filters.location) return false;
      }
      if (filters.year?.length && !filters.year.includes(project.year)) {
        return false;
      }
      return true;
    });
  }, [projects, filters, locale]);

  const handleFilterChange = useCallback((newFilters: ProjectFilters) => {
    setFilters(newFilters);
  }, []);

  return (
    <div>
      <ProjectFilterBar activeFilters={filters} onFilterChange={handleFilterChange} />

      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-body text-sm text-muted">
            {locale === "ar" ? "لم يتم العثور على مشاريع" : "No projects found"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-8">
          {filtered.map((project) => (
            <ProjectTile key={project.id} project={project} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
