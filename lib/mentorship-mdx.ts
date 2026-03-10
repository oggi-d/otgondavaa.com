import fs from "fs";
import path from "path";
import matter from "gray-matter";

const mentorshipDirectory = path.join(process.cwd(), "content/mentorship");

export interface MentorshipContent {
  slug: string;
  title: string;
  content: string;
}

export function getMentorshipContent(slug: string): MentorshipContent | null {
  try {
    if (!slug) return null;
    const fullPath = path.join(mentorshipDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) return null;
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      slug,
      title: (data.title as string) || slug,
      content,
    };
  } catch (error) {
    console.error(`Error reading mentorship content ${slug}:`, error);
    return null;
  }
}
