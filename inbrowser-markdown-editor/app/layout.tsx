import "./globals.css";
import "non.geist";
import "non.geist/mono";
import { Providers } from "@/components/providers";

export const metadata = {
  title: "In-browser Markdown Editor",
  description: "A modern markdown editor with live preview",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-geist antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
