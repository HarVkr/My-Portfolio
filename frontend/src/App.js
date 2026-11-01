import { Component, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import CustomCursor from "@/components/CustomCursor";
import EntryExperience from "@/pages/EntryExperience";
import ProfileSelection from "@/components/ProfileSelection";
import FeaturedHero from "@/components/FeaturedHero";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { err: null };
  }
  static getDerivedStateFromError(err) {
    return { err };
  }
  render() {
    if (this.state.err) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            background: "#090909",
            color: "#A7A2A0",
            fontFamily: "'DM Sans', sans-serif",
            gap: 16,
          }}
        >
          <p>Something went wrong.</p>
          <button
            type="button"
            onClick={() => {
              this.setState({ err: null });
              window.location.href = "/";
            }}
            style={{
              border: "1px solid rgba(231,226,223,0.2)",
              padding: "10px 20px",
              color: "#E7E2DF",
              cursor: "pointer",
            }}
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<EntryExperience />} />
        <Route path="/profiles" element={<ProfileSelection />} />
        <Route path="/profile/:profileId" element={<FeaturedHero />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <CustomCursor />
      <BrowserRouter>
        <ScrollReset />
        <AnimatedRoutes />
        <Toaster
          theme="dark"
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#171719",
              border: "1px solid rgba(231,226,223,0.1)",
              color: "#E7E2DF",
            },
          }}
        />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
