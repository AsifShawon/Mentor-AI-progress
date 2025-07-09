"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"; // Assuming this path is correct for shadcn/ui Button
import { Brain, Menu, X } from "lucide-react"; // Icons from lucide-react
import { cn } from "@/lib/utils"; // Assuming this path is correct for utility functions
import { AnimateSvg } from "./nav-curved-line"; // Import the AnimateSvg component

// Define navigation items
const navigation = [
  { name: "Home", href: "/" },
  { name: "About Project", href: "/about" },
  { name: "Roadmap", href: "/roadmap" },
  { name: "Features", href: "/features" },
  { name: "Progress", href: "/progress" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu open/close
  const pathname = usePathname(); // Get current pathname for active link styling

  return (
    <nav className="fixed top-0 w-full bg-slate-900/90 backdrop-blur-md border-b border-blue-500/20 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }} // Hover animation for the logo icon
              className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg glow-blue"
            >
              <Brain className="w-6 h-6 text-white" /> {/* Brain icon */}
            </motion.div>
            <span className="text-xl font-bold gradient-text font-rubik">
              AI Tutor {/* App title */}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative px-3 py-2 text-sm font-medium transition-colors hover:text-blue-400 font-silkscreen",
                  pathname === item.href ? "text-blue-400" : "text-blue-100" // Apply active link styling
                )}
              >
                {item.name}
                {pathname === item.href && (
                  // AnimateSvg component for the active link underline
                  <AnimateSvg
                    width="100%" // SVG takes full width of the parent Link
                    height="8px" // Fixed small height for the underline effect
                    viewBox="0 -10 280 60" // Adjusted viewBox to contain the entire path and allow vertical squashing
                    className="absolute bottom-0 left-0" // Position absolutely at the bottom-left of the parent Link
                    path="M276.107 10.7667C258.31 28.3296 234.687 49.9446 218.918 18.406C204.994 -9.44212 183.022 5.05179 163.639 21.9074C157.838 26.9518 147.594 35.084 139.023 33.2603C131.032 31.5602 124.159 19.4215 117.166 15.0108C102.691 5.88068 78.6731 19.6982 64.5392 24.1355C43.8618 30.6273 24.6478 36.5711 3 33.6847"
                    strokeColor="#ffffff"
                    strokeWidth={5}
                    strokeLinecap="round"
                    animationDuration={1}
                    animationDelay={0}
                    animationBounce={0.3}
                    reverseAnimation={false}
                    enableHoverAnimation={false}
                    // preserveAspectRatio="none" is now handled inside AnimateSvg component
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)} // Toggle mobile menu
              className="text-blue-100 hover:text-blue-400 hover:bg-slate-800"
            >
              {isOpen ? (
                <X className="w-5 h-5" /> // 'X' icon when menu is open
              ) : (
                <Menu className="w-5 h-5" /> // 'Menu' icon when menu is closed
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Links (conditionally rendered) */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} // Initial animation for mobile menu
            animate={{ opacity: 1, y: 0 }} // Animate to visible state
            exit={{ opacity: 0, y: -20 }} // Exit animation
            className="md:hidden py-4 border-t border-blue-500/20"
          >
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors font-silkscreen",
                    pathname === item.href
                      ? "bg-blue-500/20 text-blue-400" // Active link styling for mobile
                      : "text-blue-100 hover:bg-slate-800 hover:text-blue-400"
                  )}
                  onClick={() => setIsOpen(false)} // Close menu on link click
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
