import type { Metadata } from "next";
import { SnackbarProvider } from "@/hooks/useSnackBar";
import { Montserrat } from "next/font/google";
import "./globals.css";

// Load Montserrat font from Google Fonts
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hack Padel",
  description: "Primera cancha de padel en Lindavista",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${montserrat.className} antialiased`}>
        <SnackbarProvider>{children}</SnackbarProvider>
      </body>
    </html>
  );
}
