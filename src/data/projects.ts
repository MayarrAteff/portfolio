import type { Localized } from '@/i18n/locale';

export const hireflow = {
  name: 'HireFlow',
  tagline: {
    en: 'A multi-portal hiring platform for recruiters, candidates and admins.',
    ar: 'منصة توظيف متعددة البوابات لمسؤولي التوظيف والمرشحين والمشرفين.',
  } satisfies Localized,
  live: 'https://hireflow-sigma-nine.vercel.app/',
  repo: 'https://github.com/MayarrAteff/hireflow',
  problem: {
    en: 'Hiring is a pipeline with three very different users. Recruiters need speed and an overview, candidates need clarity, and admins need control, all in one codebase without the portals leaking into each other.',
    ar: 'التوظيف مسار فيه ثلاثة أنواع مختلفة جدًا من المستخدمين. مسؤول التوظيف يحتاج السرعة ورؤية شاملة، والمرشح يحتاج الوضوح، والمشرف يحتاج التحكم، وكل ذلك في كود واحد دون أن تتداخل البوابات.',
  } satisfies Localized,
  decisions: [
    {
      en: 'Row-level security in Postgres, so each role’s permissions live in the database, not only in the UI.',
      ar: 'row-level security في Postgres، لتكون صلاحيات كل دور في قاعدة البيانات وليس في الواجهة فقط.',
    },
    {
      en: 'A drag-and-drop hiring board kept in sync across recruiters with Supabase Realtime.',
      ar: 'لوحة توظيف بالسحب والإفلات تبقى متزامنة بين مسؤولي التوظيف عبر Supabase Realtime.',
    },
    {
      en: 'File-based routes with a guard and a theme per role; each portal is code-split.',
      ar: 'توجيه مبني على الملفات مع حماية وثيم لكل دور، وكل بوابة مقسّمة في حزمة مستقلة.',
    },
    {
      en: 'English and Arabic with RTL from day one, not bolted on later.',
      ar: 'الإنجليزية والعربية مع RTL من اليوم الأول، وليس كإضافة لاحقة.',
    },
  ] satisfies Localized[],
  learned: {
    en: 'Designing the data model and its security rules first made every feature after it faster to build.',
    ar: 'تصميم نموذج البيانات وقواعد أمانه أولًا جعل بناء كل ميزة بعده أسرع.',
  } satisfies Localized,
  stack: [
    'React',
    'TypeScript',
    'TanStack Router',
    'TanStack Query',
    'Redux Toolkit',
    'Supabase',
    'MUI',
    'Tailwind CSS',
    'dnd-kit',
    'react-intl',
  ],
};
