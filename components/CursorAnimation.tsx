'use client'; // This directive makes the component a Client Component

import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// This component can be placed in your `components` folder (e.g., `components/CursorAnimation.js`)
// and then imported into your `app/layout.tsx` or any page.

const CursorAnimation = () => {
  // 1. Motion values for the raw mouse coordinates
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // 2. Spring animations for smooth cursor movement
  // These values will "lag" behind the raw cursorX/Y, creating the smooth effect.
  const springConfig = { damping: 20, stiffness: 300 };
  const smoothCursorX = useSpring(cursorX, springConfig);
  const smoothCursorY = useSpring(cursorY, springConfig);

  // 3. Motion values for the custom cursor's visual properties (scale, background color, width, height, border-radius)
  const cursorVisualScale = useMotionValue(1);
  const cursorVisualBg = useMotionValue('#ffffff'); // Default white color
  const cursorVisualWidth = useMotionValue(16); // Default dot width
  const cursorVisualHeight = useMotionValue(16); // Default dot height
  const cursorVisualBorderRadius = useMotionValue('50%'); // Default dot shape

  // 4. Event handler for mouse movement across the window
  const handleMouseMove = (e: MouseEvent) => {
    // Update the raw motion values with the current mouse position
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);

    // Check the element currently under the cursor
    const targetElement = e.target as HTMLElement; // Cast to HTMLElement for tagName

    // Logic to change cursor appearance based on context
    if (targetElement) {
      const tagName = targetElement.tagName;
      const computedCursor = window.getComputedStyle(targetElement).cursor; // Get the CSS cursor property

      // Check for text-related elements or elements with 'text' cursor style
      if (
        tagName === 'P'
        // tagName === 'SPAN' ||
        // tagName === 'LI' || // Added list items
        // tagName === 'TD' || // Added table data cells
        // tagName === 'TH' || // Added table header cells
        // tagName.startsWith('H') || // H1, H2, H3, etc.
        // computedCursor === 'text' ||
        // computedCursor === 'auto' // 'auto' can often mean text if no other specific cursor is set
      ) {
        // I-beam cursor for text context
        cursorVisualBg.set('#00ff00'); // Green for text context
        cursorVisualScale.set(1); // Keep scale at 1 for consistent 'I' size
        cursorVisualWidth.set(2); // Thin vertical line
        cursorVisualHeight.set(24); // Taller for I-beam
        cursorVisualBorderRadius.set('2px'); // Rectangular shape
      } else 
    //   if (
    //     tagName === 'BUTTON' ||
    //     tagName === 'A' ||
    //     tagName === 'INPUT' || // Added input fields
    //     tagName === 'SELECT' || // Added select fields
    //     tagName === 'TEXTAREA' || // Added textarea fields
    //     computedCursor === 'pointer'
    //   ) 
      {
        // Enlarged dot for interactive elements (buttons, links, form elements)
        cursorVisualBg.set('#ff007f'); // Pink for interactive elements
        cursorVisualScale.set(1.5); // Enlarge for interactive elements
        cursorVisualWidth.set(16); // Revert to dot width
        cursorVisualHeight.set(16); // Revert to dot height
        cursorVisualBorderRadius.set('50%'); // Revert to dot shape
      } 
    //   else {
    //     // Default dot appearance for other elements
    //     cursorVisualBg.set('#ffffff'); // White
    //     cursorVisualScale.set(1); // Normal size
    //     cursorVisualWidth.set(16); // Default dot width
    //     cursorVisualHeight.set(16); // Default dot height
    //     cursorVisualBorderRadius.set('50%'); // Default dot shape
    //   }
    }
  };

  // 5. Attach and clean up the mousemove event listener
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Update the raw motion values with the current mouse position
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Check the element currently under the cursor
      const targetElement = e.target as HTMLElement; // Cast to HTMLElement for tagName

      // Logic to change cursor appearance based on context
      if (targetElement) {
        const tagName = targetElement.tagName;
        const computedCursor = window.getComputedStyle(targetElement).cursor; // Get the CSS cursor property

        // console.log('text color', computedCursor);
        // Check for text-related elements or elements with 'text' cursor style
        if (
          tagName === 'P' ||
          // tagName === 'SPAN' ||
          // tagName === 'LI' || // Added list items
          // tagName === 'TD' || // Added table data cells
          // tagName === 'TH' || // Added table header cells
          // tagName.startsWith('H') || // H1, H2, H3, etc.
          computedCursor === 'text'
          // computedCursor === 'auto' // 'auto' can often mean text if no other specific cursor is set
        ) {
          // I-beam cursor for text context
          cursorVisualBg.set('#f5e36c'); // Green for text context
          cursorVisualScale.set(1); // Keep scale at 1 for consistent 'I' size
          cursorVisualWidth.set(4); // Thin vertical line
          cursorVisualHeight.set(24); // Taller for I-beam
          cursorVisualBorderRadius.set('3px'); // Rectangular shape
        } else 
      //   if (
      //     tagName === 'BUTTON' ||
      //     tagName === 'A' ||
      //     tagName === 'INPUT' || // Added input fields
      //     tagName === 'SELECT' || // Added select fields
      //     tagName === 'TEXTAREA' || // Added textarea fields
      //     computedCursor === 'pointer'
      //   ) 
        {
          // Enlarged dot for interactive elements (buttons, links, form elements)
          cursorVisualBg.set('#ff007f'); // Pink for interactive elements
          cursorVisualScale.set(1.5); // Enlarge for interactive elements
          cursorVisualWidth.set(16); // Revert to dot width
          cursorVisualHeight.set(16); // Revert to dot height
          cursorVisualBorderRadius.set('50%'); // Revert to dot shape
        } 
      //   else {
      //     // Default dot appearance for other elements
      //     cursorVisualBg.set('#ffffff'); // White
      //     cursorVisualScale.set(1); // Normal size
      //     cursorVisualWidth.set(16); // Default dot width
      //     cursorVisualHeight.set(16); // Default dot height
      //     cursorVisualBorderRadius.set('50%'); // Default dot shape
      //   }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // Empty dependency array means this runs once on mount and once on unmount

  return (
    <div
      style={{
        // Removed `cursor: 'none'` from here.
        fontFamily: 'Inter, sans-serif',
        // No background color or dimensions here, as it's meant to overlay existing content.
      }}
    >
      {/* Custom Cursor */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          // Use motion values for dynamic width, height, and border-radius
          width: cursorVisualWidth,
          height: cursorVisualHeight,
          borderRadius: cursorVisualBorderRadius,
          pointerEvents: 'none', // Essential: Allows clicks/hovers to pass through to elements beneath
          zIndex: 9999, // Ensure cursor is on top of all other content
          x: smoothCursorX, // Framer Motion automatically applies transform: translateX()
          y: smoothCursorY, // Framer Motion automatically applies transform: translateY()
          scale: cursorVisualScale,
          backgroundColor: cursorVisualBg,
          // Center the cursor dot/I-beam on the actual mouse position
          // This ensures the dot is centered and the I-beam is aligned correctly.
          translateX: '-50%',
          translateY: '-50%',
        }}
        // Add a spring transition for all visual property changes
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />
    </div>
  );
};

export default CursorAnimation;
