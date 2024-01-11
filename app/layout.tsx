import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Nav from "@/components/nav";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Patrol Analytics",
    template: "%s | Patrol Analytics",
  },
  description:
    "Research application for the analysis of police patrols in Rio de Janeiro.",
  openGraph: {
    title: "Patrol Analytics",
    description:
      "Research application for the analysis of police patrols in Rio de Janeiro.",
    url: "",
    siteName: "Patrol Analytics",
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
const cx = (...classes: any) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        "text-black bg-white dark:text-white dark:bg-[#111010]",
        inter.className,
        inter.className.split(" ").map((c) => `font-${c}`)
      )}
    >
      <body className="antialiased max-w-3xl mb-40 flex flex-col md:flex-row mx-4  lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Nav />

          {children}

          <Footer />
        </main>
      </body>
    </html>
  );
}
