import type { Metadata } from "next";
import { BirthdayVideo } from "./birthday-video";

export const metadata: Metadata = {
  title: "pretty-sumi-2026",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PrettySumi2026Page() {
  return <BirthdayVideo />;
}
