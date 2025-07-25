import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-lg">W</span>
      </div>
      <span className="text-xl font-bold text-black">WorkFinder</span>
    </Link>
  );
}

export default Logo;
