import NavHeader from '@/components/Layout/NavHeader/NavHeader';

export default function LeaguesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-[100vh] bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <NavHeader />
        {children}
      </div>
    </div>
  );
}
