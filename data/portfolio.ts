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
  name: 'Supriya Kumari',
  roles: ['B.Tech Information Technology Student', 'Software Developer', 'Full Stack Developer', 'Data Analytics Enthusiast', 'Open Source Contributor'],
  tagline: 'Open to Software Engineering Internships and placement opportunities',
  summary: 'Building practical, scalable and data-driven software solutions using modern technologies and strong computer science fundamentals. B.Tech Information Technology student interested in software development, full-stack applications, data analytics, AI/ML and open-source development. Focused on building practical projects, strengthening problem-solving skills and applying core computer science concepts to real-world problems.',
  cgpa: '9.76/10',
  links: {
    github: 'https://share.google/HNdnrqbNqHj3IRfSS',
    linkedin: 'https://www.linkedin.com/in/supriya-kumari-b56264350',
    leetcode: 'https://share.google/n0KdNjlfXg9NnM46R',
    email: 'shreyaaditye@gmail.com',
    resume: '/resume/Supriya_Kumari_Resume.pdf'
  },
  stats: [
    { label: 'CGPA', value: '9.76/10' },
    { label: 'Certifications', value: '11' },
    { label: 'Job Simulations', value: '3' },
    { label: 'LeetCode', value: '300+' }
  ]
};

export const skills: Skill[] = [
  ...["Python","Java","JavaScript","SQL"].map(s => ({ name: s, category: 'Language' as const, proficiency_level: 90 })),
  ...["HTML","CSS","React","Next.js","Tailwind CSS"].map(s => ({ name: s, category: 'Frontend' as const, proficiency_level: 85 })),
  ...["FastAPI","Node.js","Express.js","REST APIs"].map(s => ({ name: s, category: 'Backend' as const, proficiency_level: 80 })),
  ...["PostgreSQL","SQLite"].map(s => ({ name: s, category: 'Database' as const, proficiency_level: 85 })),
  ...["Pandas","NumPy","Scikit-learn","Power BI","Tableau","Excel"].map(s => ({ name: s, category: 'Data/AI' as const, proficiency_level: 90 })),
  ...["Git","GitHub","VS Code","Docker","npm","Google Colab","Jupyter Notebook"].map(s => ({ name: s, category: 'Tools/DevOps' as const, proficiency_level: 85 })),
  ...["Data Structures and Algorithms","DBMS","Object-Oriented Programming","Operating Systems","Computer Networks","Software Engineering"].map(s => ({ name: s, category: 'Core CS' as const, proficiency_level: 95 }))
];

export const experiences: Experience[] = [];

export const internships: Internship[] = [
  ...[{"id":"skillcraft-data-science-2026","role":"Data Science Intern","organization":"SkillCraft Technology","type":"Internship","startDate":"2026-01-01","endDate":"2026-01-31","description":"Completed a one-month internship in Data Science.","certificateId":"SCT/JAN26/0038","proof":"/internships/skillcraft-data-science.pdf"},{"id":"skillcraft-ml-offer-2026","role":"Machine Learning Intern","organization":"SkillCraft Technology","type":"Internship Offer","startDate":"2026-02-01","endDate":"2026-02-28","description":"Machine Learning internship offer for February 2026.","proof":"/internships/skillcraft-machine-learning-offer.jpg"}].map(e => ({
    id: e.id,
    company: e.organization,
    role: e.role,
    is_virtual: true,
    start_date: e.startDate,
    end_date: e.endDate,
    description: e.description,
    skills: ['Data Science', 'Machine Learning'],
    certificate_url: e.proof
  })),
  ...[{"id":"tata-genai-data-analytics-forage-2026","title":"GenAI Powered Data Analytics Job Simulation","organization":"Tata","platform":"Forage","type":"Job Simulation","completionDate":"2026-03-15","tasks":["Exploratory data analysis and risk profiling","Predicting delinquency with AI","Business report and data storytelling for collections strategy","Implementing an AI-driven collections strategy"],"enrolmentVerificationCode":"LPFQNFradwQRA9mLq","userVerificationCode":"xtFvCbTY4Mxjz7vxz","proof":"/job-simulations/tata-genai-data-analytics.pdf"},{"id":"deloitte-data-analytics-forage-2026","title":"Data Analytics Job Simulation","organization":"Deloitte","platform":"Forage","type":"Job Simulation","completionDate":"2026-03-14","tasks":["Data analysis","Forensic technology"],"enrolmentVerificationCode":"g6b2rgozgvNDKKv6B","userVerificationCode":"xtFvCbTY4Mxjz7vxz","proof":"/job-simulations/deloitte-data-analytics.pdf"},{"id":"goldman-risk-forage-2026","title":"Risk Job Simulation","organization":"Goldman Sachs","platform":"Forage","type":"Job Simulation","completionDate":"2026-03-14","tasks":["An introduction to risk","Evaluating client profiles and real estate investments"],"enrolmentVerificationCode":"otXucSdE3GTuk6PJr","userVerificationCode":"xtFvCbTY4Mxjz7vxz","proof":"/job-simulations/goldman-sachs-risk.pdf"}].map(e => ({
    id: e.id,
    company: e.organization,
    role: e.title,
    is_virtual: true,
    start_date: e.completionDate,
    end_date: e.completionDate,
    description: e.tasks.join(', '),
    skills: [],
    certificate_url: e.proof
  }))
];

