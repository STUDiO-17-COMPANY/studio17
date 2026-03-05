import { useEffect } from 'react';

export default function useNavbarScroll(navbarId = 'navbar') {
  useEffect(() => {
    let lastScroll = 0;
    const scrollThreshold = 10;

    const handleScroll = () => {
      const navbar = document.getElementById(navbarId);
      if (!navbar) return;

      const currentScroll = window.pageYOffset;
      if (Math.abs(lastScroll - currentScroll) <= scrollThreshold) return;

      if (currentScroll <= 0) {
        navbar.classList.remove('-translate-y-full');
      } else if (currentScroll > lastScroll && !navbar.classList.contains('-translate-y-full')) {
        navbar.classList.add('-translate-y-full');
      } else if (currentScroll < lastScroll && navbar.classList.contains('-translate-y-full')) {
        navbar.classList.remove('-translate-y-full');
      }
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navbarId]);
}
