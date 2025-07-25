import Link from "next/link";
import Image from "next/image";

export function AuthHeader() {
  return (
    <div className="text-center mb-4">
      <Link href="/" className="inline-block group">
        <Image
          src="/icon.svg"
          alt="logo"
          width={80}
          height={48}
          className="h-16 w-auto transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </Link>
    </div>
  );
}
