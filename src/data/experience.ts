import type { Localized } from '@/i18n/locale';

export type Role = {
  company: string;
  title: Localized;
  /** ISO year-month, formatted per locale at render time. */
  start: string;
  end?: string;
  points: Localized[];
};

const frontEndDeveloper: Localized = { en: 'Front-End Developer', ar: 'تطوير الواجهات الأمامية' };

export const roles: Role[] = [
  {
    company: 'Quotem',
    title: frontEndDeveloper,
    start: '2024-05',
    points: [
      {
        en: 'Architect and build frontend modules for a procurement platform: requisitions, quotation comparison and data-dense dashboards.',
        ar: 'تصميم وبناء وحدات الواجهة لمنصة مشتريات: طلبات الشراء، ومقارنة عروض الأسعار، ولوحات تحكم غنية بالبيانات.',
      },
      {
        en: 'Streamlined server state and routing with TanStack Query and Router, removing redundant network calls.',
        ar: 'تنظيم حالة الخادم والتوجيه باستخدام TanStack Query و Router، مع إزالة طلبات الشبكة المكررة.',
      },
      {
        en: 'Built drag-and-drop boards (dnd-kit), guided onboarding tours and dynamic form validation (React Hook Form + Yup).',
        ar: 'بناء لوحات سحب وإفلات (dnd-kit)، وجولات تعريفية للمستخدمين، وتحقق ديناميكي من النماذج (React Hook Form + Yup).',
      },
      {
        en: 'Delivered full English/Arabic support with RTL, wrote architecture docs (VitePress, Mermaid) and integrated Flipt feature flags.',
        ar: 'دعم كامل للإنجليزية والعربية مع RTL، وكتابة توثيق البنية (VitePress و Mermaid)، ودمج Flipt لإدارة الـ feature flags.',
      },
      {
        en: 'Coordinate the frontend team: sprint planning, code reviews and work with backend and product.',
        ar: 'تنسيق فريق الواجهات الأمامية: تخطيط الـ sprints، ومراجعة الكود، والعمل مع فرق الـ backend والمنتج.',
      },
    ],
  },
  {
    company: 'ITSpark',
    title: frontEndDeveloper,
    start: '2024-01',
    end: '2024-05',
    points: [
      {
        en: 'Shipped features and fixed critical bugs on client apps such as 3ayzdoctor, improving performance and accessibility.',
        ar: 'تطوير ميزات وإصلاح أخطاء حرجة في تطبيقات العملاء مثل 3ayzdoctor، مع تحسين الأداء وإمكانية الوصول.',
      },
      {
        en: 'Added Google Schema markup across client platforms to improve indexing and search visibility.',
        ar: 'إضافة Google Schema markup لمنصات العملاء لتحسين الفهرسة والظهور في نتائج البحث.',
      },
      {
        en: 'Customized WordPress and Shopify platforms and turned client requirements into wireframes and Figma designs.',
        ar: 'تخصيص منصات WordPress و Shopify، وتحويل متطلبات العملاء إلى wireframes وتصاميم Figma.',
      },
    ],
  },
  {
    company: 'Artra Trading',
    title: frontEndDeveloper,
    start: '2023-09',
    end: '2023-12',
    points: [
      {
        en: 'Took client platforms from requirements to production release (Al-Rashed, Artra Trading, MasaderEgy).',
        ar: 'تنفيذ منصات العملاء من تحليل المتطلبات حتى الإطلاق (Al-Rashed و Artra Trading و MasaderEgy).',
      },
      {
        en: 'Maintained legacy platforms and added new modules while keeping the UI responsive.',
        ar: 'صيانة منصات قديمة وإضافة وحدات جديدة مع الحفاظ على تجاوب الواجهة.',
      },
    ],
  },
  {
    company: 'Super Online Academy',
    title: { en: 'Implementation Engineer', ar: 'هندسة التنفيذ' },
    start: '2022-07',
    end: '2022-09',
    points: [
      {
        en: 'Turned client requirements into technical documentation and ran functional QA before releases.',
        ar: 'تحويل متطلبات العملاء إلى توثيق تقني، وإجراء اختبارات الجودة الوظيفية قبل الإصدارات.',
      },
    ],
  },
];

export const education = {
  degree: {
    en: 'B.Sc. Software Industry & Multimedia',
    ar: 'بكالوريوس صناعة البرمجيات والوسائط المتعددة',
  } satisfies Localized,
  school: { en: 'Alexandria University', ar: 'جامعة الإسكندرية' } satisfies Localized,
  years: '2018 – 2022',
  honors: { en: 'Graduated with Distinction', ar: 'التقدير العام: امتياز' } satisfies Localized,
  gpa: { value: 3.6, max: 4 },
};
