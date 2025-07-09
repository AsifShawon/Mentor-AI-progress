'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type CursorVariant = 'default' | 'text' | 'button' | 'clickable';

interface CursorStyle {
  scale: number;
  backgroundColor: string;
  width: number;
  height: number;
  borderRadius: string;
  border?: string;
}

// Text-based elements that should show I-beam cursor
const textElements = new Set([
  'p', 'span',
  'code', 'pre', 'blockquote', 'em', 'strong', 'i', 'b',
  'small', 'mark', 'del', 'ins', 'sub', 'sup', 'text',
  'input', 'textarea', 'label'
]);

// Clickable elements that should show enlarged cursor
const clickableElements = new Set([
  'button', 'a', 'select', 'option'
]);

const CursorAnimation = () => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const smoothX = useSpring(cursorX, { damping: 25, stiffness: 400 });
  const smoothY = useSpring(cursorY, { damping: 25, stiffness: 400 });

  const [variant, setVariant] = useState<CursorVariant>('default');
  const [dynamicColor, setDynamicColor] = useState('#00FFFF'); // Initial vibrant color

  // Function to get contrasting color based on background
  const getContrastingColor = (bgColor: string): string => {
    // If bgColor is a standard hex, convert it to RGB
    let r, g, b;
    if (bgColor.startsWith('#')) {
      const hex = bgColor.replace('#', '');
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    } else if (bgColor.startsWith('rgb')) {
      const matches = bgColor.match(/\d+/g);
      if (matches && matches.length >= 3) {
        r = parseInt(matches[0]);
        g = parseInt(matches[1]);
        b = parseInt(matches[2]);
      } else {
        // Fallback if RGB parsing fails
        return '#00FFFF'; // Default vibrant cyan
      }
    } else {
      // Fallback for other color formats or transparency issues
      return '#00FFFF'; // Default vibrant cyan
    }

    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return clearly contrasting vibrant colors
    if (luminance > 0.5) {
      // Light background, return dark vibrant color (e.g., your primary blue from Tailwind)
      return 'hsl(217 91% 60%)'; // --primary blue from your tailwind config
    } else {
      // Dark background, return light vibrant color (e.g., bright cyan or yellow)
      return '#00FFFF'; // Bright Cyan
      // Or return '#FFFF00'; // Bright Yellow
      // Or return '#39FF14'; // Neon Green
    }
  };

  // Function to get computed background color
  const getElementBackgroundColor = (element: HTMLElement): string => {
    const computedStyle = window.getComputedStyle(element);
    let bgColor = computedStyle.backgroundColor;

    // If transparent, traverse up the DOM tree
    let currentElement = element;
    while (bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
      if (currentElement.parentElement) {
        currentElement = currentElement.parentElement;
      } else {
        bgColor = window.getComputedStyle(document.body).backgroundColor;
        break;
      }
      if (currentElement === document.body) {
        bgColor = window.getComputedStyle(document.body).backgroundColor;
        break;
      }
      bgColor = window.getComputedStyle(currentElement).backgroundColor;
    }

    // Convert rgba to hex if needed (CORRECTED padStart values)
    if (bgColor.startsWith('rgb')) {
      const matches = bgColor.match(/\d+/g);
      if (matches && matches.length >= 3) {
        const r = parseInt(matches[0]).toString(16).padStart(2, '0');
        const g = parseInt(matches[1]).toString(16).padStart(2, '0');
        const b = parseInt(matches[2]).toString(16).padStart(2, '0');
        return `#${r}${g}${b}`;
      }
    }

    // Ensure it's always a hex color for consistent luminance calculation
    if (!bgColor.startsWith('#') && bgColor.length > 0) {
        // Fallback to a default if it's not hex or rgb and not empty
        return '#ffffff';
    }
    
    return bgColor || '#ffffff';
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      const tagName = target?.tagName?.toLowerCase();
      const isContentEditable = target?.isContentEditable;

      // Get background color and calculate contrasting color
      const bgColor = getElementBackgroundColor(target);
      const contrastingColor = getContrastingColor(bgColor);
      setDynamicColor(contrastingColor);

      // Determine cursor variant based on element type
      if (clickableElements.has(tagName)) {
        setVariant('button');
      } else if (textElements.has(tagName) || isContentEditable) {
        setVariant('text');
      } else if (
        target?.style?.cursor === 'pointer' ||
        target?.onclick ||
        target?.getAttribute('role') === 'button'
      ) {
        setVariant('clickable');
      } else {
        setVariant('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  const getStyle = (): CursorStyle => {
    const baseStyle = {
      scale: 1,
      backgroundColor: dynamicColor,
      width: 20,
      height: 20,
      borderRadius: '50%',
    };

    switch (variant) {
      case 'button':
        return {
          ...baseStyle,
          scale: 1.8,
          width: 20,
          height: 20,
          backgroundColor: dynamicColor,
          border: `2px solid ${dynamicColor}`, // Use dynamicColor for border
        };
      case 'text':
        return {
          ...baseStyle,
          scale: 1,
          backgroundColor: dynamicColor, // Use dynamicColor for I-beam
          width: 8,
          height: 40,
          borderRadius: '2px',
        };
      case 'clickable':
        return {
          ...baseStyle,
          scale: 1.4,
          width: 18,
          height: 18,
          backgroundColor: dynamicColor,
        };
      case 'default':
      default:
        return baseStyle;
    }
  };

  const style = getStyle();

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        translateX: '-50%',
        translateY: '-50%',
        x: smoothX,
        y: smoothY,
        backgroundColor: style.backgroundColor,
        width: style.width,
        height: style.height,
        borderRadius: style.borderRadius,
        scale: style.scale,
        border: style.border,
        mixBlendMode: 'difference', // This helps with visibility on various backgrounds
      }}
      transition={{
        type: 'spring',
        damping: 25,
        stiffness: 400,
        mass: 0.5
      }}
    />
  );
};

export default CursorAnimation;