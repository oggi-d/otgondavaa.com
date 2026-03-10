import { MentorshipContentLayout } from "../mentorship-content-layout";
import { topicIndexSections } from "../topic-index";
import { getTopicBySlug } from "../topics";
import { getMentorshipMetadata } from "../shared-metadata";

const introTopic = getTopicBySlug("intro");

export const metadata = getMentorshipMetadata({
  title: `${introTopic?.title || "Сургалтын танилцуулга"} - Otgondavaa`,
  description:
    introTopic?.description ||
    "Үндсэн сэдвийн индекс — нэр ба холбогдох асуудлын товч.",
  path: introTopic?.href || "/mentorship/intro",
  ogTitle: introTopic?.title || "Сургалтын танилцуулга",
});

export default function MentorshipIntroPage() {
  return (
    <MentorshipContentLayout
      title={introTopic?.title || "Сургалтын танилцуулга"}
      sections={topicIndexSections}
      variant="intro"
    />
  );
}
