const fs = require('fs');

let content = fs.readFileSync('data/portfolio.ts', 'utf8');

// Insert import if missing
if (!content.includes("import portfolioData from './portfolio-data.json';")) {
    content = content.replace(
        "export interface Profile {",
        "import portfolioData from './portfolio-data.json';\n\nexport interface Profile {"
    );
}

// 1. Profile
const profileMapping = `export const profile: Profile = {
  name: portfolioData.personal?.displayName || portfolioData.personal?.fullName || '',
  roles: portfolioData.personal?.roles || [],
  tagline: portfolioData.personal?.tagline || '',
  summary: portfolioData.about?.summary || '',
  cgpa: portfolioData.education?.[0]?.cgpa ? portfolioData.education[0].cgpa + '/10' : '',
  links: {
    github: portfolioData.social?.github?.url || portfolioData.codingProfiles?.github?.url || '',
    linkedin: portfolioData.social?.linkedin?.url || '',
    leetcode: portfolioData.social?.leetcode?.url || portfolioData.codingProfiles?.leetcode?.url || '',
    email: portfolioData.personal?.email || '',
    resume: portfolioData.personal?.resume || ''
  },
  stats: [
    { label: 'CGPA', value: portfolioData.education?.[0]?.cgpa ? portfolioData.education[0].cgpa + '/10' : '' },
    { label: 'Certifications', value: String(portfolioData.certifications?.length || 0) },
    { label: 'Job Simulations', value: String(portfolioData.jobSimulations?.length || 0) },
    { label: 'LeetCode', value: '300+' }
  ]
};`;
content = content.replace(/export const profile: Profile = \{[\s\S]*?\}\];\n\};\n/s, profileMapping + '\n'); // Be careful, original was up to line 150
// Wait, regex might be tricky. Let's do it safer.
