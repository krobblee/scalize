import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "./sonner";
import { TooltipProvider } from "./tooltip";
import NotFound from "./NotFound";
import { Route, Switch, Router as WouterRouter } from "wouter";
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

import AiRaci from "./AiRaci";
import { AI_RACI, CASE_STUDY_PAGES } from "./siteCopy";

function Router() {
  return (
    <>
    <ScrollToTop />
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/how-i-work" component={HowIWork} />
      <Route path="/case-studies"><CaseStudies /></Route>
      {Object.values(CASE_STUDY_PAGES).map(({ path }) => (
        <Route key={path} path={path}>
          <CaseStudies casePath={path} />
        </Route>
      ))}
      <Route path="/writing" component={Writing} />
      <Route path="/writing/:slug" component={Post} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/resources/graduated-hitl-eval-ownership-model" component={GraduatedHitlEvalOwnershipModel} />
      <Route path={AI_RACI.path} component={AiRaci} />
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
