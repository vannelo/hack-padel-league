import NavHeader from "@/components/Layout/NavHeader/NavHeader";

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
