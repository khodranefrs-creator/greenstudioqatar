"use client";

interface ProjectMapProps {
  location: string;
  locationAr?: string;
  city: string;
  cityAr?: string;
  latitude?: number;
  longitude?: number;
  locale?: string;
}

export default function ProjectMap({
  location,
  locationAr,
  city,
  cityAr,
  locale = "en",
}: ProjectMapProps) {
  const displayLocation = locale === "ar" && locationAr ? locationAr : location;
  const displayCity = locale === "ar" && cityAr ? cityAr : city;

  return (
    <div className="relative w-full aspect-[16/9] bg-charcoal overflow-hidden">
      {/* Stylized map background */}
      <div className="absolute inset-0 opacity-20">
        <svg
          viewBox="0 0 800 450"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Grid lines */}
          {Array.from({ length: 20 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 25}
              x2="800"
              y2={i * 25}
              stroke="#F7F5F1"
              strokeWidth="0.5"
              opacity="0.1"
            />
          ))}
          {Array.from({ length: 32 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 25}
              y1="0"
              x2={i * 25}
              y2="450"
              stroke="#F7F5F1"
              strokeWidth="0.5"
              opacity="0.1"
            />
          ))}
          {/* Abstract coastline shape */}
          <path
            d="M0 280 Q100 260 200 290 Q300 320 400 280 Q500 240 600 270 Q700 300 800 260 L800 450 L0 450Z"
            fill="#F7F5F1"
            opacity="0.05"
          />
        </svg>
      </div>

      {/* Location pin */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex flex-col items-center">
          {/* Pulse ring */}
          <div className="absolute w-24 h-24 rounded-full border border-offwhite/30 animate-ping" />
          {/* Pin */}
          <div className="relative">
            <div className="w-3 h-3 rounded-full bg-accent ring-4 ring-offwhite/20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-offwhite/20" />
          </div>
          {/* Label */}
          <div className="mt-4 text-center">
            <p className="text-offwhite font-display text-lg">{displayLocation}</p>
            <p className="text-offwhite/50 text-xs uppercase tracking-[0.2em] mt-1">
              {displayCity}
            </p>
          </div>
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-offwhite/20" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-offwhite/20" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-offwhite/20" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-offwhite/20" />

      {/* Brand label */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-offwhite/60 text-[10px] uppercase tracking-[0.3em] font-body">
        Project Location
      </div>
    </div>
  );
}
