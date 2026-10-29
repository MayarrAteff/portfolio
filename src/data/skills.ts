import type { SimpleIcon } from 'simple-icons';
import {
  siAxios,
  siBootstrap,
  siClickup,
  siFigma,
  siGithub,
  siHtml5,
  siI18next,
  siJavascript,
  siMermaid,
  siMui,
  siPhp,
  siPostgresql,
  siReact,
  siReacthookform,
  siReactquery,
  siRedux,
  siSass,
  siShopify,
  siSupabase,
  siTailwindcss,
  siTanstack,
  siTypescript,
  siVite,
  siVitepress,
  siWordpress,
} from 'simple-icons';

export type SkillGroup = 'frontend' | 'data' | 'architecture' | 'backend' | 'design';

export type Skill = {
  name: string;
  group: SkillGroup;
  /** Brand logo from Simple Icons. Tools without one get a lettered badge in their group color. */
  icon?: SimpleIcon;
  /** Extra words the search matches, e.g. "rtl" finds React Intl. */
  keywords?: string[];
};

export const skillGroups: SkillGroup[] = ['frontend', 'data', 'architecture', 'backend', 'design'];

export const skills: Skill[] = [
  { name: 'React', group: 'frontend', icon: siReact, keywords: ['hooks', 'jsx'] },
  { name: 'TypeScript', group: 'frontend', icon: siTypescript, keywords: ['types', 'ts'] },
  { name: 'JavaScript (ES6+)', group: 'frontend', icon: siJavascript, keywords: ['js'] },
  { name: 'Vite', group: 'frontend', icon: siVite, keywords: ['build', 'bundler'] },
  { name: 'HTML5', group: 'frontend', icon: siHtml5, keywords: ['semantic', 'a11y', 'accessibility'] },
  { name: 'CSS3 / Sass', group: 'frontend', icon: siSass, keywords: ['css', 'scss', 'styles'] },
  { name: 'Tailwind CSS', group: 'frontend', icon: siTailwindcss, keywords: ['styles', 'utility'] },
  { name: 'Material UI', group: 'frontend', icon: siMui, keywords: ['mui', 'components'] },
  { name: 'Bootstrap', group: 'frontend', icon: siBootstrap, keywords: ['styles'] },
  { name: 'TanStack Query', group: 'data', icon: siReactquery, keywords: ['react query', 'server state', 'cache'] },
  { name: 'TanStack Router', group: 'data', icon: siTanstack, keywords: ['routing', 'query params'] },
  { name: 'Redux Toolkit', group: 'data', icon: siRedux, keywords: ['state', 'rtk'] },
  { name: 'Axios', group: 'data', icon: siAxios, keywords: ['http', 'api', 'interceptors'] },
  { name: 'Context API', group: 'data', icon: siReact, keywords: ['state'] },
  { name: 'React Intl', group: 'architecture', icon: siI18next, keywords: ['i18n', 'rtl', 'arabic', 'translation'] },
  { name: 'dnd-kit', group: 'architecture', keywords: ['drag and drop', 'kanban'] },
  { name: 'React Hook Form + Yup', group: 'architecture', icon: siReacthookform, keywords: ['forms', 'validation'] },
  { name: 'VitePress', group: 'architecture', icon: siVitepress, keywords: ['docs', 'documentation'] },
  { name: 'Mermaid', group: 'architecture', icon: siMermaid, keywords: ['docs', 'diagrams'] },
  { name: 'Flipt', group: 'architecture', keywords: ['feature flags'] },
  { name: 'Supabase', group: 'backend', icon: siSupabase, keywords: ['auth', 'realtime', 'storage', 'rls'] },
  { name: 'PostgreSQL / SQL', group: 'backend', icon: siPostgresql, keywords: ['database', 'rls', 'query'] },
  { name: 'PHP (basic)', group: 'backend', icon: siPhp },
  { name: 'WordPress', group: 'backend', icon: siWordpress, keywords: ['cms'] },
  { name: 'Shopify', group: 'backend', icon: siShopify, keywords: ['e-commerce', 'cms'] },
  { name: 'Figma', group: 'design', icon: siFigma, keywords: ['ui', 'prototype', 'wireframes'] },
  { name: 'Adobe Illustrator', group: 'design', keywords: ['graphics'] },
  { name: 'Git & GitHub', group: 'design', icon: siGithub, keywords: ['version control', 'code review'] },
  { name: 'Jira / ClickUp', group: 'design', icon: siClickup, keywords: ['planning', 'sprints'] },
  { name: 'Agile / Scrum', group: 'design', keywords: ['sprints', 'planning'] },
];

/** The hero's "Daily stack" card. */
export const dailyStack: { name: string; icon: SimpleIcon }[] = [
  { name: 'React', icon: siReact },
  { name: 'TypeScript', icon: siTypescript },
  { name: 'Tailwind CSS', icon: siTailwindcss },
  { name: 'TanStack Query', icon: siReactquery },
  { name: 'Material UI', icon: siMui },
  { name: 'GitHub', icon: siGithub },
  { name: 'Vite', icon: siVite },
  { name: 'Figma', icon: siFigma },
];
