import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CS 391 MP5",
  description: "URL Shortener",
};

export default function RootLayout({children,}: {children: React.ReactNode;}) {
  return (
      <html lang="en">
          <body>
              <main>{children}</main>
          </body>
      </html>
  );
}
