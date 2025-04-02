import { Input } from '@/components/ui/input';
import { BookOpen, Search } from 'lucide-react';
import Link from 'next/link';
import { ThemeSwitcher } from './theme-switcher';

const Header = () => {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b px-5 backdrop-blur">
      <div className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 rounded-md px-3 py-1">
          <BookOpen className="h-6 w-6" />
          <span className="text-xl font-bold max-xs:hidden">
            Cinematic Sketchbook
          </span>
          <span className="hidden text-xl font-bold max-xs:block">CS</span>
        </Link>
        <nav className="hidden gap-6 lg:flex">
          <Link
            href="#"
            className="rounded-md px-3 py-1 text-sm font-medium underline-offset-4 hover:underline"
          >
            Reviews
          </Link>
          <Link
            href="#"
            className="rounded-md px-3 py-1 text-sm font-medium underline-offset-4 hover:underline"
          >
            Categories
          </Link>
          <Link
            href="#"
            className="rounded-md px-3 py-1 text-sm font-medium underline-offset-4 hover:underline"
          >
            About
          </Link>
          <Link
            href="#"
            className="rounded-md px-3 py-1 text-sm font-medium underline-offset-4 hover:underline"
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <div className="relative hidden lg:flex">
            <Search className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search books..."
              className="w-[200px] bg-white pl-8 dark:bg-slate-800"
            />
          </div>
          <ThemeSwitcher />
          {/* <Button variant="outline" size="sm" className="hidden md:flex">
            Log in
          </Button>
          <Button size="sm">Subscribe</Button> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
