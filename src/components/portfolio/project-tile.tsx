import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/types";

interface ProjectTileProps {
  project: Project;
  locale: string;
}

export default function ProjectTile({ project, locale }: ProjectTileProps) {
  const title = locale === "ar" ? project.titleAr : project.titleEn;
  const location = locale === "ar"
    ? `${project.locationCityAr}, ${project.locationCountryAr}`
    : `${project.locationCity}, ${project.locationCountry}`;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block aspect-[4/5] overflow-hidden bg-charcoal/5"
    >
      <Image
        src={project.heroImage}
        alt={title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCBmaWxsPSIjZThlOGU4IiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIvPjwvc3ZnPg=="
      />

      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
        <span className="inline-block w-fit px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] font-medium border border-offwhite/40 text-offwhite/90 mb-3">
          {project.typology}
        </span>
        <h3 className="font-display text-xl text-offwhite leading-tight mb-1">{title}</h3>
        <p className="text-xs text-offwhite/70 uppercase tracking-widest">
          {location}
        </p>
      </div>
    </Link>
  );
}
