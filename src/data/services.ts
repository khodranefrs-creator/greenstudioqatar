import { Service } from "@/types";

// =============================================================================
// SERVICES BASED ON VERIFIED COMPANY ACTIVITIES
// =============================================================================
// Categories verified from Green Studio for Design and Consultancy (Qatar):
//
// 1. Architecture & Design
//    - Architectural Design, Concept Design, Interior Design, Engineering Design
//
// 2. Engineering Consultancy
//    - Civil Engineering, Electrical Engineering, Engineering Consultations
//
// 3. Project Supervision & Management
//    - Construction Supervision, Project Follow-up, Project Management
//
// 4. Interior Design
//    - Interior Spaces, Decoration, Customized Design Solutions
// =============================================================================

export const services: Service[] = [
  {
    id: "1",
    slug: "architectural-design",
    nameEn: "Architectural Design",
    nameAr: "التصميم المعماري",
    taglineEn: "Creating spaces where form, function and identity meet.",
    taglineAr: "إنشاء مساحات يلتقي فيها الشكل والوظيفة والهوية.",
    summaryEn: "Comprehensive architectural design from concept through construction documentation.",
    summaryAr: "تصميم معماري شامل من المفهوم إلى توثيق البناء.",
    bodyEn:
      "Green Studio for Design and Consultancy provides architectural design services that respond to site, climate, and culture. Our design process covers concept development, schematic design, design development, and construction documentation. We work across residential, commercial, and institutional typologies in Qatar and the MENA region.",
    bodyAr:
      "توفر جريين ستوديو للتصميم والاستشارات خدمات التصميم المعماري التي تستجيب للموقع والمناخ والثقافة. تغطي عملية التصميم لدينا تطوير المفهوم والتصميم المبدئي وتطوير التصميم وتوثيق البناء. نعمل عبر الأنواع السكنية والتجارية والمؤسسية في قطر ومنطقة الشرق الأوسط وشمال أفريقيا.",
    heroImage: "",
    deliverables: [
      { nameEn: "Concept Design", nameAr: "التصميم المفاهيمي", descriptionEn: "Site analysis, massing studies, and conceptual presentation.", descriptionAr: "تحليل الموقع ودراسات الكتلة والعروض المفاهيمية." },
      { nameEn: "Schematic Design", nameAr: "التصميم المبدئي", descriptionEn: "Floor plans, elevations, sections, and material selections.", descriptionAr: "مخططات الطوابق والواجهات والقطاعات واختيارات المواد." },
      { nameEn: "Design Development", nameAr: "تطوير التصميم", descriptionEn: "Detailed drawings with structural and MEP coordination.", descriptionAr: "رسومات مفصلة مع التنسيق الهيكلي والميكانيكي والكهربائي." },
      { nameEn: "Construction Documents", nameAr: "وثائق البناء", descriptionEn: "Permit sets and construction documentation.", descriptionAr: "مجموعات التصاريح وتوثيق البناء." },
    ],
    faqs: [
      { questionEn: "What is the typical design timeline?", questionAr: "ما هو الجدول الزمني النموذجي للتصميم؟", answerEn: "Depending on project scale and complexity, architectural design typically takes 4-12 months.", answerAr: "اعتمادًا على حجم وتعقيد المشروع، يستغرق التصميم المعماري عادةً 4-12 شهرًا." },
    ],
    leadArchitectId: undefined,
  },
  {
    id: "2",
    slug: "interior-design",
    nameEn: "Interior Design",
    nameAr: "التصميم الداخلي",
    taglineEn: "Crafting refined environments with purpose and character.",
    taglineAr: "تصميم بيئات راقية تجمع بين الغرض والشخصية.",
    summaryEn: "Interior spaces, decoration, and customized design solutions for residential and commercial projects.",
    summaryAr: "مساحات داخلية وديكور وحلول تصميم مخصصة للمشاريع السكنية والتجارية.",
    bodyEn:
      "Our interior design service covers interior spaces, decoration, and customized design solutions. We create environments that balance aesthetics with functionality, drawing on regional craftsmanship and contemporary design principles. Services include spatial planning, material selection, FF&E specifications, and installation oversight.",
    bodyAr:
      "تغطي خدمة التصميم الداخلي لدينا المساحات الداخلية والديكور وحلول التصميم المخصصة. نبتكر بيئات توازن بين الجماليات والوظيفة، مستفيدين من الحرفية الإقليمية ومبادئ التصميم المعاصر. تشمل الخدمات التخطيط المكاني واختيار المواد ومواصفات الأثاث والتجهيزات والإشراف على التركيب.",
    heroImage: "",
    deliverables: [
      { nameEn: "Interior Spaces", nameAr: "المساحات الداخلية", descriptionEn: "Spatial planning and layout design.", descriptionAr: "التخطيط المكاني وتصميم التوزيع." },
      { nameEn: "Decoration", nameAr: "الديكور", descriptionEn: "Material selection, finishes, and styling.", descriptionAr: "اختيار المواد والتشطيبات والتنسيق." },
      { nameEn: "Customized Solutions", nameAr: "حلول مخصصة", descriptionEn: "Bespoke furniture, millwork, and design elements.", descriptionAr: "أثاث مخصص ونجارة وعناصر تصميمية." },
      { nameEn: "Installation Oversight", nameAr: "الإشراف على التركيب", descriptionEn: "On-site supervision during fit-out.", descriptionAr: "الإشراف في الموقع أثناء التجهيز." },
    ],
    faqs: [
      { questionEn: "Do you handle both residential and commercial interiors?", questionAr: "هل تعملون في التصميم الداخلي السكني والتجاري؟", answerEn: "Yes, we work across residential, commercial, and hospitality interior typologies.", answerAr: "نعم، نعمل عبر أنواع التصميم الداخلي السكنية والتجارية وضيافة." },
    ],
    leadArchitectId: undefined,
  },
  {
    id: "3",
    slug: "engineering-consultancy",
    nameEn: "Engineering Consultancy",
    nameAr: "الاستشارات الهندسية",
    taglineEn: "Technical solutions built for performance and reliability.",
    taglineAr: "حلول فنية مصممة للأداء والموثوقية.",
    summaryEn: "Civil engineering, electrical engineering, and comprehensive engineering consultations.",
    summaryAr: "هندسة مدنية وهندسة كهربائية واستشارات هندسية شاملة.",
    bodyEn:
      "Green Studio provides engineering consultancy services including civil engineering, electrical engineering, and general engineering consultations. We deliver technical analysis and design solutions that ensure safety, efficiency, and compliance with local regulations and international standards.",
    bodyAr:
      "توفر جريين ستوديو خدمات الاستشارات الهندسية بما في ذلك الهندسة المدنية والهندسة الكهربائية والاستشارات الهندسية العامة. نقدم حلول التحليل الفني والتصميم التي تضمن السلامة والكفاءة والامتثال للوائح المحلية والمعايير الدولية.",
    heroImage: "",
    deliverables: [
      { nameEn: "Civil Engineering", nameAr: "الهندسة المدنية", descriptionEn: "Structural analysis, foundation design, and site works.", descriptionAr: "التحليل الإنشائي وتصميم الأساسات والأعمال الموقعية." },
      { nameEn: "Electrical Engineering", nameAr: "الهندسة الكهربائية", descriptionEn: "Electrical systems design and power distribution.", descriptionAr: "تصميم الأنظمة الكهربائية وتوزيع الطاقة." },
      { nameEn: "Engineering Consultations", nameAr: "الاستشارات الهندسية", descriptionEn: "Technical advisory and feasibility assessments.", descriptionAr: "الاستشارات الفنية وتقييمات الجدوى." },
    ],
    faqs: [
      { questionEn: "Do you provide standalone engineering consultations?", questionAr: "هل تقدمون استشارات هندسية مستقلة؟", answerEn: "Yes, we offer engineering consultations as part of our service portfolio.", answerAr: "نعم، نقدم الاستشارات الهندسية كجزء من محفظة خدماتنا." },
    ],
    leadArchitectId: undefined,
  },
  {
    id: "4",
    slug: "project-management",
    nameEn: "Project Supervision",
    nameAr: "إدارة المشاريع",
    taglineEn: "Ensuring every detail reaches the intended vision.",
    taglineAr: "ضمان وصول كل تفصيل إلى الرؤية المقصودة.",
    summaryEn: "End-to-end project management and project follow-up from inception to handover.",
    summaryAr: "إدارة مشاريع ومتابعة شاملة من البداية إلى التسليم.",
    bodyEn:
      "Our project management service covers the full lifecycle of a construction project. This includes feasibility assessment, procurement management, construction oversight, project follow-up, and final handover. We keep projects on schedule, within budget, and to the required quality standards.",
    bodyAr:
      "تغطي خدمة إدارة المشاريع دورة حياة مشروع البناء كاملة. تشمل تقييم الجدوى وإدارة المشتريات والإشراف على البناء ومتابعة المشاريع والتسليم النهائي. نحافظ على المشاريع ضمن الجدول الزمني والميزانية ومعايير الجودة المطلوبة.",
    heroImage: "",
    deliverables: [
      { nameEn: "Feasibility Assessment", nameAr: "تقييم الجدوى", descriptionEn: "Site evaluation and project feasibility analysis.", descriptionAr: "تقييم الموقع وتحليل جدوى المشروع." },
      { nameEn: "Project Follow-up", nameAr: "متابعة المشاريع", descriptionEn: "Ongoing monitoring and progress reporting.", descriptionAr: "المراقبة المستمرة وتقارير التقدم." },
      { nameEn: "Construction Oversight", nameAr: "الإشراف على البناء", descriptionEn: "Quality control and schedule management.", descriptionAr: "مراقبة الجودة وإدارة الجدول الزمني." },
      { nameEn: "Handover", nameAr: "التسليم", descriptionEn: "Final inspection and project handover.", descriptionAr: "الفحص النهائي وتسليم المشروع." },
    ],
    faqs: [
      { questionEn: "Do you manage projects not designed by your firm?", questionAr: "هل تديرون مشاريع لم تُصمم من مكتبكم؟", answerEn: "Yes, we provide project management services for projects by other design firms as well.", answerAr: "نعم، نقدم خدمات إدارة المشاريع للمشاريع التي تصممها مكاتب أخرى أيضًا." },
    ],
    leadArchitectId: undefined,
  },
];

export const serviceMap = new Map<string, Service>(
  services.map((s) => [s.slug, s])
);

export function getServiceBySlug(slug: string): Service | undefined {
  return serviceMap.get(slug);
}
