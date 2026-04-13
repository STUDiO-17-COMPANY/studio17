import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useLenis from './hooks/useLenis';
import Home from './pages/Home';
import Articles from './pages/Articles';
import Partners from './pages/Partners';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  useLenis();

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case-studies/:slug" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/partners" element={<Partners />} />
      </Routes>
    </>
  );
}
