import Image from "next/image";
import type { ProjectImage } from "@/types";

interface ProjectGalleryProps {
  images: ProjectImage[];
  onImageClick?: (index: number) => void;
}

export default function ProjectGallery({ images, onImageClick }: ProjectGalleryProps) {
  if (images.length === 0) return null;

  return (
    <div className="space-y-6">
      {images.map((image, index) => {
        const isHero = index % 3 === 0;

        if (isHero) {
          return (
            <div
              key={`${image.src}-${index}`}
              className="relative w-full aspect-[16/9] cursor-pointer group"
              onClick={() => onImageClick?.(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onImageClick?.(index);
                }
              }}
              aria-label={`View ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.01]"
                sizes="100vw"
                priority={index < 2}
              />
              {image.caption && (
                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-offwhite text-sm font-body">{image.caption}</p>
                </div>
              )}
            </div>
          );
        }

        return null;
      })}

      {/* 2-column grid rows */}
      <div className="grid grid-cols-2 gap-4">
        {images.map((image, index) => {
          if (index % 3 === 0) return null;

          return (
            <div
              key={`${image.src}-${index}`}
              className="relative aspect-[4/3] cursor-pointer group"
              onClick={() => onImageClick?.(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onImageClick?.(index);
                }
              }}
              aria-label={`View ${image.alt}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {image.caption && (
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-offwhite text-xs font-body">{image.caption}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
