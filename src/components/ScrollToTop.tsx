import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop component that automatically scrolls to the top of the page
 * when the route changes. This improves user experience by ensuring users
 * start at the top of new pages instead of maintaining scroll position.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when pathname changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // Smooth scrolling for better UX
    });
  }, [pathname]);

  // This component doesn't render anything
  return null;
}

export default ScrollToTop;
