import type { Project } from "@/types";
import ProjectTile from "@/components/portfolio/project-tile";

interface RelatedProjectsProps {
  projects: Project[];
  title?: string;
  titleAr?: string;
  locale?: string;
}

export default function RelatedProjects({
  projects,
  title = "Related Projects",
  titleAr = "مشاريع ذات صلة",
  locale = "en",
}: RelatedProjectsProps) {
  if (projects.length === 0) return null;

  const displayTitle = locale === "ar" ? titleAr : title;

  return (
    <section className="py-16">
      <div className="flex items-baseline justify-between mb-8">
        <h2 className="font-display text-2xl text-charcoal">{displayTitle}</h2>
      </div>

      <div className="overflow-x-auto scrollbar-none -mx-4 px-4">
        <div className="flex gap-4" style={{ minWidth: "min-content" }}>
          {projects.map((project) => (
            <div key={project.id} className="w-[300px] sm:w-[340px] shrink-0">
              <ProjectTile project={project} locale={locale} />
              <div className="mt-3">
                <p className="text-xs uppercase tracking-widest text-muted">
                  {project.typology} &middot; {project.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
