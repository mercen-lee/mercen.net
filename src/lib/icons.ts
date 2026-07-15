import type { LinkItem, ReferenceChip, ReferenceType } from './content';

export type IconDescriptor = {
  src: string;
  label: string;
};

const iconModules = import.meta.glob<string>('../../assets/icons/*.svg', {
  eager: true,
  import: 'default',
  query: '?url',
});

const iconUrls = new Map(
  Object.entries(iconModules).map(([modulePath, url]) => [modulePath.split('/').pop()?.replace(/\.svg$/, ''), url]),
);

function icon(fileName: string, label: string): IconDescriptor {
  const src = iconUrls.get(fileName);
  if (!src) throw new Error(`Missing icon asset: ${fileName}.svg`);

  return {
    src,
    label,
  };
}

const icons = {
  activity: icon('newspaper', 'Activity'),
  apple: icon('brand-apple', 'Apple'),
  award: icon('award', 'Award'),
  aws: icon('brand-aws', 'AWS'),
  badge: icon('badge-check', 'Credential'),
  birth: icon('calendar-days', 'Date of birth'),
  book: icon('book-open', 'Document'),
  building: icon('building-2', 'Organization'),
  certificate: icon('id-card', 'Certificate'),
  code: icon('code-xml', 'Code'),
  email: icon('mail', 'Email'),
  external: icon('external-link', 'External link'),
  file: icon('file-text', 'Resource'),
  github: icon('brand-github', 'GitHub'),
  globe: icon('globe', 'Website'),
  graduation: icon('graduation-cap', 'Education'),
  language: icon('languages', 'Language'),
  linkedin: icon('brand-linkedin', 'LinkedIn'),
  microsoft: icon('brand-microsoft', 'Microsoft'),
  package: icon('package', 'Package'),
  samsung: icon('brand-samsung', 'Samsung'),
  school: icon('school', 'School'),
  shield: icon('shield-check', 'Verification'),
  trophy: icon('trophy', 'Competition'),
  work: icon('briefcase-business', 'Experience'),
} as const;

export function contactIcon(kind: 'email' | 'github' | 'linkedin' | 'birth'): IconDescriptor {
  return icons[kind];
}

export function iconForActivity(title: string): IconDescriptor {
  if (includesAny(title, ['Apple', 'WWDC'])) return icons.apple;
  return icons.activity;
}

export function iconForEducation(item: { name: string }): IconDescriptor {
  if (includesAny(item.name, ['대학교', '교육원', 'University', 'Institute'])) return icons.graduation;
  return icons.school;
}

export function iconForCareer(item: { company: string; display_name?: string }): IconDescriptor {
  const text = `${item.display_name ?? ''} ${item.company}`;
  if (includesAny(text, ['Pulzze', 'WHOFA', 'NextGen', '넥스트젠', '후파'])) return icons.building;
  return icons.work;
}

export function iconForAward(item: { name: string; level?: string }): IconDescriptor {
  const text = `${item.name} ${item.level ?? ''}`;
  if (includesAny(text, ['Apple', 'WWDC', 'Swift Student Challenge'])) return icons.apple;
  if (includesAny(text, ['Microsoft'])) return icons.microsoft;
  if (includesAny(text, ['삼성', 'Samsung'])) return icons.samsung;
  if (includesAny(text, ['AWS', 'Amazon'])) return icons.aws;
  if (includesAny(text, ['해커톤', 'Hackathon', '하이톤'])) return icons.code;
  return icons.trophy;
}

export function iconForLicense(item: { name: string; issuer?: string }): IconDescriptor {
  const text = `${item.name} ${item.issuer ?? ''}`;
  if (includesAny(text, ['Microsoft'])) return icons.microsoft;
  if (includesAny(text, ['TOEIC', 'ETS'])) return icons.language;
  if (includesAny(text, ['정보처리', '한국산업인력공단', 'Information Processing', 'Human Resources Development Service'])) {
    return icons.shield;
  }
  if (includesAny(text, ['TOPCIT'])) return icons.certificate;
  return icons.badge;
}

export function iconForLink(link: LinkItem): IconDescriptor {
  const text = `${link.label} ${link.url}`;
  if (includesAny(text, ['github.com', 'GitHub', '소스 코드', '공개 repo', 'Source Code', 'Public Repository'])) {
    return icons.github;
  }
  if (includesAny(text, ['pub.dev', 'Pub'])) return icons.package;
  if (includesAny(text, ['기사', 'Article'])) return icons.book;
  if (includesAny(text, ['자료', 'Materials'])) return icons.file;
  if (includesAny(text, ['웹 서비스', '웹사이트', '홈페이지', 'Web Service', 'Website'])) return icons.globe;
  if (includesAny(text, ['회고록', 'Retrospective', 'blog.'])) return icons.book;
  return icons.external;
}

export function iconForReferenceChip(chip: ReferenceChip): IconDescriptor {
  return iconForReferenceType(chip.type);
}

function iconForReferenceType(type: ReferenceType): IconDescriptor {
  switch (type) {
    case 'education':
      return icons.school;
    case 'career':
      return icons.building;
    case 'award':
      return icons.trophy;
    case 'license':
      return icons.badge;
    case 'project':
      return icons.code;
  }
}

function includesAny(value: string, patterns: string[]): boolean {
  const normalized = value.toLowerCase();
  return patterns.some((pattern) => normalized.includes(pattern.toLowerCase()));
}
