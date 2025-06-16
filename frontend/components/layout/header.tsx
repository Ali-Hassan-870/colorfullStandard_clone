// components/layout/Header.tsx
'use client';

import { useEffect, useState } from 'react';
import { getGlobalData } from '@/lib/api';
import { GlobalData } from '@/types/global';
import Navbar from './navbar';

const Header: React.FC = () => {
  const [globalData, setGlobalData] = useState<GlobalData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGlobalData();
        if (data) setGlobalData(data);
      } catch (err) {
        console.error('Error in Header:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <header className="w-full">
      {globalData?.banner && (
        <div className="bg-[#F1F1F1] text-center py-3 text-[11px] sm:text-xs font-semibold text-gray-700">
          {globalData.banner.content}
        </div>
      )}
      <Navbar navbarData={globalData?.navbar} />
    </header>
  );
};

export default Header;
