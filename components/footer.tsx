import Link from "next/link";
import { Linkedin, Instagram, Facebook } from "lucide-react";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/otgondavaa",
    icon: Linkedin,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/otgondavaa",
    icon: Instagram,
  },
  {
    name: "Facebook",
    href: "https://facebook.com/otgondavaa",
    icon: Facebook,
  },
];

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:flex-row md:py-6">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} otgondavaa.com
          </p>
        </div>
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
