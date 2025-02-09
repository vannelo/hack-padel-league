import type { Metadata } from "next";
import { SnackbarProvider } from "@/hooks/useSnackBar";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hack Padel",
  description: "Primera cancha de padel en Lindavista",
  openGraph: {
    title: "Hack Padel",
    description: "Primera cancha de padel en Lindavista",
    type: "website",
    images: [
      {
        url: "/img/meta.jpg",
        width: 1500,
        height: 800,
        alt: "Hack Padel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@hackpadel",
    title: "Hack Padel",
    description: "Primera cancha de padel en Lindavista",
    images: ["/img/meta.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${montserrat.className} antialiased`}>
        <SnackbarProvider>
          <main>{children}</main>
        </SnackbarProvider>
      </body>
    </html>
  );
}
