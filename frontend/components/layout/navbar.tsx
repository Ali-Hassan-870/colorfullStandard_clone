"use client";

import { useState } from "react";
import { ChevronDown, Search, User, ShoppingBag, Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
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
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavItemEnter = (itemName: string) => {
    const item = navbarData?.items?.find((nav: NavbarItem) => nav.name === itemName);
    if (item?.sections?.length) {
      setActiveDropdown(itemName);
    }
  };

  const handleNavAreaLeave = () => {
    setActiveDropdown(null);
  };

  if (!navbarData?.items) return null;

  return (
    <div className="relative border-b" onMouseLeave={handleNavAreaLeave}>
      <nav className="bg-white sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-10 py-3">
          <div className="flex justify-between items-center h-16">
            {/* Mobile Menu Button */}
            <div className="flex lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle Menu"
              >
                {mobileOpen ? <X /> : <Menu />}
              </Button>
            </div>

            {/* Left Nav (Desktop Only) */}
            <div className="hidden lg:flex items-center">
              <NavigationMenu className="!p-0 !m-0">
                <NavigationMenuList className="flex items-center space-x-1 !p-0 !m-0 [&>li]:list-none">
                  {navbarData.items.map((navItem) => (
                    <NavigationMenuItem key={navItem.id}>
                      <div onMouseEnter={() => handleNavItemEnter(navItem.name)}>
                        <Button
                          variant="ghost"
                          className="text-black hover:text-[#5E5E5E] font-medium h-auto px-3 py-2 text-sm rounded-md flex items-center gap-1"
                        >
                          {navItem.name}
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                      </div>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Logo />
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center justify-end flex-1 gap-1">
              <Button variant="ghost" className="text-black hidden lg:flex px-3 py-2 text-sm font-medium items-center gap-1">
                Germany (EUR €)
                <ChevronDown className="h-3 w-3" />
              </Button>

              <Button variant="ghost" className="text-black hidden lg:flex px-3 py-2 text-sm font-medium items-center gap-1">
                English
                <ChevronDown className="h-3 w-3" />
              </Button>

              <Button variant="ghost" size="icon" className="text-black" aria-label="Search">
                <Search className="h-5 w-5" />
              </Button>

              <Button variant="ghost" size="icon" className="text-black" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>

              <Button variant="ghost" size="icon" className="text-black relative" aria-label="Shopping bag">
                <ShoppingBag className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="lg:hidden px-6 pb-4 space-y-2">
            {navbarData.items.map((navItem) => (
              <div key={navItem.id} className="border-b">
                <button
                  className="w-full text-left text-sm font-semibold py-2 flex justify-between items-center"
                  onClick={() =>
                    setActiveDropdown(activeDropdown === navItem.name ? null : navItem.name)
                  }
                >
                  {navItem.name}
                  <ChevronDown className="h-4 w-4 transform transition-transform" style={{ transform: activeDropdown === navItem.name ? 'rotate(180deg)' : 'rotate(0)' }} />
                </button>
                {activeDropdown === navItem.name && (
                  <div className="pl-4 pb-2">
                    {navItem.sections?.map((section) => (
                      <div key={section.id} className="mb-2">
                        <div className="text-xs font-medium text-gray-500">{section.title}</div>
                        <ul className="ml-2 space-y-1 mt-1">
                          {section.items.map((item) => (
                            <li key={item.id}>
                              <a
                                href={`/collections/${navItem.name}-${item.name}`}
                                className="text-sm text-gray-700 hover:underline"
                              >
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </nav>

      {/* Desktop Mega Menu */}
      {activeDropdown && (
        <div className="hidden lg:block">
          <MegaMenu
            navItem={navbarData.items.find((item) => item.name === activeDropdown)}
          />
        </div>
      )}
    </div>
  );
};

export default Navbar;
