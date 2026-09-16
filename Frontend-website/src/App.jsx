import { Component, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, Route, Routes, useLocation } from "react-router-dom";

import { MobileActionBar } from "@/components/site/MobileActionBar";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Toaster } from "@/components/ui/sonner";
import About from "@/pages/about";
import Appointment from "@/pages/appointment";
import Conditions from "@/pages/conditions";
import Contact from "@/pages/contact";
import Faq from "@/pages/faq";
import Home from "@/pages/index";
import Privacy from "@/pages/privacy";
import Services from "@/pages/services";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
          <div className="max-w-md text-center">
            <h1 className="text-xl font-semibold tracking-tight text-foreground">
              This page didn't load
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Something went wrong on our end. You can try refreshing or head back home.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <button
                onClick={() => this.setState({ hasError: false })}
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Try again
              </button>
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                Go home
              </a>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Helmet>
        <title>ShushrutamVed Care | Naturopathy &amp; Lifestyle Wellness</title>
        <meta
          name="description"
          content="Premium naturopathy and lifestyle medicine clinic led by Dr. Aarti Sen — natural healing for weight, thyroid, PCOS, digestion, pain and stress."
        />
        <meta name="author" content="GhostCode Dynamics" />
        <meta
          property="og:title"
          content="ShushrutamVed Care | Naturopathy &amp; Lifestyle Wellness"
        />
        <meta
          property="og:description"
          content="Natural healing for a healthier life, guided by Dr. Aarti Sen."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <ScrollToTop />
      <SiteHeader />
      <main className="flex-1">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/conditions" element={<Conditions />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFoundComponent />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <SiteFooter />
      <MobileActionBar />
      <Toaster />
    </div>
  );
}
