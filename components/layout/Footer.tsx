import Link from 'next/link';
import { profile } from '@/data/portfolio';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-muted-foreground">
          © {year} {profile.name}. All rights reserved.
        </div>
        
        <div className="flex gap-6">
          <Link href={profile.links.github} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            GitHub
          </Link>
          <Link href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            LinkedIn
          </Link>
          <Link href={`mailto:${profile.links.email}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Email
          </Link>
        </div>
      </div>
    </footer>
  );
}
