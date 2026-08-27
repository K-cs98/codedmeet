import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Coded Meets",
    template: "%s | Coded Meets",
  },
  description: "Connect, collaborate, and build with developers and teams worldwide.",
  keywords: ["Coded Meets", "developer network", "code collaboration", "fieldwork"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}