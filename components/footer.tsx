import Link from "next/link";
import { Linkedin, Instagram, Facebook, BookOpen } from "lucide-react";

const XIcon = ({ className }: { className?: string }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} scale-75`}
    fill="currentColor"
  >
    <title>X</title>
    <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
  </svg>
);

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/oggi/",
    icon: Linkedin,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/oggi.joy/",
    icon: Instagram,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/da.otgondavaa/",
    icon: Facebook,
  },
  {
    name: "X",
    href: "https://x.com/otgondavaa0",
    icon: XIcon,
  },
  {
    name: "Goodreads",
    href: "https://www.goodreads.com/otgondavaa",
    icon: BookOpen,
  },
];

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto flex flex-col items-center justify-center gap-6 py-8 px-4 md:flex-row md:justify-between md:py-6">
        <p className="text-sm text-muted-foreground text-center md:text-left">
          © {new Date().getFullYear()} otgondavaa.com
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label={link.name}
              >
                <Icon className="h-5 w-5" />
              </Link>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
