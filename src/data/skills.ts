export type SkillGroup = 'frontend' | 'data' | 'architecture' | 'backend' | 'design';

export type Skill = {
  name: string;
  group: SkillGroup;
  /** Extra words the Skills Lab filter matches, e.g. "rtl" finds React Intl. */
  keywords?: string[];
};

export const skillGroups: SkillGroup[] = ['frontend', 'data', 'architecture', 'backend', 'design'];

export const skills: Skill[] = [
  { name: 'React', group: 'frontend', keywords: ['hooks', 'jsx'] },
  { name: 'TypeScript', group: 'frontend', keywords: ['types', 'ts'] },
  { name: 'JavaScript (ES6+)', group: 'frontend', keywords: ['js'] },
  { name: 'Vite', group: 'frontend', keywords: ['build', 'bundler'] },
  { name: 'HTML5', group: 'frontend', keywords: ['semantic', 'a11y'] },
  { name: 'CSS3 / Sass', group: 'frontend', keywords: ['scss', 'styles'] },
  { name: 'Tailwind CSS', group: 'frontend', keywords: ['styles', 'utility'] },
  { name: 'Material UI', group: 'frontend', keywords: ['mui', 'components'] },
  { name: 'Bootstrap', group: 'frontend', keywords: ['styles'] },
  { name: 'TanStack Query', group: 'data', keywords: ['react query', 'server state', 'cache'] },
  { name: 'TanStack Router', group: 'data', keywords: ['routing', 'query params'] },
  { name: 'Redux Toolkit', group: 'data', keywords: ['state', 'rtk'] },
  { name: 'Axios', group: 'data', keywords: ['http', 'api', 'interceptors'] },
  { name: 'Context API', group: 'data', keywords: ['state'] },
  { name: 'React Intl', group: 'architecture', keywords: ['i18n', 'rtl', 'arabic', 'translation'] },
  { name: 'dnd-kit', group: 'architecture', keywords: ['drag and drop', 'kanban'] },
  { name: 'React Hook Form + Yup', group: 'architecture', keywords: ['forms', 'validation'] },
  { name: 'VitePress', group: 'architecture', keywords: ['docs', 'documentation'] },
  { name: 'Mermaid', group: 'architecture', keywords: ['docs', 'diagrams'] },
  { name: 'Flipt', group: 'architecture', keywords: ['feature flags'] },
  { name: 'Supabase', group: 'backend', keywords: ['auth', 'realtime', 'storage', 'rls'] },
  { name: 'PostgreSQL / SQL', group: 'backend', keywords: ['database', 'rls', 'query'] },
  { name: 'PHP (basic)', group: 'backend' },
  { name: 'WordPress', group: 'backend', keywords: ['cms'] },
  { name: 'Shopify', group: 'backend', keywords: ['e-commerce', 'cms'] },
  { name: 'Figma', group: 'design', keywords: ['ui', 'prototype', 'wireframes'] },
  { name: 'Adobe Illustrator', group: 'design', keywords: ['graphics'] },
  { name: 'Git & GitHub', group: 'design', keywords: ['version control', 'code review'] },
  { name: 'Jira / ClickUp', group: 'design', keywords: ['planning', 'sprints'] },
  { name: 'Agile / Scrum', group: 'design', keywords: ['sprints', 'planning'] },
];
