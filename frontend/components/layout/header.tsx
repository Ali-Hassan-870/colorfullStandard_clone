'use client';

import { useEffect, useState } from 'react';
import { getGlobalData } from '@/lib/api';
import { GlobalData } from '@/types/global';
import Navbar from './navbar';

const Header: React.FC = () => {
  const [globalData, setGlobalData] = useState<GlobalData | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGlobalData();
        if (data) {
          setGlobalData(data);
        } else {
        //   setError('Failed to fetch data');
        }
      } catch (err) {
        // setError('An error occurred while fetching data');
        console.error('Error in Header:', err);
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

//   if (loading) {
//     return (
//       <div className="w-full h-16 bg-white border-b border-gray-200 flex items-center justify-center">
//         <div className="text-sm text-gray-500">Loading...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="w-full h-16 bg-white border-b border-gray-200 flex items-center justify-center">
//         <div className="text-sm text-red-500">{error}</div>
//       </div>
//     );
//   }

  return (
    <header className="w-full">
      {/* Banner */}
      {globalData?.banner && (
        <div className="bg-[#F1F1F1] text-center py-4 text-[10px] font-semibold text-gray-700 px-0">
          {globalData.banner.content}
        </div>
      )}
      
      {/* Navbar */}
      <Navbar navbarData={globalData?.navbar} />
    </header>
  );
};

export default Header;
