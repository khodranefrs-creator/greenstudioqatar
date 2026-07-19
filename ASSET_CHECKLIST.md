# Client Asset Checklist — Before Launch

All data files use Unsplash stock photos as placeholders. Each must be replaced with real assets.

## Project Images (`src/data/projects.ts`)

| Project | Current Placeholder | Replace With |
|---|---|---|
| Villa Amara (id:1) | `photo-1600596542815` | Real hero + 3 gallery photos |
| Crystal Tower (id:2) | `photo-1564013799919` | Real hero + 2 gallery photos |
| Algeria Ministry (id:3) | `photo-1559329007-40df` | Real hero + 1 gallery photo |
| Riyadh Desert Retreat (id:4) | `photo-1563911302283` | Real hero + 2 gallery photos |
| Beirut Arts Center (id:5) | `photo-1566140967404` | Real hero + 1 gallery photo |
| Doha Panorama (id:6) | `photo-1559329007-40df` | Real hero + 2 gallery photos |

**Note:** Doha Panorama and Algeria Ministry share the same hero image placeholder. Replace both.

## Team Photos (`src/data/team.ts`)

| Team Member | Current Placeholder | Replace With |
|---|---|---|
| Omar Al-Jabri | `photo-1560250097-0b80` | Real headshot |
| Dr. Layla Hassan | `photo-1573496359142` | Real headshot |
| Nadia Khalil | `photo-1580489944761` | Real headshot (same as testimonial #2) |
| Yousef Al-Mansouri | `photo-1472099645785` | Real headshot |
| Sara Fuad | `photo-1573497019940` | Real headshot (same as testimonial #4) |

**Warning:** Nadia and Sara share photos with testimonials Mona and Sofia. This must be fixed.

## Testimonial Client Photos (`src/data/testimonials.ts`)

| Client | Current Placeholder | Replace With |
|---|---|---|
| Abdulaziz Al-Saud | `photo-1507003211169` | Real client photo or remove |
| Mona Al-Fardan | `photo-1580489944761` | Real client photo or remove |
| Dr. Khaled Al-Mutawa | `photo-1566492031773` | Real client photo or remove |
| Sofia Papadopoulos | `photo-1573497019940` | Real client photo or remove |

**Also fix:** Testimonial #3 references "Algerian Ministry of Public Works" but the linked project is "Algeria Ministry of Culture". Update the company name to match.

## Service Hero Images (`src/data/services.ts`)

All 5 services use Unsplash stock photos. Replace with real project photos for each service type.

## Blog Cover Images (`src/data/blog-posts.ts`)

All 3 blog posts use Unsplash stock photos. Replace with real editorial images.

## Site Assets (`/public/`)

| File | Status | Action |
|---|---|---|
| `og-image.jpg` | **MISSING** | Create 1200x630 image with firm branding |
| `favicon.ico` | **MISSING** | Create or add real favicon |
| `logo.png` | **MISSING** | Add real logo (referenced in JSON-LD) |
| `apple-touch-icon.png` | **MISSING** | Create 180x180 for iOS |

## Hero Section (`src/components/marketing/hero.tsx`)

| Background | Current | Replace With |
|---|---|---|
| Hero bg | `photo-1487958449943` (Unsplash) | Real firm project photo |

## Philosophy Section (`src/components/marketing/philosophy.tsx`)

| Image | Current | Replace With |
|---|---|---|
| Philosophy img | `photo-1497366216548-37526070297c` | Real studio/team photo

## CTA Section (`src/components/marketing/cta-section.tsx`)

| Background | Current | Replace With |
|---|---|---|
| CTA bg | `photo-1545558014-8692` (at 3% opacity) | Can remain stock or replace
