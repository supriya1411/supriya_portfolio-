'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { Moon, Sun, Monitor, Menu, X, ChevronDown, FileText, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar({ initialTheme }: { initialTheme: string }) {
  const [theme, setTheme] = useState(initialTheme);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const isRecruiterMode = searchParams.get('mode') === 'recruiter';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    document.cookie = `theme=${newTheme}; path=/; max-age=31536000`;
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (newTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  const toggleRecruiterMode = () => {
    if (isRecruiterMode) {
      router.push('/');
    } else {
      router.push('/?mode=recruiter');
    }
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  const moreLinks = [
    { name: 'Internships', href: '#internships' },
    { name: 'Open Source', href: '#opensource' },
    { name: 'Hackathons', href: '#hackathons' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Coding Profiles', href: '#coding-profiles' },
    { name: 'Education', href: '#education' },
    { name: 'Community', href: '#community' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent',
        scrolled ? 'bg-background/80 backdrop-blur-md border-border/50 shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight">
          Juhi<span className="text-primary/60">.dev</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </Link>
          ))}
          
          {/* More Dropdown */}
          <div className="relative group">
            <button 
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onMouseEnter={() => setIsMoreOpen(true)}
              onMouseLeave={() => setIsMoreOpen(false)}
            >
              More <ChevronDown className="w-4 h-4" />
            </button>
            {isMoreOpen && (
              <div 
                className="absolute top-full left-0 mt-2 w-48 bg-background border border-border/50 rounded-xl shadow-xl overflow-hidden py-2"
                onMouseEnter={() => setIsMoreOpen(true)}
                onMouseLeave={() => setIsMoreOpen(false)}
              >
                {moreLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    onClick={() => setIsMoreOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          <div className="h-6 w-px bg-border/50 mx-2" />

          {/* Recruiter Mode Toggle */}
          <button
            onClick={toggleRecruiterMode}
            className={cn(
              "flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full transition-all border",
              isRecruiterMode 
                ? "bg-primary text-primary-foreground border-primary shadow-sm" 
                : "bg-muted text-muted-foreground border-transparent hover:text-foreground hover:border-border"
            )}
          >
            <Briefcase className="w-4 h-4" />
            Recruiter Mode
          </button>

          {/* Resume Link */}
          <Link
            href="/resume.pdf"
            target="_blank"
            className="flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <FileText className="w-4 h-4" />
            Resume
          </Link>
          
          {/* Theme Toggle */}
          <div className="flex items-center gap-1 bg-muted/50 rounded-full p-1 border border-border/50 ml-2">
            <button onClick={() => handleThemeChange('light')} className={cn('p-1 rounded-full transition-colors', theme === 'light' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground')}>
              <Sun className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => handleThemeChange('system')} className={cn('p-1 rounded-full transition-colors', theme === 'system' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground')}>
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => handleThemeChange('dark')} className={cn('p-1 rounded-full transition-colors', theme === 'dark' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground')}>
              <Moon className="w-3.5 h-3.5" />
            </button>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="xl:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-background border-b border-border h-screen overflow-y-auto pb-24">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <button
              onClick={() => { toggleRecruiterMode(); setIsMobileMenuOpen(false); }}
              className={cn(
                "flex items-center justify-center gap-2 text-sm font-medium px-4 py-3 rounded-xl transition-all border",
                isRecruiterMode 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "bg-muted text-foreground border-border"
              )}
            >
              <Briefcase className="w-5 h-5" />
              {isRecruiterMode ? 'Exit Recruiter Mode' : 'Enter Recruiter Mode'}
            </button>
            
            <Link
              href="/resume.pdf"
              target="_blank"
              className="flex items-center justify-center gap-2 text-sm font-medium px-4 py-3 rounded-xl bg-primary/10 text-primary"
            >
              <FileText className="w-5 h-5" />
              Download Resume
            </Link>

            <div className="w-full h-px bg-border/50 my-2" />

            {[...navLinks, ...moreLinks].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="flex items-center justify-between pt-4 border-t border-border mt-2">
              <span className="text-sm font-medium text-muted-foreground">Theme</span>
              <div className="flex items-center gap-2">
                <button onClick={() => handleThemeChange('light')} className={cn('p-2 rounded-full', theme === 'light' ? 'bg-muted' : '')}><Sun className="w-4 h-4" /></button>
                <button onClick={() => handleThemeChange('system')} className={cn('p-2 rounded-full', theme === 'system' ? 'bg-muted' : '')}><Monitor className="w-4 h-4" /></button>
                <button onClick={() => handleThemeChange('dark')} className={cn('p-2 rounded-full', theme === 'dark' ? 'bg-muted' : '')}><Moon className="w-4 h-4" /></button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
