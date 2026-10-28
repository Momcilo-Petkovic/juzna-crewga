import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import LanguageProvider from "./i18n/LanguageProvider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Team from "./pages/Team";
import Pricing from "./pages/Pricing";
import Gallery from "./pages/Gallery";

// every new page starts at the top
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="site">
          <Header />
          <main className="site-main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/kontakt" element={<Contact />} />
              <Route path="/ekipa" element={<Team />} />
              <Route path="/cenovnik" element={<Pricing />} />
              <Route path="/galerija" element={<Gallery />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}
