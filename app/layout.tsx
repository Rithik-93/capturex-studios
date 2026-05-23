import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CaptureX — Photography & Film Studio, Hyderabad",
  description:
    "A luxury photography and videography studio capturing weddings, fashion, food, product, events, sports, and corporate work in Hyderabad.",
  openGraph: {
    title: "CaptureX — Photography & Film Studio",
    description:
      "Luxury photography and film for life's defining moments.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <body className="min-h-screen bg-void text-ivory antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
