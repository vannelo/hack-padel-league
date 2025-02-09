"use client";

import Image from "next/image";
import Link from "next/link";

export default function NavHeader() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Link href="/" className="text-primary font-bold text-2xl">
        <Image
          src="/img/hack-logo.png"
          width={160}
          height={160}
          alt="Hack Padel Logo"
          className="mx-auto"
        />
      </Link>
    </div>
  );
}
