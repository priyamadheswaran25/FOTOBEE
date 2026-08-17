import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Navbar } from "./components/Common/Navbar";
import { Footer } from "./components/Common/Footer";
import { WhatsAppButton } from "./components/Common/WhatsAppButton";
import { FilmGrain } from "./components/Common/FilmGrain";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { ProtectedAdminRoute } from "./components/Admin/ProtectedAdminRoute";
import { AdminLayout } from "./components/Admin/AdminLayout";

// Public Pages
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Services } from "./pages/Services";
import { TraditionalPhotography } from "./pages/TraditionalPhotography";
import { TraditionalVideography } from "./pages/TraditionalVideography";
import { CandidVideography } from "./pages/CandidVideography";
import { CandidPhotography } from "./pages/CandidPhotography";
import { DroneVideography } from "./pages/DroneVideography";
import { StreetPhotography } from "./pages/StreetPhotography";
import { FestivalPhotography } from "./pages/FestivalPhotography";
import { TravelPhotography } from "./pages/TravelPhotography";
import { Portfolio } from "./pages/Portfolio";
import { Stories } from "./pages/Stories";
import { StoryDetail } from "./pages/StoryDetail";
import { Packages } from "./pages/Packages";
import { Contact } from "./pages/Contact";
import { Testimonials } from "./pages/Testimonials";
import { DynamicServiceDetail } from "./pages/DynamicServiceDetail";

// Admin Pages
import { AdminLogin } from "./pages/Admin/AdminLogin";
import { AdminOverview } from "./pages/Admin/AdminOverview";
import { AdminInquiries } from "./pages/Admin/AdminInquiries";
import { AdminServices } from "./pages/Admin/AdminServices";
import { AdminPackages } from "./pages/Admin/AdminPackages";
import { AdminStories } from "./pages/Admin/AdminStories";
import { AdminCategories } from "./pages/Admin/AdminCategories";
import { AdminPortfolios } from "./pages/Admin/AdminPortfolios";
import { AdminTestimonials } from "./pages/Admin/AdminTestimonials";
import { AdminConfig } from "./pages/Admin/AdminConfig";

// Component to scroll to top on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Main layout content wrapper with conditional public chrome
const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<AdminOverview />} />
          <Route path="inquiries" element={<AdminInquiries />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="packages" element={<AdminPackages />} />
          <Route path="stories" element={<AdminStories />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="portfolios" element={<AdminPortfolios />} />
          <Route path="portfolio" element={<Navigate to="/admin/categories" replace />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="config" element={<AdminConfig />} />
        </Route>
      </Routes>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Vintage Film Overlay */}
      <FilmGrain />

      {/* Sticky Header Nav */}
      <Navbar />

      {/* Page Content Routes */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/traditional-photography" element={<TraditionalPhotography />} />
          <Route path="/services/traditional-videography" element={<TraditionalVideography />} />
          <Route path="/services/candid-videography" element={<CandidVideography />} />
          <Route path="/services/candid-photography" element={<CandidPhotography />} />
          <Route path="/services/drone-videography" element={<DroneVideography />} />
          <Route path="/services/street-photography" element={<StreetPhotography />} />
          <Route path="/services/festival-photography" element={<FestivalPhotography />} />
          <Route path="/services/travel-photography" element={<TravelPhotography />} />
          <Route path="/services/:slug" element={<DynamicServiceDetail />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/stories/:slug" element={<StoryDetail />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          {/* Fallback redirect to Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Global Floating Actions */}
      <WhatsAppButton />

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ToastProvider>
          <Router>
            <ScrollToTop />
            <AppContent />
          </Router>
        </ToastProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
