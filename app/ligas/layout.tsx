import type { Metadata } from "next";
import NavHeader from "@/components/Layout/NavHeader/NavHeader";

export const metadata: Metadata = {
  title: "Ligas | Hack Padel",
  description:
    "Consulta la clasificación, jugadores y rondas de las ligas en Hack Padel.",
  openGraph: {
    title: "Ligas | Hack Padel",
    description:
      "Consulta la clasificación, jugadores y rondas de las ligas en Hack Padel.",
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

export default function LeaguesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-black text-white min-h-[100vh]">
      <div className="container mx-auto py-16 px-4">
        <NavHeader />
        {children}
      </div>
    </div>
  );
}