export const projects: Project[] = [];

export const opensource: OpenSource[] = [
  ...[{"id":"oscg-2026","program":"Open Source Connect Global 2026","role":"Contributor","type":"Open Source Program","repository":"","issueUrl":"","pullRequestUrl":"","status":"","proof":"/opensource/oscg-2026-contributor.jpg"},{"id":"ecsoc-2026","program":"ECSOC 2026","role":"Contributor","type":"Open Source Program","repository":"","issueUrl":"","pullRequestUrl":"","status":"","proof":"/opensource/ecsoc-2026-contributor.jpg"}].map(e => ({
    id: e.id,
    repository: e.program,
    pr_issue_title: 'Contributor',
    contribution: 'Participated in open source program',
    status: 'MERGED' as const,
    link: e.proof
  }))
];

export const hackathons: Hackathon[] = [];

export const certificates: Certificate[] = [
  ...[{"id":"nptel-ml-2026","title":"Introduction to Machine Learning","issuer":"NPTEL","institution":"IIT Madras","period":"Jan-Apr 2026","duration":"12 weeks","score":60,"recognition":"Elite","recommendedCredits":4,"certificateNumber":"NPTEL26CS74S150308306","proof":"/certificates/nptel-introduction-machine-learning.pdf"},{"id":"nptel-dbms-2026","title":"Data Base Management System","issuer":"NPTEL","institution":"IIT Kharagpur","period":"Jan-Mar 2026","duration":"8 weeks","score":54,"recommendedCredits":3,"certificateNumber":"NPTEL26CS39S653409284","proof":"/certificates/nptel-dbms.pdf"},{"id":"hackerrank-java-basic-2025","title":"Java (Basic)","issuer":"HackerRank","issueDate":"2025-10-26","credentialId":"857479C85F92","proof":"/certificates/hackerrank-java-basic.jpg"},{"id":"hackerrank-sql-basic-2026","title":"SQL (Basic)","issuer":"HackerRank","issueDate":"2026-04-04","credentialId":"0603E4624178","proof":"/certificates/hackerrank-sql-basic.jpg"},{"id":"hackerrank-sql-intermediate-2026","title":"SQL (Intermediate)","issuer":"HackerRank","issueDate":"2026-04-04","credentialId":"FE928B9872CF","proof":"/certificates/hackerrank-sql-intermediate.jpg"},{"id":"hackerrank-sql-advanced-2026","title":"SQL (Advanced)","issuer":"HackerRank","issueDate":"2026-04-04","credentialId":"B544BF6658CA","proof":"/certificates/hackerrank-sql-advanced.jpg"},{"id":"simplilearn-deep-learning-2025","title":"Deep Learning","issuer":"Simplilearn SkillUp","issueDate":"2025-12-20","certificateCode":"9611502","proof":"/certificates/simplilearn-deep-learning.jpg"},{"id":"simplilearn-google-cloud-ai-2025","title":"Innovating with Google Cloud AI","issuer":"Simplilearn SkillUp","issueDate":"2025-12-20","certificateCode":"9611647","note":"Course completion certificate; not an official Google Cloud Certification.","proof":"/certificates/innovating-google-cloud-ai.jpg"},{"id":"simplilearn-data-analytics-2025","title":"Introduction to Data Analytics","issuer":"Simplilearn SkillUp","issueDate":"2025-12-19","certificateCode":"9608715","proof":"/certificates/simplilearn-introduction-data-analytics.jpg"},{"id":"coursera-powerpoint-2025","title":"Getting Started with Microsoft PowerPoint","issuer":"Coursera","issueDate":"2025-12-18","proof":"/certificates/coursera-microsoft-powerpoint.jpg"},{"id":"saylor-word-processing-2025","title":"PRDV003: Word Processing","issuer":"Saylor Academy","issueDate":"2025-12-22","certificateId":"4476650671SK","grade":"90%","duration":"5 hours","proof":"/certificates/saylor-word-processing.jpg"}].map(e => ({
    id: e.id,
    title: e.title,
    issuer: e.issuer,
    issue_date: e.issueDate || e.period || '',
    skills: [],
    credential_url: e.proof || '',
    image_url: (e.proof && e.proof.endsWith('.jpg')) ? e.proof : undefined
  }))
];

