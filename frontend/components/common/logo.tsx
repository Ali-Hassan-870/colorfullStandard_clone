'use client';

import Link from 'next/link';
import Image from 'next/image';

const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
      <div className="text-center">
        {/* <div className="font-bold text-xl tracking-tight text-black">
          COLORFUL
        </div>
        <div className="font-bold text-xl tracking-tight text-black">
          STANDARD
        </div> */}
      </div>
      {/* If you want to use an image instead, uncomment below and comment the text above */}
      <Image 
        src="/assets/images/logo.svg" 
        alt="Colorful Standard" 
        width={120} 
        height={60}
        className="h-12 w-auto"
        priority
      />
    </Link>
  );
};

export default Logo;