import "~/styles/globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { PostHogProvider } from "./_providers/posthog-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CloudDrive - Your Personal Cloud Storage",
  description: "Access your files from anywhere with CloudDrive.",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
          <body className={inter.className}>
            <PostHogProvider>{children}</PostHogProvider>
          </body>
      </html>
    </ClerkProvider>
  );
}
