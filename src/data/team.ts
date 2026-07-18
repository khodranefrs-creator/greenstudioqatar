import { TeamMember } from "@/types";

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Omar Al-Jabri",
    roleEn: "Founder & Managing Director",
    roleAr: "المؤسس والمدير العام",
    bioEn:
      "Omar is the founder and visionary behind Green Studio Qatar. With over 20 years of experience in architecture and engineering, he has led projects across four continents. He holds a Master's in Architecture from the University of Cambridge and is a licensed architect in Qatar and the UK. Omar is passionate about creating innovative designs that respect cultural heritage while embracing modernity.",
    bioAr:
      "عمر هو مؤسس وصاحب الرؤية وراء جريين ستوديو قطر. بخبرة تزيد عن 20 عامًا في الهندسة المعمارية والهندسة، قاد مشاريع في أربع قارات. حاصل على ماجستير في الهندسة المعمارية من جامعة كامبريدج وهو مهندس معماري مرخص في قطر والمملكة المتحدة. عمر شغوف بخلق تصاميم مبتكرة تحترم التراث الثقافي مع تبني العصرنة.",
    photo: "https://images.unsplash.com/photo-1560250097-0b80328b3880?w=400&q=80",
    credentials: ["M.Arch Cambridge", "LEED AP", "RIBA", "QSE"],
    linkedServices: ["architectural-design"],
  },
  {
    id: "2",
    name: "Dr. Layla Hassan",
    roleEn: "Director of Engineering",
    roleAr: "مديرة الهندسة",
    bioEn:
      "Layla is a structural engineer with a PhD from ETH Zurich and 15 years of experience in high-rise and complex structures. She has worked on iconic towers in Dubai, Doha, and Singapore. She is an expert in performance-based seismic design and progressive collapse analysis.",
    bioAr:
      "ليلى هي مهندسة إنشائية حاصلة على درجة الدكتوراه من ETH زيورخ و 15 عامًا من الخبرة في الهياكل الشاهقة والمعقدة. عملت على أبراج مميزة في دبي والدوحة وسنغافورة. وهي خبيرة في التصميم الزلزالي القائم على الأداء وتحليل الانهيار التدريجي.",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    credentials: ["PhD ETH Zurich", "P.Eng", "MICE", "LEED AP"],
    linkedServices: ["engineering-consultancy"],
  },
  {
    id: "3",
    name: "Nadia Khalil",
    roleEn: "Head of Interior Design",
    roleAr: "رئيسة قسم التصميم الداخلي",
    bioEn:
      "Nadia brings more than 12 years of interior design experience to the team. A graduate of the Royal College of Arts in London, she has worked with top firms in Paris and Dubai. Nadia specializes in luxury hospitality and high-end residential projects.",
    bioAr:
      "نادية تمتلك أكثر من 12 عامًا من الخبرة في التصميم الداخلي. خريجة الكلية الملكية للفنون في لندن، عملت مع أفضل الشركات في باريس ودبي. تتخصص نادية في مشاريع الضيافة الفاخرة والسكنية الراقية.",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
    credentials: ["MA RCA London", "NCIDQ", "WELL AP"],
    linkedServices: ["interior-design"],
  },
  {
    id: "4",
    name: "Yousef Al-Mansouri",
    roleEn: "Project Manager Director",
    roleAr: "مدير إدارة المشاريع",
    bioEn:
      "Yousef is a certified PMP with 18 years of experience managing large-scale construction projects. He has overseen the delivery of over $2B in construction value across the GCC. He specializes in fast-track project delivery and risk management.",
    bioAr:
      "يوسف حاصل على شهادة إدارة المشاريع الاحترافية مع 18 عامًا من الخبرة في إدارة مشاريع البناء واسعة النطاق. أشرف على تسليم مشاريع تجاوزت قيمتها 2 مليار دولار في دول مجلس التعاون الخليجي. يتخصص في التسليم السريع للمشاريع وإدارة المخاطر.",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    credentials: ["PMP", "MSc Project Mgmt", "LEED AP", "QMS Lead Auditor"],
    linkedServices: ["project-management", "construction-supervision"],
  },
  {
    id: "5",
    name: "Sara Fuad",
    roleEn: "Business Development Director",
    roleAr: "مديرة تطوير الأعمال",
    bioEn:
      "Sara leads the firm's business development and client relations. With a background in architecture and an MBA from INSEAD, she bridges the gap between technical excellence and commercial strategy. She has secured some of the firm's largest partnerships in the region.",
    bioAr:
      "سارة تقود تطوير الأعمال وعلاقات العملاء في الشركة. بخلفيتها في الهندسة المعمارية وماجستير إدارة الأعمال من INSEAD، تسد الفجوة بين التميز التقني والاستراتيجية التجارية. حصلت على بعض من أكبر الشراكات للشركة في المنطقة.",
    photo: "https://images.unsplash.com/photo-1573497019940-1c8686566db2?w=400&q=80",
    credentials: ["MBA INSEAD", "B.Arch", "Cert. Marketing Mgmt"],
    linkedServices: [],
  },
];

export const teamMap = new Map<string, TeamMember>(
  teamMembers.map((t) => [t.id, t])
);
