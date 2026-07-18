import { Service } from "@/types";

export const services: Service[] = [
  {
    id: "1",
    slug: "architectural-design",
    nameEn: "Architectural Design",
    nameAr: "التصميم المعماري",
    summaryEn: "From concept to construction documents, we deliver visionary architectural designs that respond to site, climate, and culture.",
    summaryAr: "من المفهوم إلى وثائق البناء، نقدم تصاميم معمارية رؤيوية تستجيب للموقع والمناخ والثقافة.",
    bodyEn:
      "At Green Studio Qatar, our architectural design practice is rooted in a deep understanding of the MENA region's unique environmental and cultural context. We create buildings that are not only visually striking but also performant, sustainable, and deeply connected to their surroundings. Our process is collaborative and iterative, ensuring every project achieves its fullest potential.",
    bodyAr:
      "في جريين ستوديو قطر، تنبثق ممارستنا للتصميم المعماري من فهم عميق للسياق البيئي والثقافي الفريد لمنطقة الشرق الأوسط وشمال أفريقيا. نبني مباني ليست فقط مذهلة بصريًا بل فعالة ومستدامة ومتصلة بعمق بمحيطها. عمليتنا تعاونية وتكرارية، مما يضمن تحقيق كل مشروع لأقصى إمكاناته.",
    heroImage: "https://images.unsplash.com/photo-1487958449943-2429e8be8955?w=1920&q=80",
    deliverables: [
      { nameEn: "Concept Design", nameAr: "التصميم المفاهيمي", descriptionEn: "Massing studies, site analysis, and conceptual diagrams.", descriptionAr: "دراسات الكتلة، تحليل الموقع، والرسوم البيانية المفاهيمية." },
      { nameEn: "Schematic Design", nameAr: "التصميم المبدئي", descriptionEn: "Floor plans, elevations, sections, and material selections.", descriptionAr: "مخططات الطوابق، الواجهات، القطاعات، واختيارات المواد." },
      { nameEn: "Design Development", nameAr: "تطوير التصميم", descriptionEn: "Detailed drawings with structural and MEP coordination.", descriptionAr: "رسومات تفصيلية مع التنسيق الهيكلي والميكانيكي والكهربائي." },
      { nameEn: "Construction Documents", nameAr: "وثائق البناء", descriptionEn: "Permit and construction sets with specifications.", descriptionAr: "مجموعات التصاريح والإنشاءات مع المواصفات." },
    ],
    faqs: [
      { questionEn: "What is the typical design timeline?", questionAr: "ما هو الجدول الزمني النموذجي للتصميم؟", answerEn: "4 to 12 months depending on project complexity.", answerAr: "من 4 إلى 12 شهرًا حسب تعقيد المشروع." },
      { questionEn: "Do you provide sustainable design?", questionAr: "هل تقدمون تصميمًا مستدامًا؟", answerEn: "Yes, sustainability is integrated into every project we undertake.", answerAr: "نعم، الاستدامة جزء لا يتجزأ من كل مشروع نقوم به." },
    ],
    leadArchitectId: "1",
  },
  {
    id: "2",
    slug: "interior-design",
    nameEn: "Interior Design",
    nameAr: "التصميم الداخلي",
    summaryEn: "Spatial experiences that blend contemporary aesthetics with regional craftsmanship.",
    summaryAr: "تجارب مكانية تمزج بين الجماليات المعاصرة والحرفية الإقليمية.",
    bodyEn:
      "Our interior design practice transforms spaces into immersive environments. We draw inspiration from the rich textile traditions, geometric patterns, and material palettes of the Arab world, reinterpreted through a contemporary lens.",
    bodyAr:
      "تحول ممارستنا للتصميم الداخلي المساحات إلى بيئات غامرة. نستلهم الإلهام من تقاليد النسيج الغنية والأنماط الهندسية ولوحات المواد في العالم العربي، مع إعادة تفسيرها من خلال عدسة معاصرة.",
    heroImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=80",
    deliverables: [
      { nameEn: "Concept Design", nameAr: "التصميم المفاهيمي", descriptionEn: "Mood boards, material palettes, and spatial planning.", descriptionAr: "لوحات المزاج، لوحات المواد، والتخطيط المكاني." },
      { nameEn: "Design Development", nameAr: "تطوير التصميم", descriptionEn: "Detailed drawings, FF&E schedules, millwork.", descriptionAr: "رسومات تفصيلية وجداول الأثاث والتجهيزات والنجارة." },
      { nameEn: "Construction Documents", nameAr: "وثائق البناء", descriptionEn: "Plans, elevations, joinery details, and finishing schedules.", descriptionAr: "مخططات، واجهات، تفاصيل النجارة، وجداول التشطيبات." },
      { nameEn: "Installation Oversight", nameAr: "الإشراف على التركيب", descriptionEn: "On-site supervision during installation and styling.", descriptionAr: "الإشراف في الموقع أثناء التركيب والتنسيق." },
    ],
    faqs: [
      { questionEn: "Do you do both residential and commercial interiors?", questionAr: "هل تعملون في المساحات الداخلية السكنية والتجارية؟", answerEn: "Yes, we handle a wide range of interior typologies.", answerAr: "نعم، نتعامل مع مجموعة واسعة من أنواع المساحات الداخلية." },
    ],
    leadArchitectId: "3",
  },
  {
    id: "3",
    slug: "engineering-consultancy",
    nameEn: "Engineering Consultancy",
    nameAr: "الاستشارات الهندسية",
    summaryEn: "Structural, civil, and MEP engineering that ensures safety, efficiency, and constructability.",
    summaryAr: "هندسة إنشائية ومدنية وميكانيكية وكهربائية تضمن السلامة والكفاءة وقابلية التنفيذ.",
    bodyEn:
      "Our engineering team provides expert analysis and design across structural, civil, and MEP disciplines. We leverage advanced simulation tools and deep local knowledge to deliver engineering solutions that are both innovative and practical.",
    bodyAr:
      "يقدم فريقنا الهندسي تحليلاً وتصميماً خبيراً في مجالات الهندسة الإنشائية والمدنية والميكانيكية والكهربائية. نستخدم أدوات محاكاة متقدمة ومعرفة محلية عميقة لتقديم حلول هندسية مبتكرة وعملية.",
    heroImage: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920&q=80",
    deliverables: [
      { nameEn: "Structural Engineering", nameAr: "الهندسة الإنشائية", descriptionEn: "Structural analysis and foundation design.", descriptionAr: "التحليل الإنشائي وتصميم الأساسات." },
      { nameEn: "MEP Engineering", nameAr: "الهندسة الميكانيكية والكهربائية والسباكة", descriptionEn: "Mechanical, electrical, and plumbing systems.", descriptionAr: "تصميم الأنظمة الميكانيكية والكهربائية وأنظمة السباكة." },
      { nameEn: "Civil Engineering", nameAr: "الهندسة المدنية", descriptionEn: "Site grading, drainage, and utility design.", descriptionAr: "تسوية الموقع وتصريف المياه وتصميم المرافق." },
      { nameEn: "Value Engineering", nameAr: "الهندسة القيمية", descriptionEn: "Cost optimization while maintaining quality.", descriptionAr: "تحسين التكاليف مع الحفاظ على الجودة." },
    ],
    faqs: [
      { questionEn: "What engineering software do you use?", questionAr: "ما هي برامج الهندسة التي تستخدمونها؟", answerEn: "ETABS, SAP2000, SAFE, Revit, AutoCAD MEP, and Robot Structural Analysis.", answerAr: "ETABS, SAP2000, SAFE, Revit, AutoCAD MEP, وRobot Structural Analysis." },
    ],
    leadArchitectId: "2",
  },
  {
    id: "4",
    slug: "project-management",
    nameEn: "Project Management",
    nameAr: "إدارة المشاريع",
    summaryEn: "End-to-end project management from feasibility through handover.",
    summaryAr: "إدارة مشاريع شاملة من دراسة الجدوى إلى التسليم.",
    bodyEn:
      "We manage projects with precision. Our team oversees every phase from feasibility to handover. With deep experience in the MENA construction market, we anticipate risks and keep stakeholders aligned.",
    bodyAr:
      "ندير المشاريع بدقة. يشرف فريقنا على كل مرحلة من دراسة الجدوى إلى التسليم. بفضل الخبرة العميقة في سوق البناء في الشرق الأوسط وشمال أفريقيا، نتوقع المخاطر ونحافظ على توافق أصحاب المصلحة.",
    heroImage: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1920&q=80",
    deliverables: [
      { nameEn: "Feasibility Studies", nameAr: "دراسات الجدوى", descriptionEn: "Site evaluation, market analysis, and financial modeling.", descriptionAr: "تقييم الموقع، تحليل السوق، والنمذجة المالية." },
      { nameEn: "Budgeting & Cost Control", nameAr: "إعداد الميزانية والتحكم في التكاليف", descriptionEn: "Detailed estimates and expense tracking.", descriptionAr: "تقديرات مفصلة وتتبع النفقات." },
      { nameEn: "Procurement Management", nameAr: "إدارة المشتريات", descriptionEn: "Tendering and contract administration.", descriptionAr: "المناقصات وإدارة العقود." },
      { nameEn: "Construction Oversight", nameAr: "الإشراف على البناء", descriptionEn: "Schedule management and quality control.", descriptionAr: "إدارة الجدول الزمني ومراقبة الجودة." },
    ],
    faqs: [
      { questionEn: "What project management methodology do you follow?", questionAr: "ما هي منهجية إدارة المشاريع التي تتبعونها؟", answerEn: "PMI standards with a construction-tailored approach.", answerAr: "معايير معهد إدارة المشاريع مع نهج مخصص للبناء." },
    ],
    leadArchitectId: "4",
  },
  {
    id: "5",
    slug: "construction-supervision",
    nameEn: "Construction Supervision",
    nameAr: "الإشراف على البناء",
    summaryEn: "On-site supervision to ensure design intent is faithfully executed.",
    summaryAr: "إشراف ميداني لضمان تنفيذ التصميم بدقة وجودة.",
    bodyEn:
      "Our construction supervision team provides on-site representation to ensure every element is built as intended. We conduct regular inspections, review submittals, coordinate with contractors, and provide detailed progress reports.",
    bodyAr:
      "يوفر فريق الإشراف على البناء لدينا تمثيلاً ميدانياً لضمان بناء كل عنصر كما هو مقصود. نقوم بعمليات تفتيش منتظمة ومراجعة المقدمات والتنسيق مع المقاولين وتقديم تقارير مفصلة.",
    heroImage: "https://images.unsplash.com/photo-1558618666-fcd25c2f8e08?w=1920&q=80",
    deliverables: [
      { nameEn: "Site Monitoring", nameAr: "مراقبة الموقع", descriptionEn: "Regular site visits and inspections.", descriptionAr: "زيارات موقعية وتفتيشات منتظمة." },
      { nameEn: "Quality Assurance", nameAr: "ضمان الجودة", descriptionEn: "Material testing and workmanship checks.", descriptionAr: "اختبار المواد والتحقق من جودة التنفيذ." },
      { nameEn: "Progress Reporting", nameAr: "تقارير التقدم", descriptionEn: "Weekly/monthly reports with photos.", descriptionAr: "تقارير أسبوعية/شهرية مع توثيق بالصور." },
      { nameEn: "Snagging & Handover", nameAr: "قائمة العيوب والتسليم", descriptionEn: "Defect identification and final handover.", descriptionAr: "تحديد العيوب والتسليم النهائي." },
    ],
    faqs: [
      { questionEn: "Can you supervise projects not originally designed by you?", questionAr: "هل يمكنكم الإشراف على مشاريع لم تصمموها؟", answerEn: "Yes, we frequently serve as supervision consultant on projects by other firms.", answerAr: "نعم، نعمل غالبًا كمستشار اشراف في مشاريع من مكاتب أخرى." },
    ],
    leadArchitectId: "4",
  },
];

export const serviceMap = new Map<string, Service>(
  services.map((s) => [s.slug, s])
);

export function getServiceBySlug(slug: string): Service | undefined {
  return serviceMap.get(slug);
}
