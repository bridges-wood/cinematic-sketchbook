import { BookOpen } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-background w-full border-t py-6 md:py-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              <span className="text-xl font-bold">Cinematic Sketchbook</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Your destination for concept art book reviews, interviews, and
              insights.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-sm hover:underline">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm hover:underline">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:underline">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm hover:underline">
                  Game Art
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:underline">
                  Film & Animation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:underline">
                  Artist Collections
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:underline">
                  Tutorials & Guides
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm hover:underline">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:underline">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:underline">
                  YouTube
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm hover:underline">
                  Discord
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} Cinematic Sketchbook. All rights
            reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-muted-foreground text-xs hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-muted-foreground text-xs hover:underline"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-muted-foreground text-xs hover:underline"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
