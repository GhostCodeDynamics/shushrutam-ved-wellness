import { Component, Suspense, lazy, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, Route, Routes, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { MobileActionBar } from "@/components/site/MobileActionBar";
import { ChatWidget } from "@/components/site/ChatWidget";
import { Seo } from "@/components/site/Seo";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Toaster } from "@/components/ui/sonner";

import { initAnalytics, trackPageView } from "@/lib/analytics";
import Home from "@/pages/index";

const About = lazy(() => import("@/pages/about"));
const Appointment = lazy(() => import("@/pages/appointment"));
const Blog = lazy(() => import("@/pages/blog"));
const BlogPost = lazy(() => import("@/pages/blogPost"));
const Conditions = lazy(() => import("@/pages/conditions"));
const Contact = lazy(() => import("@/pages/contact"));
const Disclaimer = lazy(() => import("@/pages/disclaimer"));
const Faq = lazy(() => import("@/pages/faq"));
const Privacy = lazy(() => import("@/pages/privacy"));
const Services = lazy(() => import("@/pages/services"));
const Terms = lazy(() => import("@/pages/terms"));

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <span className="size-10 animate-spin rounded-full border-4 border-brand/15 border-t-brand" />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    trackPageView({ location: location.pathname + location.search });
  }, [location.pathname, location.search]);

  return null;
}

function NotFoundComponent() {
  return (
    <section className="texture-grain relative overflow-hidden bg-cream">
      <Seo
        title="Page Not Found | ShushrutamVed Care"
        description="The page you were looking for doesn't exist."
        path="/404"
        noindex
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-4rem] size-[22rem] rounded-full bg-brand-tint blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-8rem] left-[-5rem] size-[20rem] rounded-full bg-sand blur-3xl"
      />
      <div className="relative mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center">
        <p className="eyebrow-center justify-center">Lost in the garden?</p>
        <p className="mt-6 font-display text-[7rem] leading-none text-brand/20 select-none">404</p>
        <h1 className="-mt-6 font-display text-4xl text-balance md:text-[2.75rem]">
          This page has drifted away
        </h1>
        <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
          The page you're looking for doesn't exist or has moved. Let's bring you back to something
          helpful.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-brand px-7 text-base font-semibold text-primary-foreground shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-deep"
          >
            <ArrowLeft className="size-4" /> Back to home
          </Link>
          <Button asChild variant="outlineBrand" size="pill">
            <Link to="/appointment">Book an appointment</Link>
          </Button>
        </div>
      </div>
    </section>
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
        <section className="relative overflow-hidden bg-cream">
          <div className="relative mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-6 py-24 text-center">
            <p className="text-[0.72rem] font-bold tracking-[0.24em] text-brand uppercase">
              Something went wrong
            </p>
            <h1 className="mt-5 font-display text-4xl text-balance">This page didn't load</h1>
            <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
              An unexpected error occurred. Try refreshing, or head back home — your data is safe.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button variant="hero" size="pill" onClick={() => this.setState({ hasError: false })}>
                Try again
              </Button>
              <Button asChild variant="outlineBrand" size="pill">
                <a href="/">Go home</a>
              </Button>
            </div>
          </div>
        </section>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <AnalyticsTracker />
      <SiteHeader />
      <main className="flex-1">
        <ErrorBoundary>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/conditions" element={<Conditions />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="*" element={<NotFoundComponent />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      <SiteFooter />
      <ChatWidget />
      <MobileActionBar />
      <Toaster />
    </div>
  );
}