export const achievements: Achievement[] = [
  ...[{"id":"epsilon-7-analytics-conclave-2026","title":"Epsilon 7.0 – The Analytics Case Competition","type":"Competition Participation","organizer":"Shaheed Sukhdev College of Business Studies, University of Delhi","event":"The Analytics Conclave '26","result":"Participant","proof":"/achievements/epsilon-7-analytics-case-competition.pdf"},{"id":"casetify-case-study-competition","title":"Casetify - A Case Study Competition","type":"Competition Participation","organizer":"Sri Guru Tegh Bahadur Khalsa College, University of Delhi","result":"Participant","proof":"/achievements/casetify-case-study-competition.pdf"},{"id":"tata-crucible-campus-quiz-2025","title":"TATA Crucible Campus Quiz 2025","type":"Quiz Participation","organizer":"Tata","result":"Participant","proof":"/achievements/tata-crucible-campus-quiz-2025.jpg"},{"id":"kernelcraft-backend-workshop-2026","title":"KernelCraft – Backend Workshop","type":"Workshop","organization":"SRM Ramapuram / BetaBots","date":"2026-04-11","proof":"/activities/kernelcraft-backend-workshop.jpg"}].map(e => ({
    id: e.id,
    title: e.title,
    description: e.result || '',
    date: e.date || '',
    issuer_or_event: e.organizer || e.organization || '',
    proof_url: e.proof
  })),
  ...[{"id":"servicenow-university","platform":"ServiceNow University","points":5078,"level":"Challenger Level 2","completed":28,"achievements":22,"proof":"/badges/servicenow-university.jpg","note":"Values captured from provided profile screenshot; update if profile statistics change."}].map(e => ({
    id: e.id,
    title: e.level,
    description: e.points + ' points, ' + e.completed + ' completions',
    date: '',
    issuer_or_event: e.platform,
    proof_url: e.proof
  }))
];

export const codingProfiles: CodingProfile[] = [
  { platform: 'GitHub', username: 'supriya', stats: 'Active Contributor', url: 'https://share.google/HNdnrqbNqHj3IRfSS' },
  { platform: 'LeetCode', username: 'supriya', stats: 'Regular Problem Solver', url: 'https://share.google/n0KdNjlfXg9NnM46R' }
];

export const education: Education[] = [
  ...[{"degree":"B.Tech","field":"Information Technology","institution":"SRM Institute of Science and Technology","campus":"Ramapuram","location":"Chennai, India","cgpa":9.76,"startYear":2024,"graduationYear":2028,"proof":"","startDate":"2024-07","endDate":"2028-06"}].map(e => ({
    degree: e.degree + ' ' + e.field,
    university: e.institution,
    cgpa: e.cgpa + '/10',
    start_date: e.startDate,
    end_date: e.endDate,
    coursework: ["Data Structures and Algorithms","DBMS","Object-Oriented Programming","Operating Systems","Computer Networks","Software Engineering"]
  }))
];

export const community: Community[] = [
  ...[{"id":"uhv-food-donation-2025-26","title":"Food Donation – Universal Human Values Field Work / Case Study","institution":"SRM Institute of Science and Technology, Ramapuram","academicYear":"2025-2026","type":"Academic Field Work","description":"Field work/case study on food donation, social responsibility, ethical values and reduction of food waste.","proof":"/academic/uhv-food-donation-report.pdf","showOnMainPortfolio":false}].map(e => ({
    role: 'Participant',
    organization: e.institution,
    description: e.title + ' - ' + e.description,
    proof_url: e.proof
  }))
];
