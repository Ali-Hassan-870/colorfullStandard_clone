"use client";

import { useState } from "react";
import { ChevronDown, Search, User, ShoppingBag } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Navbar as NavbarType, NavbarItem } from "@/types/global";
import MegaMenu from "./mega-menu";
import Logo from "../common/logo";

interface NavbarProps {
  navbarData?: NavbarType;
}

const Navbar: React.FC<NavbarProps> = ({ navbarData }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleNavItemEnter = (itemName: string) => {
    const item = navbarData?.items?.find(
      (nav: NavbarItem) => nav.name === itemName
    );
    if (item?.sections?.length) {
      setActiveDropdown(itemName);
    }
  };

  const handleNavAreaLeave = () => {
    setActiveDropdown(null);
  };

  if (!navbarData?.items) return null;

  return (
    <div className="relative" onMouseLeave={handleNavAreaLeave}>
      <nav className="bg-white sticky top-0 z-50">
        <div className="px-10 py-4">
          <div className="flex justify-between items-center h-16">
            {/* Left Navigation */}
            <div className="flex items-center">
              <NavigationMenu className="!p-0 !m-0">
                <NavigationMenuList className="flex items-center space-x-1 !p-0 !m-0 [&>li]:list-none">
                  {navbarData.items.map((navItem) => (
                    <NavigationMenuItem key={navItem.id}>
                      <div
                        onMouseEnter={() => handleNavItemEnter(navItem.name)}
                      >
                        <Button
                          variant="ghost"
                          className="text-black hover:text-[#5E5E5E] font-medium h-auto px-3 py-2 text-sm rounded-md flex items-center gap-1"
                        >
                          {navItem.name}

                          <ChevronDown className="h-4 w-4 text-black hover:text-[#5E5E5E]" />
                        </Button>
                      </div>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Centered Logo */}
            <div className="flex-shrink-0 absolute left-1/2 transform -translate-x-1/2">
              <Logo />
            </div>

            {/* Right Actions */}
            <div className="flex items-center justify-end flex-1 gap-1">
              <Button
                variant="ghost"
                className="text-black px-3 py-2 text-sm font-medium flex items-center gap-1"
              >
                Germany (EUR €)
                <ChevronDown className="h-3 w-3 text-black" />
              </Button>

              <Button
                variant="ghost"
                className="text-black px-3 py-2 text-sm font-medium flex items-center gap-1"
              >
                English
                <ChevronDown className="h-3 w-3 text-black" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-black"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-black"
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-black relative"
                aria-label="Shopping bag"
              >
                <ShoppingBag className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mega Menu */}
      {activeDropdown && (
        <MegaMenu
          navItem={navbarData.items.find(
            (item) => item.name === activeDropdown
          )}
        />
      )}
    </div>
  );
};

export default Navbar;
