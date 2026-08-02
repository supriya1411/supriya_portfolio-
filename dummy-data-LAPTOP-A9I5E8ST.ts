import prisma from './lib/db';

async function main() {
  console.log('Seeding dummy data...');

  const user = await prisma.user.findFirst() || await prisma.user.create({
    data: { email: 'dummy@test.com', password_hash: 'dummy', role: 'admin' }
  });

  const userId = user.id;

  // Create Skills
  await prisma.skill.createMany({
    data: [
      { name: 'TypeScript', category: 'Language', proficiency_level: 90, display_order: 1, user_id: userId },
      { name: 'Next.js', category: 'Framework', proficiency_level: 85, display_order: 2, user_id: userId },
      { name: 'React', category: 'Library', proficiency_level: 95, display_order: 3, user_id: userId },
      { name: 'PostgreSQL', category: 'Database', proficiency_level: 80, display_order: 4, user_id: userId },
      { name: 'Docker', category: 'DevOps', proficiency_level: 75, display_order: 5, user_id: userId },
    ],
    skipDuplicates: true
  });

  // Create Projects
  await prisma.project.create({
    data: {
      title: 'E-Commerce Platform',
      slug: 'e-commerce-platform',
      description: 'A full-stack e-commerce platform built with Next.js App Router, Stripe, and Prisma.',
      problem_statement: 'Building a scalable platform for e-commerce.',
      tech_stack: ['Next.js', 'Stripe', 'Prisma'],
      cover_image_url: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000',
      github_url: 'https://github.com',
      live_url: 'https://example.com',
      category: 'Web Development',
      is_featured: true,
      display_order: 1,
      user_id: userId
    }
  });

  await prisma.project.create({
    data: {
      title: 'Real-time Chat App',
      slug: 'real-time-chat-app',
      description: 'A low-latency chat application using WebSockets and Redis.',
      problem_statement: 'Creating a highly responsive chat experience.',
      tech_stack: ['WebSockets', 'Redis', 'Next.js'],
      cover_image_url: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000',
      github_url: 'https://github.com',
      live_url: 'https://example.com',
      category: 'Web Development',
      is_featured: true,
      display_order: 2,
      user_id: userId
    }
  });

  // Create Experience
  await prisma.experience.createMany({
    data: [
      {
        organization: 'Tech Solutions Inc.',
        role_title: 'Senior Frontend Engineer',
        location: 'Remote',
        start_date: new Date('2021-05-01'),
        is_current: true,
        bullets: ['Led the frontend transition to Next.js 14, improving Core Web Vitals by 40%.'],
        tech_tags: ['Next.js', 'React', 'TypeScript'],
        display_order: 1,
        user_id: userId
      },
      {
        organization: 'Digital Agency',
        role_title: 'Web Developer',
        location: 'New York, NY',
        start_date: new Date('2019-01-01'),
        end_date: new Date('2021-04-30'),
        is_current: false,
        bullets: ['Developed dynamic single-page applications for various high-profile clients.'],
        tech_tags: ['React', 'JavaScript'],
        display_order: 2,
        user_id: userId
      }
    ]
  });

  console.log('Dummy data inserted successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
