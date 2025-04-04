'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function NavHeader() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Link href="/" className="text-2xl font-bold text-primary">
        <Image
          src="/img/hack-logo.png"
          width={120}
          height={120}
          alt="Hack Padel Logo"
          className="mx-auto"
        />
      </Link>
    </div>
  );
}
