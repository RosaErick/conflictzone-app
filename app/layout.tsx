import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/ Footer";
import { ThemeProvider } from "@/components/theme-provider";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="antialiased max-w-7xl  flex flex-col md:flex-row mx-4 mb-4 lg:mx-auto">
            <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
              <Nav />

              {children}

              <Footer />
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
