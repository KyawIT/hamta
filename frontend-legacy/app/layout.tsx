import type { Metadata } from "next";
import { Noto_Serif, Manrope } from "next/font/google";
import "./globals.css";
import { getRestaurantSchema } from "@/lib/schema";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hamtarestaurant.at"),
  title: {
    default: "Hamta Restaurant – Persisches Kebap & Grill in Linz",
    template: "%s | Hamta Restaurant Linz",
  },
  description:
    "Persisches und afghanisches Restaurant in Linz-Urfahr. Täglich frisch zubereitete Kebap-Gerichte, Lammspezialitäten und orientalische Küche. Di–So 11–22 Uhr, Hauptstraße 42.",
  keywords: [
    "Hamta Restaurant",
    "Persisches Restaurant Linz",
    "Kebap Linz",
    "Afghanisches Restaurant Linz",
    "Urfahr Restaurant",
    "Lammkebap Linz",
    "Orientalische Küche Linz",
    "Mantu",
    "Grill Restaurant Linz",
    "Hauptstraße 42 Linz",
  ],
  authors: [{ name: "Hamta Restaurant" }],
  creator: "Hamta Restaurant",
  publisher: "Hamta Restaurant",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "de_AT",
    url: "https://hamtarestaurant.at",
    siteName: "Hamta Restaurant",
    title: "Hamta Restaurant – Persisches Kebap & Grill in Linz",
    description:
      "Persisches und afghanisches Restaurant in Linz-Urfahr. Täglich frisch zubereitete Kebap-Gerichte und Lammspezialitäten. Di–So 11–22 Uhr.",
    images: [
      {
        url: "/foods/food-3.jpg",
        width: 1200,
        height: 630,
        alt: "Hamta Restaurant – Persische Küche in Linz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamta Restaurant – Persisches Kebap & Grill in Linz",
    description:
      "Persisches und afghanisches Restaurant in Linz-Urfahr. Täglich frisch. Di–So 11–22 Uhr.",
    images: ["/foods/food-3.jpg"],
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/logo.png", type: "image/png" }],
    shortcut: "/favicon.png",
  },
  alternates: {
    canonical: "https://hamtarestaurant.at",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schema = getRestaurantSchema();

  return (
    <html lang="de" className={`${notoSerif.variable} ${manrope.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="min-h-screen antialiased" style={{ backgroundColor: "#131313", color: "#e5e2e1" }}>
        {children}
      </body>
    </html>
  );
}
