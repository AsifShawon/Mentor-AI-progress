"use client";

import { type Variants, motion, useAnimationControls } from "framer-motion";
import React, { useState } from "react";

type PathData = {
  d: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: "butt" | "round" | "square";
};

type HoverAnimationType = "float" | "pulse" | "redraw" | "color" | "sequential";

type TAnimateSvgProps = {
  width: string;
  height: string;
  viewBox: string;
  className: string;
  path?: string; // Single path (legacy)
  paths?: PathData[]; // New multiple path support
  strokeColor?: string;
  strokeWidth?: number;
  strokeLinecap?: "butt" | "round" | "square";
  animationDuration?: number;
  animationDelay?: number;
  animationBounce?: number;
  staggerDelay?: number;
  reverseAnimation?: boolean;
  enableHoverAnimation?: boolean;
  hoverAnimationType?: HoverAnimationType;
  hoverStrokeColor?: string | null;
  initialAnimation?: boolean;
};

export const AnimateSvg: React.FC<TAnimateSvgProps> = ({
  width,
  height,
  viewBox,
  className,
  path,
  paths = [],
  strokeColor = "#cecece",
  strokeWidth = 3,
  strokeLinecap = "round",
  animationDuration = 1.5,
  animationDelay = 0,
  animationBounce = 0.3,
  staggerDelay = 0.2,
  reverseAnimation = false,
  enableHoverAnimation = false,
  hoverAnimationType = "redraw",
  hoverStrokeColor = "#4f46e5",
  initialAnimation = true,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  // Normalize paths: if 'paths' prop is provided, use it. Otherwise, if 'path' is provided,
  // convert it into a single-element array for consistency.
  const normalizedPaths: PathData[] = React.useMemo(() => {
    if (paths.length > 0) return paths;
    if (path) {
      return [
        {
          d: path,
          stroke: strokeColor,
          strokeWidth,
          strokeLinecap,
        },
      ];
    }
    return [];
  }, [paths, path, strokeColor, strokeWidth, strokeLinecap]);

  // Define animation variants for the SVG paths.
  // These control the initial drawing animation of the SVG lines.
  const getPathVariants = (index: number): Variants => ({
    hidden: {
      pathLength: 0, // Start with no path drawn
      opacity: 0, // Start invisible
      pathOffset: reverseAnimation ? 1 : 0, // Controls the starting point of the dash array
    },
    visible: {
      pathLength: 1, // Draw the full path
      opacity: 1, // Become fully visible
      pathOffset: reverseAnimation ? 0 : 0, // End at the normal offset
      transition: {
        pathLength: {
          type: "spring", // Spring animation for a natural feel
          duration: animationDuration,
          bounce: animationBounce, // How much the spring should "bounce"
          delay: animationDelay + index * staggerDelay, // Stagger delay for multiple paths
        },
        pathOffset: {
          duration: animationDuration,
          delay: animationDelay + index * staggerDelay,
        },
        opacity: {
          duration: animationDuration / 4, // Opacity transition is faster
          delay: animationDelay + index * staggerDelay,
        },
      },
    },
  });

  // If no paths are defined, render nothing.
  if (normalizedPaths.length === 0) return null;

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={initialAnimation ? "hidden" : "visible"} // Control initial visibility based on prop
      animate="visible" // Animate to the visible state
      onHoverStart={() => setIsHovering(true)} // Set hover state on mouse enter
      onHoverEnd={() => setIsHovering(false)} // Clear hover state on mouse leave
      whileHover={
        enableHoverAnimation && hoverAnimationType !== "redraw"
          ? { scale: 1.05 } // Apply a slight scale transform on hover for non-redraw types
          : {}
      }
      preserveAspectRatio="none" // Crucial: Allows the SVG content to stretch to fill the container's width and height, ignoring aspect ratio.
    >
      {normalizedPaths.map((pathData, index) => (
        <AnimatedPath
          key={index}
          pathData={pathData}
          index={index}
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap={strokeLinecap}
          initialAnimation={initialAnimation}
          pathVariants={getPathVariants(index)}
          isHovering={isHovering && enableHoverAnimation}
          hoverAnimationType={hoverAnimationType}
          hoverStrokeColor={hoverStrokeColor}
          totalPaths={normalizedPaths.length}
        />
      ))}
    </motion.svg>
  );
};

interface AnimatedPathProps {
  pathData: PathData;
  index: number;
  strokeColor: string;
  strokeWidth: number;
  strokeLinecap: "butt" | "round" | "square";
  initialAnimation: boolean;
  pathVariants: Variants;
  isHovering: boolean;
  hoverAnimationType: HoverAnimationType;
  hoverStrokeColor: string | null;
  totalPaths: number;
}

const AnimatedPath: React.FC<AnimatedPathProps> = ({
  pathData,
  index,
  strokeColor,
  strokeWidth,
  strokeLinecap,
  initialAnimation,
  pathVariants,
  isHovering,
  hoverAnimationType,
  hoverStrokeColor,
  totalPaths,
}) => {
  const controls = useAnimationControls(); // Controls for imperative animations
  const originalColor = pathData.stroke || strokeColor; // Determine the original stroke color

  // Effect hook to handle hover animations based on the `hoverAnimationType`
  React.useEffect(() => {
    if (!isHovering) {
      // If not hovering, stop any ongoing animations and revert to initial state if applicable
      controls.stop();
      if (initialAnimation) {
        controls.start("visible"); // Revert to the initial drawing animation
      }
      return;
    }

    // Apply specific hover animations
    switch (hoverAnimationType) {
      case "redraw":
        controls.start({
          pathLength: [1, 0, 1], // Animate path from full to empty and back to full
          transition: {
            pathLength: {
              repeat: Number.POSITIVE_INFINITY, // Loop indefinitely
              duration: 3,
              ease: "easeInOut",
            },
          },
        });
        break;

      case "float":
        controls.start({
          y: [0, -2, 0], // Animate vertical floating motion
          transition: {
            y: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.5,
              ease: "easeInOut",
            },
          },
        });
        break;

      case "pulse":
        controls.start({
          scale: [1, 1.03, 1], // Animate a slight scaling pulse
          transition: {
            scale: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.3,
              ease: "easeInOut",
            },
          },
        });
        break;

      case "color":
        controls.start({
          stroke: [
            originalColor,
            hoverStrokeColor || strokeColor, // Transition to hover color and back
            originalColor,
          ],
          transition: {
            stroke: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              ease: "easeInOut",
            },
          },
        });
        break;

      case "sequential":
        controls.start({
          pathLength: [1, 0, 1], // Animate path from full to empty and back to full
          transition: {
            pathLength: {
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              delay: (index / Math.max(totalPaths, 1)) * 2, // Stagger delay for sequential animation
              ease: "easeInOut",
            },
          },
        });
        break;
    }
  }, [
    isHovering,
    hoverAnimationType,
    controls,
    originalColor,
    hoverStrokeColor,
    strokeColor,
    index,
    totalPaths,
    initialAnimation,
  ]);

  return (
    <motion.path
      d={pathData.d} // SVG path data
      stroke={pathData.stroke ?? strokeColor} // Stroke color, fallback to prop
      strokeWidth={pathData.strokeWidth ?? strokeWidth} // Stroke width, fallback to prop
      strokeLinecap={pathData.strokeLinecap ?? strokeLinecap} // Stroke line cap, fallback to prop
      initial={initialAnimation ? "hidden" : "visible"} // Initial animation state
      animate={controls} // Use animation controls for imperative animations (e.g., hover)
      variants={pathVariants} // Variants for declarative animations (e.g., initial draw)
    />
  );
};
