// components/layout/MegaMenu.tsx
'use client';

import Link from 'next/link';
import { NavbarItem } from '@/types/global';
import { generateSlug } from '@/utils/slugify';

interface MegaMenuProps {
  navItem?: NavbarItem;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ navItem }) => {
  if (!navItem?.sections || navItem.sections.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {navItem.sections.map((section) => (
            <div key={section.id} className="space-y-4">
              <h3 className="font-bold text-lg text-black border-b border-gray-100 pb-2">
                {section.title}
              </h3>
              {section.items && section.items.length > 0 && (
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/collections/${generateSlug(navItem.name)}-${generateSlug(item.name)}`}
                        className="text-gray-600 hover:text-black transition-colors duration-200 text-sm block py-1 hover:underline"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;