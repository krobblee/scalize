import { useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "./sonner";
import { TooltipProvider } from "./tooltip";
import NotFound from "./NotFound";
import { Route, Switch, useLocation, Router as WouterRouter } from "wouter";
import { PrefetchProvider, type PrefetchData } from "./prefetch";
import ErrorBoundary from "./ErrorBoundary";
import ScrollToTop from "./ScrollToTop";
import { ThemeProvider } from "./ThemeContext";
import Home from "./Home";
import Services from "./Services";
import HowIWork from "./HowIWork";
import CaseStudies from "./CaseStudies";
import Writing from "./Writing";
import Post from "./Post";
import About from "./About";
import Contact from "./Contact";
import GraduatedHitlEvalOwnershipModel from "./GraduatedHitlEvalOwnershipModel";

function PageViewTracker() {
  const [location] = useLocation();
  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: location,
        page_location: window.location.href,
      });
    }
  }, [location]);
  return null;
}

function Router() {
  return (
    <>
    <PageViewTracker />
    <ScrollToTop />
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/how-i-work" component={HowIWork} />
      <Route path="/case-studies" component={CaseStudies} />
      <Route path="/writing" component={Writing} />
      <Route path="/writing/:slug" component={Post} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/resources/graduated-hitl-eval-ownership-model" component={GraduatedHitlEvalOwnershipModel} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
    </>
  );
}

interface AppProps {
  // Set only when pre-rendering pages at build time (see entry-server.tsx).
  ssrPath?: string;
  helmetContext?: Record<string, any>;
  data?: PrefetchData;
}

function App({ ssrPath, helmetContext, data = {} }: AppProps) {
  return (
    <HelmetProvider context={helmetContext}>
    <PrefetchProvider value={data}>
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <WouterRouter ssrPath={ssrPath}>
            <Router />
          </WouterRouter>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
    </PrefetchProvider>
    </HelmetProvider>
  );
}

export default App;
