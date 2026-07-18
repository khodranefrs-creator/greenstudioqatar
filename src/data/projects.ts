import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    slug: "villa-amara",
    titleEn: "Villa Amara",
    titleAr: "فيلا أمارا",
    typology: "residential",
    services: ["architectural-design", "interior-design", "project-management"],
    locationCity: "Doha",
    locationCityAr: "الدوحة",
    locationCountry: "Qatar",
    locationCountryAr: "قطر",
    year: 2023,
    sizeSqm: 850,
    clientType: "Private Client",
    featuredWeight: 5,
    heroImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8aadc5e0d4?w=1920&q=80",
      "https://images.unsplash.com/photo-1600585152915-d208bec9a904?w=1920&q=80",
    ],
    technicalSpecs: [
      { label: "Total Area", labelAr: "المساحة الكلية", value: "850 sqm", valueAr: "850 متر مربع" },
      { label: "Land area", labelAr: "مساحة الأرض", value: "1200 sqm", valueAr: "1200 متر مربع" },
      { label: "Floors", labelAr: "عدد الطوابق", value: "3 (ground + 2)", valueAr: "3 (أرضي + 2)" },
      { label: "Bedrooms", labelAr: "غرف النوم", value: "6", valueAr: "6" },
      { label: "Structural System", labelAr: "النظام الإنشائي", value: "Reinforced concrete core with steel roof", valueAr: "لب خرساني مسلح مع سقف معدني" },
    ],
    bodyEn:
      "Villa Amara is a contemporary private residence located in the prestigious Al Waab district of Doha. The design integrates indoor and outdoor living through a central courtyard — a reinterpretation of traditional Arabian architecture. Floor-to-ceiling glazing maximizes natural light while deep overhangs and screening provide shading from the intense desert sun. A green roof and rainwater harvesting system underscore the project's sustainable ethos.",
    bodyAr:
      "فيلا أمارا هي مسكن خاص معاصر يقع في حي الواب المرموق في الدوحة. يدمج التصميم بين الحياة الداخلية والخارجية من خلال فناء مركزي - إعادة تفسير للعمارة العربية التقليدية. الزجاج الممتد من الأرض حتى السقف يعظم الاستفادة من الضوء الطبيعي بينما توفر البروزات العميقة والستائر التظليل من أشعة الشمس الصحراوية الحارة. السقف الأخضر ونظام تجميع مياه الأمطار يؤكدان الطابع المستدام للمشروع.",
    status: "completed",
    publishedAt: "2023-09-15",
  },
  {
    id: "2",
    slug: "crystal-tower",
    titleEn: "Crystal Tower",
    titleAr: "برج الكريستال",
    typology: "commercial",
    services: ["architectural-design", "engineering-consultancy", "project-management", "construction-supervision"],
    locationCity: "Dubai",
    locationCityAr: "دبي",
    locationCountry: "UAE",
    locationCountryAr: "الإمارات العربية المتحدة",
    year: 2022,
    sizeSqm: 22000,
    clientType: "Private Developer",
    featuredWeight: 4,
    heroImage:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1558618666-fcd25c2f8e08?w=1920&q=80",
      "https://images.unsplash.com/photo-1506905925346-21eff314b54f?w=1920&q=80",
    ],
    technicalSpecs: [
      { label: "Total Area", labelAr: "المساحة الكلية", value: "22,000 sqm", valueAr: "22,000 متر مربع" },
      { label: "Floors", labelAr: "عدد الطوابق", value: "28 (B2 + G + 25)", valueAr: "28 (قبو 2 + أرضي + 25)" },
      { label: "Height", labelAr: "الارتفاع", value: "115 m", valueAr: "115 متر" },
      { label: "LEED Target", labelAr: "هدف الريادة في الطاقة والتصميم البيئي", value: "Gold", valueAr: "ذهبي" },
    ],
    bodyEn:
      "Crystal Tower is a premier commercial office tower at Dubai Internet City. The glass-clad facade features a unique faceted geometry that catches light at different angles, creating a kinetic effect throughout the day. The building incorporates smart building technologies, energy-efficient HVAC systems, and biophilic design elements in its public areas. The lobby features a large-scale art installation by a local artist, making it a landmark destination.",
    bodyAr:
      "برج الكريستال هو برج مكاتب تجاري متميز في مدينة دبي للإنترنت. يتميز المظهر الخارجي المغلف بالزجاج بهندسة متعددة الأوجه تلتقط الضوء بزوايا مختلفة، مما يخلق تأثيراً حركياً طوال اليوم. يضم المبنى تقنيات ذكية وأنظمة تدفئة وتهوية وتكييف موفرة للطاقة وعناصر تصميم بيوفيلي (محب للطبيعة) في المناطق العامة. تتميز البهو بتركيبة فنية كبيرة لفنان محلي، مما يجعله وجهة مميزة.",
    status: "completed",
    publishedAt: "2022-08-01",
  },
  {
    id: "3",
    slug: "algeria-ministry-building",
    titleEn: "Algeria Ministry of Culture",
    titleAr: "وزارة الثقافة الجزائرية",
    typology: "government",
    services: ["architectural-design", "engineering-consultancy", "construction-supervision"],
    locationCity: "Algiers",
    locationCityAr: "الجزائر العاصمة",
    locationCountry: "Algeria",
    locationCountryAr: "الجزائر",
    year: 2021,
    sizeSqm: 18000,
    clientType: "Government",
    featuredWeight: 3,
    heroImage:
      "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1920&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1575419301705-b4b4c257f239?w=1920&q=80",
    ],
    technicalSpecs: [
      { label: "Total Area", labelAr: "المساحة الكلية", value: "18,000 sqm", valueAr: "18,000 متر مربع" },
      { label: "Floors", labelAr: "عدد الطوابق", value: "6 (B1 + G + 4)", valueAr: "6 (قبو + أرضي + 4)" },
      { label: "Facades", labelAr: "الواجهات", value: "Local limestone and glass curtain wall", valueAr: "حجر جيري محلي وجدار ستائري زجاجي" },
    ],
    bodyEn:
      "The new Ministry of Culture building in Algiers is a civic landmark that marries modernist lines with traditional Maghrebi architectural motifs. The facade uses local limestone combined with a glass curtain wall, while the interior atrium is an homage to the traditional riad garden. The project includes a public exhibition hall, a 300-seat auditorium, and administrative offices. Designed to achieve LEED Silver certification, it incorporates passive cooling strategies and energy-efficient building systems.",
    bodyAr:
      "مبنى وزارة الثقافة الجديد في الجزائر العاصمة هو معلم مدني يمزج بين الخطوط الحديثة والزخارف المعمارية المغاربية التقليدية. تستخدم الواجهة الحجر الجيري المحلي مع جدار ستائري زجاجي، بينما يشكل الردهة الداخلية تحية للحديقة التقليدية (الرياض). يضم المشروع قاعة عرض عامة ومدرج يتسع لـ 300 شخص ومكاتب إدارية. صمم للحصول على شهادة الريادة في الطاقة والتصميم البيئي (لييد) الفضية، ويتضمن استراتيجيات تبريد سلبي وأنظمة بناء موفرة للطاقة.",
    status: "completed",
    publishedAt: "2021-12-20",
  },
  {
    id: "4",
    slug: "riyadh-desert-retreat",
    titleEn: "Riyadh Desert Retreat",
    titleAr: "منتجع الرياض الصحراوي",
    typology: "resort",
    services: ["architectural-design", "interior-design", "project-management"],
    locationCity: "Riyadh",
    locationCityAr: "الرياض",
    locationCountry: "Saudi Arabia",
    locationCountryAr: "المملكة العربية السعودية",
    year: 2023,
    sizeSqm: 45000,
    clientType: "Hospitality Group",
    featuredWeight: 4,
    heroImage:
      "https://images.unsplash.com/photo-1563911302283-d2bc659eeba1?w=1920&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1566073771259-6a6beaaf0f4a?w=1920&q=80",
      "https://images.unsplash.com/photo-1611892440504-42a35e46f12f?w=1920&q=80",
    ],
    technicalSpecs: [
      { label: "Total Area", labelAr: "المساحة الكلية", value: "45,000 sqm", valueAr: "45,000 متر مربع" },
      { label: "Guest Villas", labelAr: "عدد الفيلات", value: "32", valueAr: "32" },
      { label: "Facilities", labelAr: "المرافق", value: "Spa, infinity pool, 3 restaurants, event pavilion", valueAr: "سبا، مسبح لا متناهي، 3 مطاعم، جناح فعاليات" },
    ],
    bodyEn:
      "The Riyadh Desert Retreat is a luxury hospitality project situated in the desert landscape outside Riyadh. Rather than building upwards, the design is spread out into a series of pavilions interconnected by shaded walkways, blending into the natural topography. Local stone, rammed earth, and timber give warmth and tactility to the structures. Thermal mass, cross-ventilation, and building orientation minimize reliance on mechanical cooling. The retreat offers 32 private villas, each with a plunge pool and garden, plus extensive spa and wellness facilities.",
    bodyAr:
      "منتجع الرياض الصحراوي هو مشروع ضيافة فاخر يقع في المشهد الصحراوي خارج الرياض. بدلاً من البناء لأعلى، يمتد التصميم على شكل سلسلة من الأجنحة المتصلة بممرات مظللة، مندمجة في التضاريس الطبيعية. يمنح الحجر المحلي والتربة المدكوكة والخشب الدفء والملمس للمنشآت. الكتلة الحرارية والتهوية المتقاطعة وتوجيه المبنى تقلل من الاعتماد على التبريد الميكانيكي. يضم المنتجع 32 فيلا خاصة، كل منها مزود بحوض سباحة وجنة، بالإضافة إلى مرافق سبا وعافية واسعة.",
    status: "ongoing",
    publishedAt: "2023-06-01",
  },
  {
    id: "5",
    slug: "beirut-arts-center",
    titleEn: "Beirut Arts Center",
    titleAr: "مركز بيروت للفنون",
    typology: "interior",
    services: ["interior-design", "architectural-design"],
    locationCity: "Beirut",
    locationCityAr: "بيروت",
    locationCountry: "Lebanon",
    locationCountryAr: "لبنان",
    year: 2022,
    sizeSqm: 2400,
    clientType: "Cultural Foundation",
    featuredWeight: 2,
    heroImage:
      "https://images.unsplash.com/photo-1566140967404-b8b0e9a0b4b8?w=1920&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&q=80",
    ],
    technicalSpecs: [
      { "label": "Total Area", "labelAr": "المساحة الكلية", "value": "2,400 sqm", "valueAr": "2,400 متر مربع" },
      { "label": "Exhibition Space", "labelAr": "مساحة العرض", "value": "1,200 sqm", "valueAr": "1,200 متر مربع" },
      { "label": "Capacity", "labelAr": "الطاقة الاستيعابية", "value": "300 pax", "valueAr": "300 شخص" },
    ],
    bodyEn:
      "The Beirut Arts Center interior fit-out project involved the adaptive reuse of an industrial warehouse in the heart of the city's art district. The intervention was minimal: a series of sculptural partitions and an elevated walkway define the circulation without fragmenting the large open plan. Exposed brick, steel beams, and polished concrete retain the industrial character, while carefully placed lighting highlights the artworks. The project includes two galleries, a flexible event space, and a rooftop bar with views of the city skyline.",
    bodyAr:
      "مشروع التجهيز الداخلي لمركز بيروت للفنون تضمن إعادة الاستخدام التكيفي لمستودع صناعي في قلب الحي الفني بالمدينة. كان التدخل في حده الأدنى: سلسلة من الفواصل النحتية وممر مرتفع يحددان مسار الحركة دون تجزئة المخطط المفتوح الكبير. يحافظ الطوب المكشوف والعوارض الفولاذية والخرسانة المصقولة على الطابع الصناعي، بينما تبرز الإضاءة الموضوعة بعناية الأعمال الفنية. يضم المشروع صالتين عرض وقاعة فعاليات مرنة وسطحًا مع بار يطل على أفق المدينة.",
    status: "completed",
    publishedAt: "2022-04-10",
  },
  {
    id: "6",
    slug: "doha-mixed-use",
    titleEn: "Doha Panorama",
    titleAr: "بانوراما الدوحة",
    typology: "mixed-use",
    services: ["architectural-design", "engineering-consultancy", "project-management", "construction-supervision"],
    locationCity: "Doha",
    locationCityAr: "الدوحة",
    locationCountry: "Qatar",
    locationCountryAr: "قطر",
    year: 2024,
    sizeSqm: 58000,
    clientType: "Investment Fund",
    featuredWeight: 5,
    heroImage:
      "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1920&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1920&q=80",
      "https://images.unsplash.com/photo-1512917774080-918ce084b06b?w=1920&q=80",
    ],
    technicalSpecs: [
      { label: "Total Area", labelAr: "المساحة الكلية", value: "58,000 sqm", valueAr: "58,000 متر مربع" },
      { label: "Floors", labelAr: "عدد الطوابق", value: "38 (B3 + G + 34)", valueAr: "38 (قبو 3 + أرضي + 34)" },
      { label: "Program", labelAr: "البرنامج", value: "Residential (80 units), Office (15,000 sqm), Retail (8,000 sqm), Hotel (150 keys)", valueAr: "سكني (80 وحدة)، مكتبي (15,000 متر مربع)، تجاري (8,000 متر مربع)، فندق (150 مفتاح)" },
      { label: "Parking", labelAr: "مواقف السيارات", value: "450 spaces", valueAr: "450 موقفًا" },
    ],
    bodyEn:
      "Doha Panorama is a landmark mixed-use tower located in the West Bay financial district of Doha. The 38-story tower features a twisting form that optimizes views of the Arabian Gulf while minimizing solar heat gain through its intelligent facade. The podium houses a luxury hotel, while the upper floors contain residences and office suites. A skybridge connects the tower to a separate parking structure. The project achieved a 20% reduction in energy consumption compared to the base case, thanks to its high-performance envelope and efficient building systems.",
    bodyAr:
      "برج بانوراما الدوحة هو برج متعدد الاستخدامات يقع في الحي المالي بالخليج الغربي في الدوحة. يتميز البرج المكون من 38 طابقاً بشكل لولبي يحسن مناظر الخليج العربي مع تقليل اكتساب الحرارة الشمسية من خلال الواجهة الذكية. يضم الطابق السفلي فندقاً فاخراً، بينما تحتوي الطوابق العليا على وحدات سكنية ومكاتب. يربط جسر جوي البرج بموقف سيارات منفصل. حقق المشروع خفضًا بنسبة 20% في استهلاك الطاقة مقارنة بالحالة الأساسية، بفضل غلافه عالي الأداء وأنظمته الفعالة.",
    status: "ongoing",
    publishedAt: "2024-02-01",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByTypology(typology: string): Project[] {
  return projects.filter((p) => p.typology === typology);
}

export function getFeaturedProjects(count: number = 3): Project[] {
  return [...projects]
    .sort((a, b) => (b.featuredWeight ?? 0) - (a.featuredWeight ?? 0))
    .slice(0, count);
}
