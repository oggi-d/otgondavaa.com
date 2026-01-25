import Link from "next/link";
import { Linkedin, Instagram, Facebook } from "lucide-react";

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
