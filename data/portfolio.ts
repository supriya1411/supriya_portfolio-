import _portfolioData from './portfolio-data.json';
const portfolioData: any = _portfolioData;

export interface Profile {
  name: string;
  roles: string[];
  tagline: string;
  summary: string;
  cgpa: string;
  links: {
    github: string;
    linkedin: string;
    leetcode: string;
    email: string;
    resume: string;
  };
  stats: { label: string; value: string }[];
}

export interface Skill {
  name: string;
  category: 'Language' | 'Frontend' | 'Backend' | 'Database' | 'Data/AI' | 'Tools/DevOps' | 'Core CS';
  proficiency_level: number;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  start_date: string;
  end_date?: string;
  current: boolean;
  description: string;
  tech_stack: string[];
  proof_url?: string;
}

export interface Internship {
  id: string;
  company: string;
  role: string;
  is_virtual: boolean;
  start_date: string;
  end_date: string;
  description: string;
  skills: string[];
  certificate_url?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  problem_statement: string;
  solution: string;
  features: string[];
  architecture: string;
  challenges: string;
  learnings: string;
  future_scope: string;
  tech_stack: string[];
  category: string;
  cover_image_url: string;
  github_url: string;
  live_url: string;
  is_featured: boolean;
}

export interface OpenSource {
  id: string;
  repository: string;
  pr_issue_title: string;
  contribution: string;
  status: 'MERGED' | 'OPEN' | 'CLOSED';
  link: string;
}

export interface Hackathon {
  id: string;
  event: string;
  project: string;
  problem: string;
  solution: string;
  tech_stack: string[];
  contribution: string;
  result: string;
  proof_url?: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issue_date: string;
  skills: string[];
  credential_url: string;
  image_url?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  issuer_or_event: string;
  proof_url?: string;
}

export interface CodingProfile {
  platform: string;
  username: string;
  stats: string;
  url: string;
}

export interface Education {
  degree: string;
  university: string;
  cgpa: string;
  start_date: string;
  end_date: string;
  coursework: string[];
}

export interface Community {
  role: string;
  organization: string;
  description: string;
  proof_url?: string;
}


export const profile: Profile = {
  name: portfolioData?.personal?.displayName || portfolioData?.personal?.fullName || '',
  roles: portfolioData?.personal?.roles || [],
  tagline: portfolioData?.personal?.tagline || '',
  summary: portfolioData?.about?.summary || '',
  cgpa: portfolioData?.education?.[0]?.cgpa ? portfolioData.education[0].cgpa + '/10' : '',
  links: {
    github: portfolioData?.social?.github?.url || portfolioData?.codingProfiles?.github?.url || '',
    linkedin: portfolioData?.social?.linkedin?.url || '',
    leetcode: portfolioData?.social?.leetcode?.url || portfolioData?.codingProfiles?.leetcode?.url || '',
    email: portfolioData?.personal?.email || '',
    resume: portfolioData?.personal?.resume || ''
  },
  stats: [
    { label: 'CGPA', value: portfolioData?.education?.[0]?.cgpa ? portfolioData.education[0].cgpa + '/10' : '' },
    { label: 'Certifications', value: String(portfolioData?.certifications?.length || 0) },
    { label: 'Job Simulations', value: String(portfolioData?.jobSimulations?.length || 0) },
    { label: 'LeetCode', value: '300+' }
  ]
};

export const skills: Skill[] = [
  ...(portfolioData?.skills?.programmingLanguages || []).map((s: string) => ({ name: s, category: 'Language' as const, proficiency_level: 90 })),
  ...(portfolioData?.skills?.frontend || []).map((s: string) => ({ name: s, category: 'Frontend' as const, proficiency_level: 85 })),
  ...(portfolioData?.skills?.backend || []).map((s: string) => ({ name: s, category: 'Backend' as const, proficiency_level: 80 })),
  ...(portfolioData?.skills?.databases || []).map((s: string) => ({ name: s, category: 'Database' as const, proficiency_level: 85 })),
  ...(portfolioData?.skills?.dataAnalyticsAndML || []).map((s: string) => ({ name: s, category: 'Data/AI' as const, proficiency_level: 90 })),
  ...(portfolioData?.skills?.toolsAndDevOps || []).map((s: string) => ({ name: s, category: 'Tools/DevOps' as const, proficiency_level: 85 })),
  ...(portfolioData?.skills?.coreCS || []).map((s: string) => ({ name: s, category: 'Core CS' as const, proficiency_level: 95 }))
];

export const experiences: Experience[] = (portfolioData?.experience || []).map((e: any) => ({
  id: e.id || Math.random().toString(),
  company: e.company || e.organization || '',
  position: e.position || e.role || '',
  location: e.location || '',
  start_date: e.startDate || '',
  end_date: e.endDate,
  current: e.current || false,
  description: e.description || '',
  tech_stack: e.techStack || [],
  proof_url: e.proof || undefined
}));

