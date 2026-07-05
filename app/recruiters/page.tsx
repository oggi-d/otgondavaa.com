import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, GraduationCap } from "lucide-react";
import { CareerArcHero } from "@/components/recruiters/career-arc-hero";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.otgondavaa.com";

export const metadata = {
  title: "Résumé for Recruiters | Otgondavaa Dashnyam",
  description:
    "Staff Software Engineer at GoFundMe. 16+ years of full-stack experience. Based in the San Francisco Bay Area, open to US opportunities.",
  openGraph: {
    title: "Résumé for Recruiters | Otgondavaa Dashnyam",
    description:
      "Staff Software Engineer at GoFundMe. 16+ years of full-stack experience in the San Francisco Bay Area.",
    images: [
      `${siteUrl}/api/og?title=Résumé%20for%20Recruiters&siteName=otgondavaa.com`,
    ],
  },
};

export const dynamic = "force-static";

const experience = [
  {
    company: "GoFundMe",
    roles: [
      {
        title: "Staff Software Engineer",
        period: "Jul 2025 – Present",
      },
      {
        title: "Senior Software Engineer",
        period: "Jun 2024 – Jul 2025",
        location: "San Francisco Bay Area",
      },
    ],
    highlights: [
      "Building and scaling features on a global crowdfunding platform used by millions.",
    ],
  },
  {
    company: "Belong",
    roles: [
      {
        title: "Staff Software Engineer",
        period: "Mar 2021 – Mar 2024",
        location: "San Mateo, CA",
      },
      {
        title: "Senior Software Engineer",
        period: "Nov 2019 – Mar 2021",
        location: "San Francisco Bay Area",
      },
      {
        title: "Software Engineer",
        period: "Sep 2018 – Nov 2019",
        location: "San Francisco Bay Area",
      },
    ],
    highlights: [
      "Led a team of eight engineers; delivered projects on schedule.",
      "Built the payment module from the ground up and owned it through scale.",
      "Designed backend platform on C# .NET Core and AWS (Beanstalk, EC2, SQS, Lambda).",
    ],
  },
  {
    company: "Z24 LLC",
    roles: [
      {
        title: "Senior Software Engineer",
        period: "Apr 2014 – Aug 2017",
        location: "Mongolia",
      },
    ],
    highlights: [
      "Led development of online flight and hotel booking systems.",
      "Created ZPay payment system for travel products.",
      "Implemented SSO across all Z24 products.",
    ],
  },
  {
    company: "GrapeCity Mongolia",
    roles: [
      {
        title: "Software Engineer",
        period: "Jan 2012 – Apr 2014",
        location: "Mongolia",
      },
    ],
    highlights: [
      "Built Grapebank core banking applications across the full stack.",
      "Designed international money transfer module integrated with SWIFTNet.",
      "Delivered internet banking web and mobile apps integrated with core banking.",
    ],
  },
  {
    company: "International University of Ulaanbaatar",
    roles: [
      {
        title: "Assistant, Computer Science Department",
        period: "Sep 2010 – Jan 2012",
        location: "Ulaanbaatar, Mongolia",
      },
    ],
    highlights: [
      "Managed computer labs and taught introductory computer science courses.",
    ],
  },
];

const education = [
  {
    degree: "Master of Science, Computer Science",
    school: "Maharishi International University",
    period: "2017 – 2020",
    location: "Fairfield, Iowa, USA",
    detail: "GPA 3.84",
  },
  {
    degree: "Bachelor of Science, Computer Science",
    school: "International University of Ulaanbaatar",
    period: "2006 – 2010",
    location: "Mongolia",
    detail: "GPA 3.7",
  },
];

const skillGroups = [
  {
    label: "Languages & frameworks",
    skills: ["TypeScript", "JavaScript", "C#", ".NET Core", "React", "GraphQL"],
  },
  {
    label: "Cloud & infrastructure",
    skills: ["AWS", "Lambda", "SQS", "EC2", "Beanstalk"],
  },
  {
    label: "Domains",
    skills: [
      "Payments",
      "Fundraising",
      "Core banking",
      "Property management",
      "Travel booking",
    ],
  },
  {
    label: "Leadership",
    skills: [
      "Team management",
      "System architecture",
      "Project delivery",
      "Full-stack development",
    ],
  },
];

export default function RecruitersPage() {
  return (
    <div className="min-h-screen">
      <CareerArcHero />

      <div className="container mx-auto space-y-12 px-4 py-12 md:py-16">
        {/* Quick facts */}
        <section aria-labelledby="quick-facts-heading">
          <h2 id="quick-facts-heading" className="sr-only">
            Quick facts
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { value: "16+", label: "Years of experience" },
              { value: "Staff", label: "Current level at GoFundMe" },
              { value: "Bay Area", label: "Based in California, USA" },
            ].map((fact) => (
              <Card key={fact.label} className="border border-border text-center shadow-lg">
                <CardContent className="py-6">
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {fact.value}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{fact.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section aria-labelledby="experience-heading">
          <h2
            id="experience-heading"
            className="mb-6 text-2xl font-bold sm:text-3xl"
          >
            Experience
          </h2>
          <div className="space-y-6">
            {experience.map((job) => (
              <Card key={job.company} className="border border-border shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">{job.company}</CardTitle>
                  <CardDescription className="space-y-2">
                    {job.roles.map((role) => (
                      <div key={`${role.title}-${role.period}`}>
                        <p className="font-medium text-foreground">{role.title}</p>
                        <p>
                          {role.period}
                          {role.location ? ` · ${role.location}` : ""}
                        </p>
                      </div>
                    ))}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                    {job.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section aria-labelledby="skills-heading">
          <h2
            id="skills-heading"
            className="mb-6 text-2xl font-bold sm:text-3xl"
          >
            Skills
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {skillGroups.map((group) => (
              <Card key={group.label} className="border border-border shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{group.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Education */}
        <section aria-labelledby="education-heading">
          <h2
            id="education-heading"
            className="mb-6 flex items-center gap-2 text-2xl font-bold sm:text-3xl"
          >
            <GraduationCap className="h-7 w-7" aria-hidden="true" />
            Education
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {education.map((item) => (
              <Card key={item.school} className="border border-border shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">{item.degree}</CardTitle>
                  <CardDescription>
                    {item.school} · {item.period}
                    <br />
                    {item.location} · {item.detail}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* Languages & footer CTA */}
        <section aria-labelledby="languages-heading">
          <Card className="border border-border bg-linear-to-r from-blue-50 to-indigo-50 shadow-lg dark:from-blue-950/60 dark:to-indigo-950/60">
            <CardHeader>
              <CardTitle id="languages-heading">Languages</CardTitle>
              <CardDescription className="text-base text-foreground dark:text-foreground">
                English — full professional proficiency
                <br />
                Mongolian — native
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-sm text-muted-foreground">
                Open to discussing senior and staff-level engineering roles in the
                United States. The fastest way to reach me is on LinkedIn.
              </p>
              <Link
                href="https://www.linkedin.com/in/oggi/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-blue-600 hover:underline dark:text-blue-400"
              >
                linkedin.com/in/oggi
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </Link>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
