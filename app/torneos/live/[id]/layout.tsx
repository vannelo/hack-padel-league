import Image from 'next/image';

export default function LeaguesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-[100vh] bg-black">
      <div className="absolute top-8 w-full text-center">
        <Image
          src="/img/hack-logo.png"
          width={100}
          height={100}
          alt="Hack Padel Logo"
          className="mx-auto"
        />
      </div>
      {children}
    </div>
  );
}