export const internships: Internship[] = [
    ...(portfolioData?.internships || portfolioData?.experience?.filter((e: any) => e.type === 'Internship') || []).map((e: any) => ({
        id: e.id || Math.random().toString(),
        company: e.organization || e.company || '',
        role: e.role || e.title || '',
        is_virtual: e.isVirtual || true,
        start_date: e.startDate || e.completionDate || '',
        end_date: e.endDate || e.completionDate || '',
        description: e.description || (e.tasks ? e.tasks.join(', ') : ''),
        skills: e.skills || ['Data Science', 'Machine Learning'],
        certificate_url: e.proof
    })),
    ...(portfolioData?.jobSimulations || []).map((e: any) => ({
        id: e.id || Math.random().toString(),
        company: e.organization || e.company || '',
        role: e.title || e.role || '',
        is_virtual: true,
        start_date: e.completionDate || '',
        end_date: e.completionDate || '',
        description: e.tasks ? e.tasks.join(', ') : '',
        skills: [],
        certificate_url: e.proof
    }))
];

export const projects: Project[] = (portfolioData?.projects || []).map((p: any) => ({
    id: p.id || Math.random().toString(),
    title: p.title || '',
    slug: p.slug || '',
    description: p.description || '',
    problem_statement: p.problemStatement || '',
    solution: p.solution || '',
    features: p.features || [],
    architecture: p.architecture || '',
    challenges: p.challenges || '',
    learnings: p.learnings || '',
    future_scope: p.futureScope || '',
    tech_stack: p.techStack || [],
    category: p.category || '',
    cover_image_url: p.coverImage || p.cover_image_url || p.image || p.proof || '',
    github_url: p.githubUrl || p.github_url || '',
    live_url: p.liveUrl || p.live_url || '',
    is_featured: p.isFeatured || p.is_featured || false
}));

export const opensource: OpenSource[] = (portfolioData?.openSource || []).map((e: any) => ({
    id: e.id || Math.random().toString(),
    repository: e.program || e.repository || '',
    pr_issue_title: e.role || e.pr_issue_title || 'Contributor',
    contribution: e.contribution || 'Participated in open source program',
    status: (e.status || 'MERGED') as 'MERGED' | 'OPEN' | 'CLOSED',
    link: e.proof || e.link || ''
}));

export const hackathons: Hackathon[] = (portfolioData?.hackathons || []).map((e: any) => ({
  id: e.id || Math.random().toString(),
  event: e.event || '',
  project: e.project || '',
  problem: e.problem || '',
  solution: e.solution || '',
  tech_stack: e.techStack || e.tech_stack || [],
  contribution: e.contribution || '',
  result: e.result || '',
  proof_url: e.proof || e.proof_url
}));

export const certificates: Certificate[] = (portfolioData?.certifications || []).map((e: any) => ({
    id: e.id || Math.random().toString(),
    title: e.title || '',
    issuer: e.issuer || '',
    issue_date: e.issueDate || e.period || '',
    skills: e.skills || [],
    credential_url: e.proof || '',
    image_url: (e.proof && (/.(jpg|jpeg|png|gif|webp)$/i.test(e.proof) || e.proof.startsWith('http'))) ? e.proof : undefined
}));

export const achievements: Achievement[] = [
    ...(portfolioData?.competitionsAndActivities || []).map((e: any) => ({
        id: e.id || Math.random().toString(),
        title: e.title || e.level || '',
        description: e.result || (e.points ? e.points + ' points, ' + e.completed + ' completions' : '') || '',
        date: e.date || '',
        issuer_or_event: e.organizer || e.organization || e.platform || '',
        proof_url: e.proof
    })),
    ...(portfolioData?.badgesAndPlatforms || []).map((e: any) => ({
        id: e.id || Math.random().toString(),
        title: e.platform || e.level || '',
        description: e.points ? e.points + ' points, ' + e.completed + ' completions' : '',
        date: e.date || '',
        issuer_or_event: e.platform || '',
        proof_url: e.proof
    }))
];

export const codingProfiles: CodingProfile[] = Object.entries(portfolioData?.codingProfiles || {})
  .filter(([key, val]: [string, any]) => val.url || val.username)
  .map(([key, val]: [string, any]) => ({
    platform: key.charAt(0).toUpperCase() + key.slice(1),
    username: val.username || '',
    stats: '',
    url: val.url || ''
  }));

export const education: Education[] = (portfolioData?.education || []).map((e: any) => ({
    degree: (e.degree || '') + (e.field ? ' ' + e.field : ''),
    university: e.institution || e.university || '',
    cgpa: (e.cgpa || '') + (e.cgpa ? '/10' : ''),
    start_date: e.startDate || '',
    end_date: e.endDate || '',
    coursework: e.coursework || ["Data Structures and Algorithms","DBMS","Object-Oriented Programming","Operating Systems","Computer Networks","Software Engineering"]
}));

export const community: Community[] = (portfolioData?.academicActivities || []).map((e: any) => ({
    role: e.role || 'Participant',
    organization: e.institution || e.organization || '',
    description: (e.title ? e.title + ' - ' : '') + (e.description || ''),
    proof_url: e.proof || e.proof_url
}));
