'use client';

import { Profile, Skill, Experience, Internship, Project, OpenSource, Achievement, CodingProfile, Education } from '@/data/portfolio';

interface RecruiterModeProps {
  profile: Profile;
  education: Education[];
  skills: Skill[];
  experiences: Experience[];
  internships: Internship[];
  projects: Project[];
  opensource: OpenSource[];
  achievements: Achievement[];
  codingProfiles: CodingProfile[];
}

export function RecruiterMode({
  profile,
  education,
  skills,
  experiences,
  internships,
  projects,
  opensource,
  achievements,
  codingProfiles
}: RecruiterModeProps) {
  return (
    <div className="min-h-screen bg-white text-black p-8 font-sans max-w-5xl mx-auto">
      <header className="border-b-2 border-black pb-6 mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold mb-2">{profile.name}</h1>
          <p className="text-xl text-gray-700">{profile.roles.join(' | ')}</p>
        </div>
        <div className="text-right text-sm space-y-1">
          <p><a href={`mailto:${profile.links.email}`} className="text-blue-600 hover:underline">{profile.links.email}</a></p>
          <p><a href={profile.links.github} className="text-blue-600 hover:underline">{profile.links.github}</a></p>
          <p><a href={profile.links.linkedin} className="text-blue-600 hover:underline">{profile.links.linkedin}</a></p>
        </div>
      </header>
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold border-b border-gray-300 pb-2 mb-4 uppercase tracking-wider text-gray-800">Summary</h2>
        <p className="text-gray-700 leading-relaxed">{profile.summary}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold border-b border-gray-300 pb-2 mb-4 uppercase tracking-wider text-gray-800">Experience</h2>
        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <div key={idx}>
              <div className="flex justify-between font-bold text-lg">
                <span>{exp.position} at {exp.company}</span>
                <span className="text-gray-600">{exp.start_date} - {exp.current ? 'Present' : exp.end_date}</span>
              </div>
              <div className="text-gray-600 italic mb-2">{exp.location}</div>
              <p className="text-gray-700 whitespace-pre-line">{exp.description}</p>
              <div className="mt-2 text-sm text-gray-600"><strong>Tech:</strong> {exp.tech_stack?.join(', ')}</div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold border-b border-gray-300 pb-2 mb-4 uppercase tracking-wider text-gray-800">Projects</h2>
        <div className="space-y-6">
          {projects.map((proj, idx) => (
            <div key={idx}>
              <div className="flex justify-between font-bold text-lg">
                <a href={proj.live_url || proj.github_url} className="text-blue-600 hover:underline">{proj.title}</a>
              </div>
              <p className="text-gray-700 mt-1">{proj.description}</p>
              <div className="mt-2 text-sm text-gray-600"><strong>Tech:</strong> {proj.tech_stack.join(', ')}</div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-bold border-b border-gray-300 pb-2 mb-4 uppercase tracking-wider text-gray-800">Education</h2>
        <div className="space-y-4">
          {education.map((edu, idx) => (
            <div key={idx} className="flex justify-between">
              <div>
                <div className="font-bold">{edu.degree}</div>
                <div className="text-gray-700">{edu.university}</div>
              </div>
              <div className="text-right">
                <div className="text-gray-600">{edu.start_date} - {edu.end_date}</div>
                <div className="font-medium">CGPA: {edu.cgpa}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold border-b border-gray-300 pb-2 mb-4 uppercase tracking-wider text-gray-800">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <span key={idx} className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-sm font-medium">
              {skill.name}
            </span>
          ))}
        </div>
      </section>
      
      <div className="mt-12 pt-8 border-t border-gray-300 text-center text-gray-500 text-sm">
        Generated from Interactive Portfolio • <a href="/?mode=standard" className="text-blue-600 hover:underline">Return to Standard View</a>
      </div>
    </div>
  );
}
