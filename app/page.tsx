import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Experience } from '@/components/sections/Experience';
import { Internships } from '@/components/sections/Internships';
import { Projects } from '@/components/sections/Projects';
import { OpenSourceSection } from '@/components/sections/OpenSource';
import { HackathonsSection } from '@/components/sections/Hackathons';
import { Certifications } from '@/components/sections/Certifications';
import { AchievementsSection } from '@/components/sections/Achievements';
import { CodingProfilesSection } from '@/components/sections/CodingProfiles';
import { EducationSection } from '@/components/sections/Education';
import { CommunitySection } from '@/components/sections/Community';
import { Contact } from '@/components/sections/Contact';
import { RecruiterMode } from '@/components/layout/RecruiterMode';

import { 
  profile, 
  skills, 
  experiences, 
  internships, 
  projects, 
  opensource, 
  hackathons, 
  certificates, 
  achievements, 
  codingProfiles, 
  education, 
  community 
} from '@/data/portfolio';

// Ensure the page handles Next.js 15+ Promise-based searchParams correctly.
export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = await searchParams;
  const isRecruiterMode = params.mode === 'recruiter';

  if (isRecruiterMode) {
    return (
      <RecruiterMode 
        profile={profile}
        education={education}
        skills={skills}
        experiences={experiences}
        internships={internships}
        projects={projects}
        opensource={opensource}
        achievements={achievements}
        codingProfiles={codingProfiles}
      />
    );
  }

  return (
    <main className="min-h-screen">
      <Hero profile={profile} />
      <About profile={profile} />
      <Skills skills={skills} />
      <Experience experiences={experiences} />
      {internships.length > 0 && <Internships internships={internships} />}
      <Projects projects={projects} />
      {opensource.length > 0 && <OpenSourceSection opensource={opensource} />}
      {hackathons.length > 0 && <HackathonsSection hackathons={hackathons} />}
      <Certifications certificates={certificates} />
      {achievements.length > 0 && <AchievementsSection achievements={achievements} />}
      {codingProfiles.length > 0 && <CodingProfilesSection profiles={codingProfiles} />}
      {education.length > 0 && <EducationSection education={education} />}
      {community.length > 0 && <CommunitySection community={community} />}
      <Contact profile={profile} />
    </main>
  );
}
