
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

// Page imports
import Home from "./pages/Home";
import Problem from "./pages/Problem";
import Solution from "./pages/Solution";
import Partnership from "./pages/Partnership";
import Vision from "./pages/Vision";
import About from "./pages/About";
import DApp from "./pages/DApp";
import Dashboard from "./pages/Dashboard";
import Whitepaper from "./pages/Whitepaper";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const handleNavigate = (path: string) => {
    // This will be handled by React Router Link components
    window.location.href = `/${path === 'hero' ? '' : path}`;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout onNavigate={handleNavigate}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/problem" element={<Problem />} />
              <Route path="/solution" element={<Solution />} />
              <Route path="/partnership" element={<Partnership />} />
              <Route path="/vision" element={<Vision />} />
              <Route path="/about" element={<About />} />
              <Route path="/dapp" element={<DApp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/whitepaper" element={<Whitepaper />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
